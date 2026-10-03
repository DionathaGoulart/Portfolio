# Style Guide Global — Portfólio Dionatha Goulart

> **Regra nº 1 (governança de estilo):** **o site tem duas skins, e toda página existe nas duas.** A **retro** (neo-brutalista) é a padrão; a **terminal** (workstation/CRT) é a alternativa, ativada pelo botão de skin no header de cada página (a escolha fica salva no navegador). Cada skin tem estrutura visual própria, O que **as duas skins** são obrigadas a compartilhar é apenas:
>
> 1. **O catálogo de paletas** (tokens CSS abaixo) — nenhuma skin inventa cor própria;
> 2. **A tipografia** (JetBrains Mono, única fonte do site);
> 3. **As utilities de identidade** (`retro-border`, `retro-shadow`, `terminal-*`) — usadas na dose que o style guide da skin definir.
>
> Uma página futura (ex.: `/youtube`) nasce com um style guide próprio em `docs/styleguides/<pagina>.md` (use `docs/styleguides/_template.md`), com uma view para cada skin.

Style guides por skin:

- [`docs/styleguides/retro.md`](./styleguides/retro.md) — skin retro (padrão): hub, portfólio, projetos e CV
- [`docs/styleguides/terminal.md`](./styleguides/terminal.md) — skin terminal: hub, portfólio, shell, projetos e CV
- [`docs/styleguides/_template.md`](./styleguides/_template.md) — template para novas páginas

---

## 1. Identidade visual (o que amarra tudo)

Estética **neo-brutalista / retro-terminal**: bordas duras de 2px, sombras sólidas deslocadas (sem blur), tipografia mono em caixa alta, vocabulário de sistema operacional (`DG_OS`, prompts de shell, scanlines). Cada página interpreta essa identidade do seu jeito — o global define o vocabulário, não o layout.

## 2. Tokens semânticos (contrato de cor)

A arquitetura técnica (paletas → temas daisyUI → skins) está em [`docs/DESIGN.md`](./DESIGN.md). Aqui fica o contrato de uso: componente estiliza **apenas** com tokens do tema, nunca com hex direto.

| Token daisyUI            | Tailwind                    | Uso                  |
| ------------------------ | --------------------------- | -------------------- |
| `--color-base-100`       | `bg-base-100`               | fundo da página      |
| `--color-base-200`       | `bg-base-200`               | superfícies/cartões  |
| `--color-base-300`       | (via `.retro-border`)       | cor da borda retro   |
| `--color-base-content`   | `text-base-content`         | texto padrão         |
| `--color-accent`         | `bg-accent` / `text-accent` | destaque, CTAs, glow |
| `--color-accent-content` | `text-accent-content`       | texto sobre accent   |
| `--shadow`               | (via `.retro-shadow`)       | sombra sólida        |
| `--scanline-color`       | (via `.terminal-scanline`)  | overlay CRT          |

Variações de intensidade via opacidade Tailwind (`text-accent/30`, `border-accent/10`, `bg-accent/5`) — nunca criando cores novas.

## 3. Catálogo de temas

Cada cor existe **uma vez**, como `--palette-*` em `src/styles/palettes.css`; os temas em `src/styles/themes.css` só referenciam essas variáveis. Para criar tema, seguir a receita em `docs/DESIGN.md`.

### Skin retro (padrão — um accent por rota)

Mesma base (cream/ink no light, noir/cream no dark) em toda rota; só o **accent** (e, no dark, o `--shadow` que o acompanha) muda. O accent de cada rota é exatamente a cor com que o cartão do hub pinta o hover que leva até ela — ver §4.5. **No light as três rotas são crimson** (accent único no site inteiro); a diferenciação por rota existe só no dark.

| Rota                            | Tema               | Accent light      | Accent dark     |
| ------------------------------- | ------------------ | ----------------- | --------------- |
| `/` (e qualquer outra)          | `retro-hub-*`      | crimson `#dc143c` | rose `#e8729a`  |
| `/dev`, `/dev/cv`               | `retro-dev-*`      | crimson `#dc143c` | gold `#c8a96e`  |
| `/projetos`, `/projetos/<slug>` | `retro-projetos-*` | crimson `#dc143c` | ember `#ff6b45` |

O mapeamento rota → tema vive em `RETRO_ROUTE_THEMES` (`src/data/theme-config.ts`) e é lido tanto pelo `THEME_INIT_SCRIPT` (antes do paint) quanto pelo `SkinProvider` (navegação client-side).

### Skin terminal (todas as rotas) — paleta escolhida pelo visitante via comando `theme`

Registrados em `TERMINAL_LIGHT_THEMES` / `TERMINAL_DARK_THEMES` (`src/data/theme-config.ts`). O id `p*`/`d*` é o que fica salvo no localStorage `dg-theme-custom`.

