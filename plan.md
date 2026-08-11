# PLAN.MD — Refatoração End-to-End do Portfolio + Migração daisyUI

> **Executor:** Claude Opus 5 (IA). Leia este documento inteiro antes de tocar em qualquer arquivo.
> **Repo:** Next.js 16.2.9 (App Router) · React 19.2.4 · TypeScript 5 strict · Tailwind CSS v4 (config CSS-first, SEM `tailwind.config.*`) · framer-motion 12 · next-themes.

## 0. Regras obrigatórias para o executor

1. **Antes de escrever qualquer JSX/CSS com daisyUI, invoque a skill `daisyui:daisyui`** e leia os docs dos componentes que for usar (`button`, `card`, `badge`, `tooltip`, `menu`, `mockup-window`, `mockup-code`, `kbd`, `status`, `progress`, `navbar`, `dropdown`, `swap`). Nunca invente classe daisyUI de memória.
2. **Identidade visual é intocável.** O objetivo é refatorar a implementação, não redesenhar. Compare visualmente antes/depois (screenshot em `/`, `/dev`, `/ti`, `/dev/cv`, `/ti/cv`, light e dark) ao fim de cada fase que toca UI.
3. **Dois skins, nomeados assim em todo o código:**
   - **`terminal`** → rotas `/dev` e `/dev/cv` (estética de shell/CRT).
   - **`retro`** → rotas `/`, `/ti` e `/ti/cv` (estética neobrutalist).
4. **Sem animações de entrada com bounce/spring/overshoot.** Entradas = fade/slide com ease-out, 180–260ms. O codebase atual já obedece; não regredir. O único `animate-bounce` (hint "SCROLL ↓" em `ti/Projects.tsx:19`) é movimento ambiente contínuo — pode manter.
5. **Commits atômicos** por tarefa, Conventional Commits em inglês (`refactor:`, `fix:`, `feat:`, `chore:`, `style:`). Strings de UI permanecem em PT-BR.
6. **Ao fim de cada fase:** `npm run lint && npx tsc --noEmit && npm run build` devem passar. Não avance com build quebrado.
7. **Footer de atribuição é cláusula da licença MIT do projeto** (crédito visível com link). Não remover de nenhuma variante de footer.
8. **Decisões já tomadas pelo dono do repo (não re-perguntar):**
   - daisyUI: migração completa (tema custom vira temas daisyUI).
   - Domínio canônico: **`https://dionatha.com.br`** em tudo.
   - WhatsApp correto: **`5551986485232`** em tudo.
   - Tooling: Prettier + GitHub Actions (lint/typecheck/build). **Sem** testes unitários.

## 1. Contexto — o que está errado hoje (resumo do audit)

