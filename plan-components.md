# PLAN-COMPONENTS.MD — daisyUI como Component Library + Isolamento de Skins

> **Executor:** IA (Claude). Leia este documento inteiro antes de tocar em qualquer arquivo.
> **Pré-requisito:** o plan.md (migração daisyUI) já foi executado e está em `main`. Este plano é a etapa seguinte.
> **Repo:** Next.js 16.2.9 (App Router) · React 19.2.4 · TS 5 strict · Tailwind CSS v4 CSS-first · daisyUI 5.7 · next-themes · framer-motion 12.

## 0. Regras obrigatórias para o executor

1. **Antes de escrever qualquer JSX/CSS com classe daisyUI, invoque a skill `daisyui:daisyui`** e leia o doc do componente específico que a task adota. Nunca invente classe daisyUI de memória.
2. **Identidade visual é intocável.** Este plano refatora implementação, não redesenha. Ao fim de cada fase que toca UI: screenshot de `/`, `/dev`, `/ti`, `/dev/cv`, `/ti/cv` em light e dark e comparação com o baseline da Fase 0. Se um componente daisyUI não reproduz o visual atual com fidelidade, a task manda **manter o markup custom encapsulado no wrapper** — o wrapper é o contrato, o daisyUI é detalhe interno.
3. **Dois skins, nomes fixos:** `terminal` → `/dev`, `/dev/cv` · `retro` → `/`, `/ti`, `/ti/cv`.
4. **Sem animações de entrada com bounce/spring/overshoot.** Entradas = fade/slide ease-out 180–260ms. Não regredir.
5. **Commits atômicos**, Conventional Commits em inglês. Strings de UI em PT-BR.
6. **Fim de cada fase:** `npm run lint && npm run typecheck && npm run build` verdes (é o que o `ci.yml` roda).
7. **Footer de atribuição é cláusula da licença.** Não remover de nenhuma variante.
8. **Um componente daisyUI só sai do `exclude` na task que o adota** — nunca preventivamente. O exclude é o orçamento de CSS do projeto.

## 1. Estado atual (resumo do audit)

- daisyUI atua só como **engine de temas**: 13 temas custom em `globals.css`, 1 componente (`btn`) estendido por tokens (`btn-retro*`, `btn-terminal`).
- `exclude: tooltip, menu, card, badge, progress, navbar, input, label, status, steps, swap, toggle` — poda falsos positivos do scanner (~31KB). Vários desses nomes correspondem a padrões que o app **faz à mão** hoje.
- Componentes React organizados por **rota** (`dev/`, `ti/`, `hub/`) com `shared/` e `ui/` contendo branch de skin embutido — a "mistura" que este plano elimina:
  - `shared/SkillBar.tsx` — union `variant: "terminal" | "retro"`, dois renders num arquivo.
  - `shared/ThemeToggle.tsx` — prop `isTerminal`, dois renders.
  - `ui/WindowDots.tsx` — `tone: "terminal" | "retro"`.
  - `shared/SocialLinks.tsx`, `shared/Footer.tsx`, `shared/SectionTitle.tsx` — branch por skin (12, 9 e 3 hits de skin no grep).
  - `ui/Tooltip.tsx` — usa `retro-border` (retro-specific) mas é importado pelo shared `SocialLinks`.
- Chrome de janela fake (`WindowDots` + barra) repetido em 7 arquivos; `retro-border` ×48 em 22 arquivos.
- Paletas duplicadas entre temas (`terminal-crimson` ≈ `retro-hub-light`, `terminal-rose` ≈ `retro-hub-dark`, `terminal-ember` ≈ `retro-ti-dark`) e hex repetido em `theme-config.ts` (swatches + meta theme-color).

## 2. Princípio arquitetural — as três camadas

| Camada                   | Onde vive                       | Pode cruzar skins?                                                                                                                 |
| ------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **1. Paletas e temas**   | CSS (`@plugin "daisyui/theme"`) | **Sim** — paleta é dado, não comportamento                                                                                         |
| **2. Classes daisyUI**   | CSS gerado pelo plugin          | **Sim** — `card`/`badge`/`navbar` são motor neutro como `flex`; o TEMA define a cara (radius 0, `--border` 2px vs 1px, `--shadow`) |
| **3. Componentes React** | `src/components/`               | **NÃO** — única camada com regra de isolamento, imposta por ESLint                                                                 |