| ID   | Tema                    | Nome                     | Modo  |
| ---- | ----------------------- | ------------------------ | ----- |
| `p1` | `terminal-crimson`      | Crimson Chalk            | light |
| `p2` | `terminal-frost`        | Abyss Frost (**padrão**) | light |
| `p3` | `terminal-forest`       | Forest Mist              | light |
| `p4` | `terminal-amber`        | Sand Dusk                | light |
| `p5` | `terminal-voltage`      | High Voltage             | light |
| `d1` | `terminal-rose`         | Noir Rose                | dark  |
| `d2` | `terminal-gold`         | Vault Gold (**padrão**)  | dark  |
| `d3` | `terminal-ember`        | Midnight Ember           | dark  |
| `d4` | `terminal-cyan`         | Cyber Teal               | dark  |
| `d5` | `terminal-violet`       | Velvet Purple            | dark  |
| `d6` | `terminal-matrix`       | Neon Matrix              | dark  |
| `d7` | `terminal-voltage-noir` | Voltage Noir             | dark  |

## 4. Arquitetura de temas (resumo)

1. **Skin:** escolha do visitante, salva em localStorage `dg-skin` (`retro` por padrão). O servidor sempre renderiza a view retro; `SkinView` troca para a terminal após a hidratação, e o CSS em `globals.css` esconde a view que não bate com `data-skin` — sem flash.
2. **`THEME_INIT_SCRIPT`** (inline no `<head>`) carimba `data-theme`/`data-skin` no `<html>` antes do primeiro paint — sem flash de skin nem de dark mode.
3. **`SkinProvider`** assume depois da hidratação e mantém `data-theme` em sincronia com skin, rota, modo e paleta (`resolveTheme` em `theme-config.ts`).
4. **`next-themes`** (`attribute="class"`, storageKey `theme`) resolve light/dark/system.
5. Hovers do Hub anunciam o destino de cada cartão via `--hub-dev-hover` / `--hub-projects-hover` (definidos nos temas `retro-hub-*`). **Invariante:** cada `--hub-*-hover` e o accent do tema de destino apontam para a mesma variável `--palette-*` — o hover é a prévia real da página. Rota nova ⇒ par novo (hover no `retro-hub-*` + tema `retro-<rota>-*`) e entrada em `RETRO_ROUTE_THEMES`.

## 5. Tipografia

- **Única família:** JetBrains Mono (local, `src/assets/fonts/`, pesos 400/500/700/800 + itálicos), exposta como `--font-jetbrains-mono` e mapeada para `font-sans` **e** `font-mono`.
- **Display/títulos:** `font-black` (ou 800), `uppercase`, `tracking-tighter`, frequentemente `italic`, line-height apertado (`leading-[0.85]`–`[1.1]`).
- **Metadados/decoração:** `font-mono` minúsculo (`text-[8px]`–`text-xs`), `uppercase`, `tracking-widest`/`tracking-[0.2em]`, opacidade 30–60%.
- **Corpo:** `font-medium`/`font-bold`, opacidade 70–80% sobre foreground.

## 6. Utilities de identidade

Retro (`src/styles/retro.css`) e terminal (`src/styles/terminal.css`), declaradas como `@utility`:

| Classe                                | Efeito                                              |
| ------------------------------------- | --------------------------------------------------- |
| `.retro-border`                       | borda de `--frame-border` na cor `--color-base-300` |
| `.retro-shadow` / `.retro-shadow-sm`  | sombra sólida deslocada em `--shadow`               |
| `.btn-retro` / `-outline` / `-invert` | botões da skin retro                                |
| `.tooltip-retro`                      | tooltip daisyUI com a cara retro                    |
| `.btn-terminal`                       | botão da skin terminal                              |
| `.terminal-glow`                      | `text-shadow` com accent                            |
| `.terminal-scanline`                  | overlay CRT fixo (usar com opacidade baixa)         |
| `.terminal-cursor`                    | cursor de bloco piscando                            |

Classes daisyUI (`card`, `badge`, `tooltip`...) servem às duas skins — o tema define a cara. Padrão de interação recorrente: cartão levanta no hover (`retro-shadow-sm` → `retro-shadow` + `-translate-y-1`). Transições 300–500ms.

## 7. Motion

- **Framer Motion:** entradas de página/cartões (`opacity` + `x`/`y`), `AnimatePresence` para alternância de modos.
- **CSS puro:** `blink` (cursor), `spin` lento para anéis decorativos (hero retro).
- Regra: animação é entrada e feedback, não firula contínua — durações 0.3–0.6s; loops infinitos só em elementos decorativos discretos (pulse, spin 20–40s).

## 8. Conteúdo e strings

Nenhuma string de UI hardcoded em componente: tudo vem de `src/data/{hub,dev,projects}-config.ts` (tipados por `src/types/content.ts`). SEO em `src/data/seo-config.ts`. Idioma: **pt-BR**, com termos de sistema em inglês (estética terminal).

## 9. Checklist para criar uma nova página (ex.: `/youtube`)

1. Criar `docs/styleguides/youtube.md` a partir do `_template.md` — personalidade e estrutura **em cada skin**.
2. Componentes em `src/components/retro/youtube/` e `src/components/terminal/youtube/`, reusando o kit `ui/` de cada skin.
3. A rota renderiza `<SkinView retro={...} terminal={...} />`; os headers das duas views trazem o toggle de skin e o de tema.
4. Tema: automático nas duas skins (retro fixo, terminal pela paleta do visitante).
5. Criar `src/data/youtube-config.ts` com todo o conteúdo/strings (strings de UI separadas por skin).
6. Adicionar SEO em `seo-config.ts` + entrada no `sitemap.ts`.