- **Cores definidas em 3 lugares** que exigem sync manual: `src/app/globals.css:15-119` (5 paletas + 3 classes de tema), `src/context/ThemeCustomContext.tsx:12-25` (`LIGHT_PALETTES`/`DARK_PALETTES`) e `:42-52` (`PALETTE_VARS`, 9 paletas — p3, p4, d4, d5 só existem no TS). Aplicação imperativa via `style.setProperty` + `MutationObserver` + `document.querySelector("[class*='theme-']")`.
- **Zero component library**; padrões repetidos ad hoc: `retro-border` ×50 em 18 arquivos, `hover:bg-accent hover:text-white` ×17 em 10 arquivos, chrome de janela de terminal (3 bolinhas + path bar) copiado 5×, tooltip idêntico char-a-char em 2 arquivos, 5 footers inline, 2 Headers quase gêmeos.
- **~110 linhas de parser de CV duplicadas** verbatim entre `DevCVViewer.tsx` e `TiCVViewer.tsx`.
- **Código morto:** `shared/CVViewer.tsx` (nunca importado), `lib/schema.ts` (JSON-LD gerado e nunca renderizado), deps `scrollmagic` e `@gsap/react` (0 imports), `gsap` usado para 1 fade redundante, assets starter em `public/`, `public/cv-*.md` duplicados byte-a-byte de `src/data/`.
- **SEO quebrado:** domínio divergente (`dionatha.com` vs `dionatha.com.br`), OG images referenciadas mas inexistentes (`/og-image.png`, `/og-dev.png`, `/og-ti.png` → 404), sem canonical, JSON-LD nunca emitido, CV pages sem OG/Twitter.
- **Bugs React:** `setState` dentro de updater (`TerminalMode.tsx:401-412`, dobra com StrictMode), contador mutável module-scope (`TerminalMode.tsx:45`), `preventDefault` de setas sequestrando scroll da página (`dev/Projects.tsx:39-69`), re-render por segundo de seção inteira (`dev/About.tsx:14-20`), `TypingText` com efeito auto-retrigger infinito, ícone social "Email" caindo em fallback errado (GitHub) por key inexistente no `iconMap`.
- **A11y:** sem `<h1>` em `/dev`, zero `focus-visible`, ícones `role="img"` sem nome acessível, menus mobile sem `aria-expanded`, CV duplicado na árvore de acessibilidade (`PrintButton`), sem `prefers-reduced-motion`.
- **Perf:** 8 pesos de fonte TTF (~1.1 MB) todos preloaded, `me.png` 370 KB, `<Image fill>` sem `sizes`/`priority`, `TerminalMode` (540 linhas) no bundle inicial de `/dev` mesmo com modo default `graphic`.
- **Tooling:** sem Prettier, sem CI, ESLint sem regras extras, tsconfig `target ES2017` + `allowJs` sem necessidade.
- **Dados divergentes:** 2 números de WhatsApp, 2 domínios, ano `2026` hardcoded em 3 lugares vs `getFullYear()` em outros 2, README diz "Next.js 15" com `next@16.2.9` pinado.

## 2. Arquitetura-alvo

### 2.1 Sistema de temas (daisyUI, fonte única de verdade)