Regra da camada 3: `retro/**` nunca importa de `terminal/**` e vice-versa; `shared/` não conhece skin nenhuma (proibido prop `variant`/`isTerminal`/`tone` de skin — se um componente precisa disso, ele pertence a uma skin ou vira dois).

## 3. Estrutura alvo

```
src/components/
  retro/
    ui/          RetroWindow, RetroCard, RetroBadge, RetroNavbar, RetroTooltip,
                 RetroSkillChip, RetroThemeToggle, RetroFooter, RetroSocialLinks,
                 RetroSectionTitle  (+ index.ts barrel — o "kit" da skin)
    hub/         ProfileCard, PersonaSwitcher, HubFooter
    ti/          Hero, About, Projects, Experience, Contact, Header, TiCVViewer, TiPageClient
  terminal/
    ui/          TermWindow, TermBadge, TermNavbar, TermSkillMeter, TermPrompt,
                 TermModeSwitch, TermStatus, TermFooter, TermSocialLinks,
                 TermSectionTitle  (+ index.ts barrel)
    sections/    Hero, About, Projects, Experience, Contact, Header, DevCVViewer, DevPageClient
    shell/       TerminalMode, output, constants
  shared/        Logo, Icons, LogoWatermark, PageTransition, PrintButton, TypingText,
                 PersonaPage, ThemeProvider, SkinProvider  (zero conhecimento visual de skin)
```

CSS alvo (Tailwind v4 inlina `@import` antes de processar, então `@plugin` funciona em arquivo importado — **Spike S1 confirma**):

```
src/app/globals.css        só @import, @plugin "daisyui" (config), @theme, body
src/styles/palettes.css    hex cru: --palette-* em :root (fonte única de cor)
src/styles/themes.css      os 13 blocos @plugin "daisyui/theme" (referenciam --palette-*)
src/styles/retro.css       @utility do skin retro (btn-retro*, retro-shadow*, retro-border)
src/styles/terminal.css    @utility do skin terminal (btn-terminal, terminal-glow/scanline/cursor)
```

Fallback se S1 falhar: tudo permanece em `globals.css`, na mesma ordem, com separadores de seção — a organização lógica é a mesma.

## 4. Mapa de adoção componente a componente

Coluna "exclude": o nome que sai da lista na task correspondente.

### Skin terminal

| Padrão atual                                                       | daisyUI                         | Wrapper novo     | exclude                                                             | Notas                                                                                                                                                                                               |
| ------------------------------------------------------------------ | ------------------------------- | ---------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chrome de janela fake (WindowDots + barra de path, ×5 no terminal) | `mockup-window` / `mockup-code` | `TermWindow`     | — (mockup-* não está no exclude)                                    | Ler doc dos dois; `mockup-code` para blocos de código do Hero, `mockup-window` para frames. Dots nativos: spike S2 confirma se as cores dos dots aceitam token; senão dots custom dentro do wrapper |
| `SkillBar` variant terminal (barra + glow)                         | `progress`                      | `TermSkillMeter` | `progress`                                                          | Manter glow via utility e o `aria-valuenow` atual; `progress` já é theme-aware                                                                                                                      |
| Input de comando (`TerminalMode.tsx:394`)                          | `input` (ghost) + `kbd`         | `TermPrompt`     | `input`, `label` se usar                                            | Estilo ghost sem borda, caret custom `terminal-cursor` permanece                                                                                                                                    |
| Tags de tech nos projetos                                          | `badge badge-outline`           | `TermBadge`      | `badge` (compartilhado com retro — sai na primeira task que adotar) |                                                                                                                                                                                                     |
| Header do /dev                                                     | `navbar` + `menu`               | `TermNavbar`     | `navbar`, `menu`                                                    |                                                                                                                                                                                                     |
| Toggle `[MODE:DARK]`/`[MODE:LIGHT]`                                | `swap`                          | `TermModeSwitch` | `swap`                                                              | `swap-on`/`swap-off` com os dois textos; lógica next-themes intacta                                                                                                                                 |
| Indicadores pulsantes (animate-pulse ×14 no app)                   | `status`                        | `TermStatus`     | `status`                                                            | Só onde for semanticamente um indicador; pulse decorativo genérico fica como está                                                                                                                   |
| Spinner/loading do terminal (se existir no shell)                  | `loading`                       | interno ao shell | —                                                                   | Auditar `TerminalMode` na task                                                                                                                                                                      |

