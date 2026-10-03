# CLAUDE.md — Portfólio Dionatha Goulart

Portfólio pessoal / marca profissional. Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript. Idioma do site: **pt-BR**.

## Documentos-guia (ler antes de mexer em conteúdo ou visual)

- **`docs/PRD.md`** — posicionamento, pilares tecnológicos, copy, SEO e checklist de publicação. Mudanças de conteúdo/copy devem respeitar o PRD.
- **`docs/DESIGN.md`** — arquitetura técnica do design system (paletas → temas daisyUI → skins) e receitas.
- **`docs/STYLEGUIDE.md`** — style guide **global**: catálogo de temas, tipografia, utilities, identidade.
- **`docs/styleguides/{retro,terminal}.md`** — style guide **por skin** (hub, portfólio, projetos, CV). **Toda página existe nas duas skins; cada skin tem estrutura própria, e o que as duas compartilham é somente o catálogo de paletas, a tipografia e as utilities.** Nova página ⇒ novo style guide a partir de `docs/styleguides/_template.md`, com uma view por skin.

## Comandos

```bash
npm run dev    # dev server na porta 3010 (não usar porta default)
npm run build  # build de produção
npm run lint   # eslint (inclui isolamento de skins)
npm run typecheck
npm run check:excluded  # classe daisyUI excluída usada em markup
npm run format
```

Sem testes automatizados no momento. Deploy: Vercel.

## Arquitetura (resumo)

- **Rotas:** `/` (hub geral: link pra todo mundo — Portfólio, Projetos, redes) · `/dev` e `/dev/cv` (portfólio profissional + CV: o link para recrutadores) · `/projetos` e `/projetos/<slug>` (projetos, filtrados entre pessoais e profissionais; `/<slug>` redireciona pra página do projeto) · `/deadsec` (estudo visual **temporário**, `noindex`, isolado em `src/components/deadsec/`). `/ti` foi removida (redirects em `next.config.ts`). `robots.ts` e `sitemap.ts` em `src/app/`.
- **Conteúdo é 100% config-driven:** todas as strings/dados vivem em `src/data/{hub,dev,projects}-config.ts` (tipos em `src/types/content.ts`); SEO em `src/data/seo-config.ts`. **Nunca hardcodar texto em componente.**
- **Design system (daisyUI + skins):** ler **`docs/DESIGN.md`** antes de qualquer mudança visual. Três camadas: paletas (`src/styles/palettes.css`, cada cor existe uma vez como `--palette-*`) → temas daisyUI (`src/styles/themes.css`) → componentes por skin (`src/components/{retro,terminal}`, import cruzado barrado por ESLint; `shared/` não conhece skin).
- **Duas skins em todas as páginas:** `retro` (padrão) e `terminal` (alternativa), trocadas pelo botão de skin no header (`RetroSkinToggle` / `TermSkinToggle`), salvas em localStorage `dg-skin`. Cada rota renderiza `<SkinView retro={...} terminal={...} />`; o servidor sempre entrega a retro e o CSS esconde a view errada até a troca (sem flash). Retro tem um accent por rota (`retro-hub-*`, `retro-dev-*`, `retro-projetos-*`, mapeados em `RETRO_ROUTE_THEMES`), igual à cor do hover do cartão do hub que leva até ela; terminal usa a paleta do visitante (comando `theme`). Lógica em `src/data/theme-config.ts` (`resolveTheme`, `TERMINAL_*_THEMES`, `THEME_INIT_SCRIPT`) e `SkinProvider` (mantém `data-theme`/`data-skin` no `<html>`). Dark mode via `next-themes` (classe `dark`).
- **Cor só via tokens daisyUI** (`bg-base-100`, `bg-base-200`, `text-base-content`, `text-accent`, `bg-accent`, opacidades tipo `border-accent/20`) + `--shadow`/`--scanline-color`. Hex hardcoded em componente quebra a troca de tema. Única cópia literal permitida: `THEME_COLOR_LIGHT/DARK` no `theme-config.ts`.
- **Componente daisyUI novo:** tirar do `exclude` em `src/app/globals.css` no mesmo commit (`npm run check:excluded` roda no CI).
- **Portfólio (`/dev`):** componentes por skin em `retro/persona/*` e `terminal/sections/*`, recebendo `content: PersonaContent` (`src/data/dev-config.ts`), com strings de UI por skin em `ui.retro` / `ui.terminal`.
- **Projetos:** um array em `src/data/projects-config.ts` é a **fonte única** de todo projeto, pessoal ou profissional (campo `kind`). Alimenta `/projetos` (com filtro Pessoais/Profissionais), `/projetos/<slug>`, o sitemap, o contador do hub, a linha "agora: construindo" (projeto `wip` mais recente) e — via `showcaseProjects()` — a seção de projetos do `/dev` e o shell. Os campos que só o `/dev` mostra (status livre, função, repo privado) vivem em `showcase` na mesma entrada. Projeto novo = entrada na config (+ print opcional em `public/projects/`). O `next.config.ts` cria o link curto `/<slug>` e **falha o build** se o slug colidir com uma rota ou arquivo público.
- **Shell interativo:** na skin terminal, **toda** página alterna entre modo gráfico e shell (`TerminalMode` + `TermShellView` + `TermShellToggle`; `ShellModeContext` provido no `app/layout.tsx` e resetado a cada troca de rota). Fora do `/dev`, o shell cai no `devContent`, então os comandos respondem igual em qualquer rota.
- **Motion:** Framer Motion (entradas/transições) em todo o site.
- **Fonte:** JetBrains Mono local (`src/assets/fonts/`), única família do site (`font-sans` = `font-mono`).
- `src/components/shared/DevTools.tsx` e o script anti-service-worker no `layout.tsx` são só de desenvolvimento (`NODE_ENV === "development"`). DevTools (Ctrl+Shift+D) sobrescreve o `data-theme` para testar qualquer tema em qualquer rota. Acesso pela LAN: IPs em `ALLOWED_DEV_ORIGINS` no `.env.local`.

## Convenções

- Commits: Conventional Commits em inglês (`style:`, `feat:`, `fix:`), como no histórico.
- Estética: neo-brutalista/terminal — bordas 2px, sombras sólidas sem blur, uppercase, mono. Direção recente do projeto: **reduzir ruído decorativo** (menos strings de terminal, menos elementos soltos) — não reintroduzir.
- Decoração de terminal (scanline, glow, microtexto) sempre em opacidade baixa (≤30%) e nunca competindo com conteúdo.
- Ao criar página nova, seguir o checklist do `docs/STYLEGUIDE.md` §9 (view nas duas skins via `SkinView`, tema retro no `theme-config.ts`, config de conteúdo, SEO, style guide próprio).