`src/app/globals.css` passa a ser a ÚNICA definição de cor do app:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "daisyui" {
  themes: false; /* só temas custom */
  logs: false;
}
```

**Famílias de temas** (nomes finais; um bloco `@plugin "daisyui/theme"` por tema):

| Família (skin) | Temas light | Temas dark | Usado em |
|---|---|---|---|
| `retro` | `retro-light` | `retro-dark` | `/`, `/ti`, `/ti/cv` |
| `terminal` | `terminal-crimson` (p1, default), `terminal-frost` (p2), `terminal-forest` (p3), `terminal-amber` (p4) | `terminal-rose` (d1, prefersdark), `terminal-gold` (d2), `terminal-ember` (d3), `terminal-cyan` (d4), `terminal-violet` (d5) | `/dev`, `/dev/cv` |

- **Fonte dos valores hex:** `PALETTE_VARS` em `src/context/ThemeCustomContext.tsx:42-52` (é o catálogo mais completo — 9 paletas × 6 valores). Para `retro-light`/`retro-dark`, extrair os mapeamentos atuais de `.theme-ti`/`.theme-default` em `globals.css:60-119` (hoje `/` e `/ti` compartilham design; se as paletas divergirem entre `.theme-default` e `.theme-ti`, preservar a aparência atual de cada rota criando `retro-hub-*` adicional — decidir lendo o CSS, não chutando).
- **Mapeamento de tokens** (antigo → daisyUI):

| Var atual | Token daisyUI | Utility antes → depois |
|---|---|---|
| `--background` | `--color-base-100` | `bg-background` → `bg-base-100` |
| `--card-bg` | `--color-base-200` | `bg-card` → `bg-base-200` |
| `--border` | `--color-base-300` | `border-border-custom` → `border-base-300` |
| `--foreground` | `--color-base-content` | `text-foreground` → `text-base-content` |
| `--accent` | `--color-accent` | `text-accent`/`bg-accent` → **inalterado** |
| (texto sobre accent) | `--color-accent-content` | `text-white` sobre accent → `text-accent-content` |
| `--shadow` | manter `--shadow` como var extra dentro do bloco de tema (daisyUI aceita vars extras) | `.retro-shadow` continua lendo `var(--shadow)` |

  Preencher os tokens obrigatórios restantes de cada tema (`primary`, `secondary`, `neutral`, `info`, `success`, `warning`, `error` + `*-content`) com valores derivados coerentes da paleta (ex.: `primary` = accent, `error` = tom vermelho legível na base). Todos os temas: `--radius-selector: 0rem; --radius-field: 0rem; --radius-box: 0rem;` (design é 100% quadrado), `--depth: 0; --noise: 0;` `--border: 2px` nos temas `retro-*`, `1px` nos `terminal-*`.
- **`--hub-dev-hover` / `--hub-ti-hover`** (hoje em `globals.css:70-82`): mover como vars extras do tema `retro-*`.
- **Aplicação do tema:** substituir `RouteThemeProvider` + `ThemeCustomContext` por um único **`SkinProvider`** (`src/components/shared/SkinProvider.tsx`, client):
  1. Deriva o skin do pathname (`/dev*` → `terminal`, resto → `retro`) — mapa em `src/data/theme-config.ts` (novo arquivo; remove `themeConfig` de `dev-config.ts:176-185`).
  2. Lê modo light/dark do `next-themes` (`resolvedTheme`; manter `attribute="class"` só para o toggle — ou simplificar lendo direto).
  3. Lê paleta escolhida (só skin `terminal`) de `localStorage` key `"dg-theme-custom"` (manter formato para não quebrar preferência salva de visitantes).
  4. Renderiza `<div data-theme={temaComputado} data-skin={skin}>` envolvendo children. `data-skin` fica disponível para CSS estrutural (ex.: `.terminal-scanline` só em `[data-skin="terminal"]`).
- **Deletar:** `src/context/ThemeCustomContext.tsx` (o `MutationObserver`, `style.setProperty`, `querySelector` e as 3 cópias de paleta morrem juntos). O comando `theme` do `TerminalMode` passa a chamar `setPalette()` do `SkinProvider`, que só troca a string `data-theme`. Exportar de `theme-config.ts` os arrays `TERMINAL_LIGHT_THEMES`/`TERMINAL_DARK_THEMES` (id, nome de exibição, hex de preview p/ swatches) e derivar TODOS os ranges de prompt (`paleta-light[1–4]`) de `.length` — hoje `TerminalMode.tsx:241,341,518-519` hardcodam os ranges.
- **`@theme inline` atual (`globals.css:4-13`):** deletar após migrar utilities (daisyUI já expõe `base-*`/`accent`). Manter `--font-sans`/`--font-mono` apontando para `--font-jetbrains-mono`.
- **Utilities custom que ficam** (migrar para `@utility`): `retro-shadow`, `retro-shadow-sm`, `retro-border`, `terminal-glow`, `terminal-scanline`, `terminal-cursor`, `@keyframes blink`.

### 2.2 Estrutura de pastas alvo

```
src/
├── app/                       (rotas — inalterado + error.tsx, not-found.tsx, opengraph-image)
├── components/
│   ├── ui/                    (NOVO — primitivos daisyUI-based, todos com className via cn())
│   │   ├── Button.tsx         (btn; variants: retro | retro-outline | terminal; sizes)
│   │   ├── Panel.tsx          (card base-200 + retro-border + retro-shadow-sm; hover-lift opcional)
│   │   ├── TerminalWindow.tsx (chrome com bolinhas + path bar + status bar — avaliar mockup-window do daisyUI; se o markup não comportar o path bar custom, componente próprio com tokens daisyUI. Mata as 5 cópias)
│   │   ├── Badge.tsx          (badge; variants terminal-chip | retro-tag | status)
│   │   ├── Tooltip.tsx        (tooltip + data-tip — substitui o tooltip duplicado char-a-char)
│   │   ├── Kbd.tsx            (kbd — hints [↑]/[↓]/[ENTER] em dev/Projects)
│   │   ├── StatusDot.tsx      (status + animate-pulse)
│   │   ├── WindowDots.tsx     (as 3 bolinhas, se TerminalWindow não cobrir todos os casos)
│   │   └── LogoWatermark.tsx  (logo opacity-[0.03] -rotate-12, copiado 5× hoje)
│   ├── shared/                (Logo, Icons, ThemeToggle, SkinProvider, PageTransition, PersonaPage, PrintButton, SectionTitle, SkillBar, SocialLinks, TypingText, Footer.tsx NOVO)
│   ├── hub/                   (NOVO — extrair de app/page.tsx: ProfileCard, PersonaSwitcher, HubFooter)
│   ├── dev/                   (mantém; TerminalMode dividido — ver Fase 4.5)
│   └── ti/                    (mantém)
├── context/DevModeContext.tsx (mantém; adicionar throw se usado fora do provider)
├── data/                      (+ theme-config.ts; configs saneados)
├── hooks/useNavigation.ts
├── lib/
│   ├── utils.ts               (NOVO — cn() tipado, saindo de PrintButton.tsx:9-11)
│   ├── cv-parser.ts           (NOVO — parseCV + tipos, única implementação)
│   ├── slug.ts                (NOVO — slugify único; hoje 2 algoritmos incompatíveis em TerminalMode.tsx:34 e Projects.tsx:19-27)
│   └── schema.ts              (mantém, corrigir domínio)
└── types/content.ts           (ui tipado — ver 3.6)
```

## 3. Fases de execução

### FASE 0 — Tooling e baseline (commit por item)

1. Branch `refactor/e2e-daisyui` a partir de `main`.
2. `npm i -D daisyui@latest prettier` (daisyUI 5.x). Mover `postcss` de `dependencies` para `devDependencies`.
3. `.prettierrc` (double quotes, sem config exótica) + `.prettierignore`. Rodar `npx prettier --write .` em **commit isolado** (`style: format codebase with prettier`).
4. `package.json` scripts: `"typecheck": "tsc --noEmit"`, `"format": "prettier --write ."`, `"format:check": "prettier --check ."`, `"lint": "eslint ."`.
5. `tsconfig.json`: `target: "ES2022"`, remover `allowJs`, adicionar `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`. Corrigir os erros que surgirem (esperados: `projects[activeIndex]` em `dev/Projects.tsx:16`, `history[next]` em `TerminalMode.tsx:403,410`, `parts[0]/[1]` nos CV viewers, import não usado em `ti/About.tsx:4`, `schema` não usado nos CV pages — este último se resolve na Fase 5 renderizando o JSON-LD; por ora prefixar).
6. `eslint.config.mjs`: manter next/core-web-vitals + typescript.
7. `.github/workflows/ci.yml`: Node 20, `npm ci`, `format:check`, `lint`, `typecheck`, `build`, em pushes e PRs.
8. `next.config.ts`: remover `allowedDevOrigins` com IP de LAN hardcoded (`192.168.0.6`).

### FASE 1 — Limpeza (sem mudança visual)

1. Deletar: `src/components/shared/CVViewer.tsx`; `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`, `logo.svg`, `logo-black.svg`, `curriculo.md`, `cv-dev.md`, `cv-ti.md` (os de `public/` — os lidos são os de `src/data/`).
2. `npm rm scrollmagic @gsap/react gsap` → remover também o uso de gsap: em `DevPageClient.tsx` o fade `gsap.fromTo` (linhas 18-30) é redundante com o `PageTransition`/framer-motion já presente; deletar import, registro de ScrollTrigger e o efeito. Remover wrapper `DevContent`→`DevPageClient` de 1 linha (`DevPageClient.tsx:91-93`).
3. `git rm -r --cached prompts/` (está no `.gitignore:26` mas já trackeado — 132 KB de notas de IA).
4. Dados: WhatsApp → `5551986485232` em `ti-config.ts:88` e `hub-config.ts:13`; corrigir social `"Email"` → `"Gmail"` em `dev-config.ts:156` (bug do iconMap); remover campos mortos de config listados no audit (`dev-config.ts:162-163,170-172`, `hub-config.ts:5` `title`; em `ti-config.ts` verificar cada campo não consumido antes de remover — `meta`, `hero.gitBranch/uptime/...`, `about.envVars` — e remover do tipo se ninguém mais usa).
5. Anos hardcoded `2026` → `new Date().getFullYear()` (`ti/TiPageClient.tsx:21`, `app/ti/cv/page.tsx:30`, `app/dev/cv/page.tsx:27`).
6. README: Next.js 15 → 16 (badge linha 3 e Tech Stack linha 23); atualizar seção "Developer Guide" de paletas depois da Fase 2 (novo fluxo: adicionar tema = 1 bloco CSS + 1 entrada em `theme-config.ts`).
7. Criar `src/lib/utils.ts` com `cn(...inputs: ClassValue[])` tipado (clsx + twMerge); `PrintButton` importa de lá. Criar `src/types/html2pdf.d.ts` mínimo e remover o `@ts-ignore` de `PrintButton.tsx:29`.

### FASE 2 — Fundação de temas daisyUI

Implementar EXATAMENTE a seção 2.1:
1. Reescrever `globals.css` (plugin daisyUI, 11 blocos de tema, utilities em `@utility`, `body` base styles; `.terminal-scanline` escopado a `[data-skin="terminal"]`).
2. Criar `src/data/theme-config.ts` (skin por rota + catálogo de temas terminal com metadados de preview p/ o comando `theme`).
3. Criar `SkinProvider`, plugar em `app/layout.tsx` no lugar de `RouteThemeProvider`; deletar `RouteThemeProvider.tsx`, `ThemeCustomContext.tsx` e o `themeConfig` de `dev-config.ts`.
4. Adaptar `ThemeToggle` (continua via next-themes) e o comando `theme`/wizard do `TerminalMode` para a nova API (`setPalette(id)`); swatches de preview leem do catálogo novo.
5. Migrar utilities nos 30 arquivos: `bg-background`→`bg-base-100`, `bg-card`→`bg-base-200`, `border-border-custom`→`border-base-300`, `text-foreground`→`text-base-content`, `text-white`-sobre-accent→`text-accent-content` (procurar os 31 usos de `text-white` um a um — os que são sobre accent trocam, os deliberadamente brancos ficam). `app/dev/layout.tsx` deixa de montar `ThemeCustomProvider` (fica só `DevModeProvider`).
6. **Verificação da fase:** 5 rotas × light/dark × troca de paleta no terminal (`theme` → escolher 1-4/1-5) → screenshots idênticos ao baseline; `localStorage` antigo ainda respeitado; sem flash de tema errado ao navegar `/` ↔ `/dev`.

### FASE 3 — Primitivos `ui/` + dedup de lógica

1. Criar os componentes de `src/components/ui/` (seção 2.2), cada um baseado no doc daisyUI correspondente (ler skill antes). Regra: primitivo aceita `className`, usa `cn()`, zero cor hardcoded — só tokens.
2. `src/lib/cv-parser.ts`: mover `parseCV` (de `DevCVViewer.tsx:10-40`) + tipos; os dois viewers importam. Unificar também `renderBody` no que der: extrair helpers de parsing (split de `**bold**`, detecção de bullets) e deixar só o JSX de apresentação em cada viewer.
3. `src/lib/slug.ts`: UMA função `slugify` (usar a versão NFD de `Projects.tsx:19-27`, sem o hack `title === "Detcheler"` — mover a extensão para o config do projeto como campo opcional `fileExtension`). Substituir os 3 call sites de `TerminalMode` e o de `Projects`.
4. Dedup restante: ascii-bar (`About.tsx:159-161` + `TerminalMode.tsx:170-172`) → helper em `lib/`; fake git-hash (`Experience.tsx:42-43` + `TerminalMode.tsx:204`) → helper; skill→filename (`About.tsx:173` + `TerminalMode.tsx:175`) → helper.
5. `shared/Footer.tsx` com variants (`retro` | `terminal` | `hub`) substituindo os 5 footers inline (`PersonaPage.tsx:19`, `DevPageClient.tsx:53`, `TiPageClient.tsx:20-24` ≡ `app/ti/cv/page.tsx:29-33`, `app/dev/cv/page.tsx:26`, `app/page.tsx:150-176`). Atribuição da licença presente em todas.
6. `SocialLinks` vira o único renderizador de socials: `app/page.tsx:63-79` e `:151-172` passam a usá-lo (nova variant `hub` se precisar).
7. Corrigir `SkillBar`: variant `retro` hoje ignora `level`/`delay` silenciosamente — ou renderiza o nível, ou o tipo da variant não aceita essas props (discriminated union).

### FASE 4 — Migração dos componentes por skin

Ordem: `ti/*` (mais simples) → hub (`app/page.tsx`) → `dev/*` → CV viewers. Para cada arquivo: substituir strings de classe repetidas pelos primitivos `ui/`, aplicar classes daisyUI (`btn`, `badge`, `tooltip`, `menu`, `kbd`, `status`, `navbar`, `dropdown`), preservando o visual.

1. **`ti/*`:** botões CTA → `Button variant="retro|retro-outline"`; cards → `Panel`; tags/badges → `Badge`; janela fake de `ti/Projects` → `TerminalWindow` (variant retro); menu mobile de `ti/Header.tsx:62-81` → `dropdown` daisyUI (mantendo animação atual); footer → `Footer`.
2. **Hub:** extrair `app/page.tsx` (179 linhas, tudo inline) para `src/components/hub/{ProfileCard,PersonaSwitcher,HubFooter}.tsx`; tooltip dos socials → `Tooltip`; page vira composição fina (idealmente server component com ilhas client).
3. **`dev/*`:** chrome de terminal (5 cópias) → `TerminalWindow`; hints de teclado (`Projects.tsx:167-169`) → `Kbd`; pills de status → `Badge`/`StatusDot`; lista de arquivos de `Projects` → `menu` daisyUI com `aria` de tabs (`role="tablist"`/`aria-selected`); botões → `Button variant="terminal"`; overlay mobile de `dev/Header` mantém layout, ganha `aria-expanded`/`aria-controls`.
4. **Bugs React (corrigir durante a migração de cada arquivo):**
   - `TerminalMode.tsx:401-412`: tirar `setInput` de dentro do updater de `setHistIdx`.
   - `TerminalMode.tsx:45-46`: contador module-scope → `useRef`.
   - `TerminalMode.tsx:123`: `cd` via `setTimeout(runCommand)` duplica histórico → chamar a lógica de `cat` diretamente sem re-entrar no handler.
   - `TerminalMode.tsx:71-73`: `scrollIntoView` com guard para não rolar no mount inicial.
   - `dev/Projects.tsx:39-69`: listener de setas só com foco/hover na seção (não viewport-visível), sem re-attach a cada `activeIndex` (usar ref para o índice); `selectProject` pausa autoplay (hoje touch perde a seleção em 8s).
   - `dev/About.tsx:14-20`: uptime tick isolado num subcomponente `<UptimeCounter>` para não re-renderizar a seção toda a cada segundo.
   - `TypingText.tsx:22-46`: reescrever efeito sem `displayedText` na dep array (index via ref/um efeito com timeout encadeado). `loop` default vira `false` onde o loop não é visível.
   - `ti/Hero.tsx`: adicionar `"use client"` explícito (único client component sem diretiva).
   - Contexts (`DevModeContext`, novo skin context): default deve lançar erro se consumido fora do provider.
   - `ti/Hero.tsx:62`: shadow `rgba(var(--color-accent),0.1)` é malformado (var contém hex) → usar `color-mix()` ou token com opacidade daisyUI.
5. **Dividir `TerminalMode.tsx` (540 linhas):** `dev/terminal/{TerminalMode.tsx (shell), useTerminal.ts (estado+história), commands.ts (registry de comandos), output.tsx (renderers)}`. Limitar histórico de output (ex.: 200 linhas) e remover `AnimatePresence` por linha (anima só a linha nova). Carregar via `next/dynamic` (`ssr: false` não é necessário; só split) — modo default é `graphic`, 24 KB fora do bundle inicial.
6. **Strings hardcoded do skin dev:** mover para `dev-config.ts.ui` as que são texto de conteúdo (títulos de seção, labels de manifest, hints); strings decorativas de "cenografia" de terminal (`-rwxr-xr-x`, `root@dg-os:`) podem ficar em constantes locais nomeadas. Eliminar fallbacks duplicados `content.ui?.x || "literal igual ao config"` — com `ui` tipado (item 3.6) o fallback morre.

### 3.6 (dentro da Fase 4) — Tipar `ui`

`src/types/content.ts:84`: trocar `ui?: Record<string, string>` por interfaces explícitas por persona (`DevUiStrings`, `TiUiStrings`) com todas as keys usadas. Typo em key vira erro de compilação.

### FASE 5 — SEO / metadata

1. **Domínio:** `seo-config.ts:4` → `https://dionatha.com.br` (propaga para `metadataBase`, sitemap, robots). Conferir `schema.ts` e CVs md (já usam `.com.br`).
2. **OG images:** criar `src/app/opengraph-image.tsx` + `src/app/dev/opengraph-image.tsx` + `src/app/ti/opengraph-image.tsx` com `ImageResponse` (next/og), 1200×630, tipografia JetBrains Mono + cores do tema de cada rota. Remover as referências a arquivos png inexistentes de `seo-config.ts:19,26,33` (o file convention injeta as meta tags).
3. **JSON-LD:** nos dois CV pages, renderizar `<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />` — hoje a variável é criada e descartada (`app/dev/cv/page.tsx:18`, `app/ti/cv/page.tsx:17`).
4. **Canonical:** `alternates: { canonical }` em todas as 5 rotas via Metadata API.
5. **CV pages:** adicionar `openGraph` + `twitter` aos metadata exports.
6. `sitemap.ts:6`: `lastModified` fixo por rota (ou data de build consciente) em vez de `new Date()` para tudo.
7. `robots.ts:9`: remover disallows de rotas inexistentes (`/private/`, `/api/`).
8. `layout.tsx`: `<meta name="view-transition">` sai do `<head>` manual → `other: { "view-transition": "same-origin" }` na Metadata API; adicionar `export const viewport: Viewport` com `themeColor`.
9. Erro handling de rota: `src/app/error.tsx`, `src/app/not-found.tsx` (estilo retro, 404 temático); `try/catch` nos `fs.readFileSync` dos CV pages com `notFound()` como fallback.

### FASE 6 — A11y + Performance

**A11y:**
1. `<h1>` no skin terminal: promover o texto principal do `dev/Hero` a `<h1>` (estilização inalterada) e garantir hierarquia h2/h3 nas seções de ambos os skins.
2. `focus-visible` global no `globals.css` (`outline accent 2px offset 2px`) + conferir que os primitivos `ui/` (btn/menu/dropdown daisyUI já trazem focus) não o suprimem. Remover `outline-none` sem substituto no input do terminal (dar focus ring no container).
3. `Icons.tsx`: `aria-hidden="true"` (decorativos) + `aria-label` nos links icon-only (`SocialLinks`, hub). `Logo.tsx`: `aria-hidden` + `focusable="false"`.
4. Menus mobile: `aria-expanded`, `aria-controls`, `aria-label` nos toggles dos 2 Headers.
5. Input do terminal: `aria-label="Terminal de comandos"`; wrapper clicável ganha handler de teclado ou vira label do input.
6. `PrintButton.tsx:81-108`: DOM de impressão off-screen ganha `aria-hidden="true"` + `inert`.
7. Emojis significativos (`Projects.tsx:273,290,295`) → `aria-hidden` com texto adjacente já presente.
8. `@media (prefers-reduced-motion: reduce)` no globals: matar spins infinitos, scanline, typing loop (TypingText respeita via `useReducedMotion` do framer-motion).
9. Spans "disabled" (`ti/Projects.tsx:78-86`, `dev/Projects.tsx:277-297`) → `Button` disabled real ou `aria-disabled` + role.
10. `dev/About.tsx` `useInView`: garantir conteúdo visível sem JS (inicial `opacity-100` com animação aplicada só quando JS ativo — padrão framer `whileInView` já degrada ok; conferir).

**Perf:**
11. Fontes: converter para `.woff2` e registrar SÓ os pesos usados (grep `font-` de peso no código; provável: 400/500/700/800). `next/font/local` com `preload` só no peso principal. Meta: ~1.1 MB → <200 KB.
12. `me.png` (370 KB): reexportar otimizado (≤120 KB) e adicionar `sizes` + `priority` nos 3 usos de `<Image fill>` (`app/page.tsx:43-48`, `dev/Hero.tsx:114-119`, `ti/Hero.tsx:63-68`).
13. `apple-touch-icon`: gerar PNG 180×180 (hoje aponta para `.ico` de 215 KB em `layout.tsx:100-104`).
14. `react-markdown`/`remark-gfm`: sai do `PrintButton` estático — o DOM de impressão pode reusar o `cv-parser` (mesma fonte dos viewers); se mantiver markdown, importar dinamicamente no clique. `html2pdf.js` já é dynamic (ok).
15. `.terminal-scanline`: garantir no máximo 1 instância montada (mover para o layout do skin, não por-componente); `100vw` → `100%` para não estourar scrollbar.
16. `vercel.json`: adicionar headers de cache p/ `/fonts/*` (immutable) — ou mover fontes para `src/` e deixar o next/font cuidar (preferido).

### FASE 7 — Verificação final

1. `npm run format:check && npm run lint && npm run typecheck && npm run build` limpos.
2. `npx next build` sem warnings novos; conferir tamanhos de bundle por rota no output (esperado: `/dev` menor após dynamic import do TerminalMode).
3. Teste manual das 5 rotas × light/dark × 9 paletas do terminal (comando `theme`), navegação por hash, menu mobile, download de PDF do CV, comandos do terminal (`help`, `ls`, `cat <proj>`, `cd`, `theme`, `gui`, Tab-complete, ↑/↓).
4. Lighthouse (Chrome) em `/`, `/dev`, `/ti`: alvo ≥90 em Performance/A11y/Best Practices/SEO. Validar OG com https://www.opengraph.xyz ou similar. Validar JSON-LD no Rich Results Test.
5. Screenshots finais comparados ao baseline da Fase 0.
6. Atualizar README (stack, novo fluxo de temas, remover instruções obsoletas do ThemeCustomContext).

## 4. Definition of Done

- [ ] daisyUI 5 instalado; TODAS as cores do app definidas apenas nos blocos `@plugin "daisyui/theme"` do `globals.css` (zero hex em TS/TSX, zero `style.setProperty`).
- [ ] Skins nomeados `terminal` (dev) e `retro` (hub+ti) via `data-skin`; temas `terminal-*`/`retro-*` via `data-theme`.
- [ ] `ThemeCustomContext`, `RouteThemeProvider`, `CVViewer`, gsap, scrollmagic, assets mortos: deletados.
- [ ] Nenhuma das duplicações do audit §1 restante (parser CV, slugs, footers, tooltips, chrome de terminal, socials, ascii-bar).
- [ ] Todos os fixes de SEO/a11y/perf/React das Fases 4–6 aplicados.
- [ ] CI verde no GitHub Actions; Prettier aplicado; tsconfig endurecido.
- [ ] WhatsApp `5551986485232` e domínio `dionatha.com.br` únicos no repo.
- [ ] Visual idêntico ao baseline em todas as rotas/temas (delta apenas onde bug era visível — ex.: ícone de email errado).