### Skin retro

| Padrão atual                                                        | daisyUI                          | Wrapper novo       | exclude                          | Notas                                                                                                                                                          |
| ------------------------------------------------------------------- | -------------------------------- | ------------------ | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ProfileCard, cards de projeto, blocos `retro-border`+`retro-shadow` | `card` (card-border)             | `RetroCard`        | `card`                           | `--radius-box: 0` e `--border: 2px` já vêm do tema; `retro-shadow` continua utility aplicada pelo wrapper                                                      |
| `SkillBar` variant retro (chip)                                     | `badge`                          | `RetroSkillChip`   | `badge`                          |                                                                                                                                                                |
| Tags de tech                                                        | `badge`                          | `RetroBadge`       | `badge`                          |                                                                                                                                                                |
| Header do /ti                                                       | `navbar` + `menu`                | `RetroNavbar`      | `navbar`, `menu`                 |                                                                                                                                                                |
| `ui/Tooltip.tsx` (bloco chapado accent)                             | `tooltip` restilizado por tokens | `RetroTooltip`     | `tooltip`                        | **Spike S3 decide**: se a seta/surface do daisyUI não vira o bloco chapado sem hack, manter markup custom dentro de `RetroTooltip` e `tooltip` fica no exclude |
| Experience / linhas do tempo                                        | `timeline` vertical              | `RetroTimeline`    | —                                | **Spike S4 decide** fidelidade; senão manter markup atual                                                                                                      |
| Footers (HubFooter, Footer retro)                                   | `footer`                         | `RetroFooter`      | — (`footer` não está no exclude) | Cláusula de atribuição preservada                                                                                                                              |
| ThemeToggle retro (Sun/Moon)                                        | `swap swap-rotate`               | `RetroThemeToggle` | `swap`                           |                                                                                                                                                                |

### Shared que morrem (split por skin)

| Hoje                      | Vira                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| `shared/SkillBar.tsx`     | `terminal/ui/TermSkillMeter` + `retro/ui/RetroSkillChip`                                 |
| `shared/ThemeToggle.tsx`  | `terminal/ui/TermModeSwitch` + `retro/ui/RetroThemeToggle`                               |
| `ui/WindowDots.tsx`       | absorvido por `TermWindow` e `RetroWindow`                                               |
| `ui/Tooltip.tsx`          | `retro/ui/RetroTooltip`                                                                  |
| `shared/SocialLinks.tsx`  | `RetroSocialLinks` + `TermSocialLinks` (12 hits de skin — split limpo vence render-prop) |
| `shared/Footer.tsx`       | `RetroFooter` + `TermFooter`                                                             |
| `shared/SectionTitle.tsx` | `RetroSectionTitle` + `TermSectionTitle`                                                 |

Permanecem em `shared/` (skin-agnósticos de verdade): `Logo`, `Icons`, `LogoWatermark`*, `PageTransition`, `PrintButton`, `TypingText`, `PersonaPage`, `ThemeProvider`, `SkinProvider`. (*auditar os 3 hits do grep na Fase 1; se houver branch de skin, split.)

### O que NÃO adotar — e por quê

"Usar 100% da daisyUI" = adotar **todo componente que corresponde a um padrão existente**. Não inventar UI para justificar classe.

- `theme-controller` — conflita com next-themes + `THEME_INIT_SCRIPT` (anti-flash SSR). O sistema atual é superior para este app. **Não adotar.**
- `modal`, `drawer`, `toast`, `dock`, `tab`, `table`, `chat`, `carousel`, `rating`, `calendar`, `countdown`, `otp`, `select`, `checkbox`, `radio`, `range`, `file-input`, `textarea`, `fieldset`, `validator`, `filter` — sem padrão correspondente no app hoje. Entram no dia em que o padrão existir.
- `steps`, `toggle` — permanecem no exclude (o toggle de tema usa `swap`, não `toggle`).
- Candidatos a auditar durante as fases (adotar só se houver padrão real): `divider`, `link`, `avatar`, `stat`, `hero`, `collapse`/`accordion` (seções do CV), `kbd`.

## 5. Enforcement do isolamento

1. **ESLint** (`eslint.config.mjs`, flat config; `eslint-config-next` já traz `eslint-plugin-import`) — `import/no-restricted-paths` com zonas:
   - `src/components/retro/**` não importa `@/components/terminal/*`;
   - `src/components/terminal/**` não importa `@/components/retro/*`;
   - `src/components/shared/**` não importa de nenhuma das duas.
2. **Convenção de nome**: componente React prefixado (`Retro*`, `Term*`); utility CSS prefixada (`retro-*`, `terminal-*`, `btn-retro*`, `btn-terminal*`).
3. **`scripts/check-excluded.mjs`** — falha o CI se uma classe listada no `exclude` do `@plugin "daisyui"` aparecer em `src/**/*.tsx` como classe (mata a falha silenciosa documentada no comentário do globals.css). Entra no `ci.yml` junto do lint.
4. `ci.yml` já roda lint/typecheck/build — as guardas acima entram de graça.

## 6. Paleta única (cores fáceis de alterar)

1. `src/styles/palettes.css`: `:root { --palette-cream: #f2efe7; --palette-crimson: #dc143c; --palette-ink: #1a0a0a; ... }` — cada hex do design existe **uma vez**.
2. Temas referenciam: `--color-primary: var(--palette-crimson);` — **Spike S5 confirma** que daisyUI aceita `var()` como valor de token de tema (deve: vira CSS var pura resolvida em runtime).
3. Se S5 falhar: hex continua duplicado entre temas, e entra `scripts/check-palette-sync.mjs` no CI comparando `theme-config.ts` (swatches, `THEME_COLOR_*`) × `themes.css`.
4. Swatches de `theme-config.ts` permanecem literais (script inline não pode ler CSS var antes do paint) — cobertos pelo check do item 3 em qualquer cenário.

## 7. Fases

**Fase 0 — Spikes + baseline (S).** S1 `@plugin` em `@import`; S2 dots do `mockup-window` tematizáveis; S3 `tooltip` vira bloco chapado; S4 `timeline` reproduz Experience; S5 `var()` em token de tema. Screenshot baseline das 5 rotas × light/dark. Cada spike responde sim/não num branch descartável — o resultado escolhe o caminho já previsto nas tabelas acima.

**Fase 1 — Reestruturação (L, zero mudança visual).** Mover pastas para a estrutura alvo (`git mv`, imports via barrel); split dos 7 shared com branch de skin; regras ESLint (item 5.1); split do CSS (item 3, conforme S1); `check-excluded.mjs` no CI. Critério: build verde + screenshots idênticos ao baseline + lint falhando em import cruzado proposital (testar com import sacrificial).

**Fase 2 — Adoção daisyUI no skin terminal (M).** Ordem: `TermWindow` (maior dedup) → `TermBadge` → `TermSkillMeter` → `TermPrompt` → `TermNavbar` → `TermModeSwitch` → `TermStatus`. Cada task: ler doc do componente → tirar do exclude → wrapper em `terminal/ui` → substituir usos → screenshot.

**Fase 3 — Adoção daisyUI no skin retro (M).** Ordem: `RetroCard` → `RetroBadge`/`RetroSkillChip` → `RetroNavbar` → `RetroTooltip` (conforme S3) → `RetroFooter` → `RetroTimeline` (conforme S4).

**Fase 4 — Paleta única + docs (S).** `palettes.css` (conforme S5) ou check-sync; `docs/DESIGN.md`: como criar tema, como criar paleta, como criar/alterar componente de cada skin, o que o exclude significa; exclude final mínimo documentado; medir CSS antes/depois (`ls -la .next/static/css` pós-build).

**Fase 5 — Validação final (S).** lint + typecheck + build; comparação visual completa contra baseline; conferir que bundle CSS não cresceu além do custo dos componentes adotados.

## 8. Critérios de aceite globais

- Nenhum componente fora de `retro/`/`terminal/` com prop ou branch de skin.
- ESLint falha em import cruzado entre skins.
- `exclude` contém apenas componentes comprovadamente não usados, com guarda no CI.
- Visual byte-idêntico ao baseline em todas as rotas e modos.
- Um lugar por preocupação: **cor** → `palettes.css` · **tema** → `themes.css` · **cara da skin retro** → `retro/ui` + `retro.css` · **terminal** idem · **conteúdo** → `src/data`.
