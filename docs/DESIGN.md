# Sistema de Design — daisyUI + Skins

Como este app organiza cor, tema e componente. Referência para qualquer alteração visual.

## As três camadas

| Camada                     | Onde vive                         | Pode cruzar skins?                             |
| -------------------------- | --------------------------------- | ---------------------------------------------- |
| **Paletas** (hex cru)      | `src/styles/palettes.css`         | Sim — paleta é dado                            |
| **Temas** (tokens daisyUI) | `src/styles/themes.css`           | Sim — ambas as skins consomem os mesmos tokens |
| **Componentes React**      | `src/components/{retro,terminal}` | **Não** — imposto por ESLint                   |

Classes daisyUI (`card`, `badge`, `tooltip`...) são motor neutro como `flex`: as duas skins
podem usá-las, porque é o **tema** que define a cara delas (raio 0, borda 2px vs 1px,
`--shadow`). A regra de isolamento vale só para componentes React.

## Mapa de arquivos

```
src/styles/
  palettes.css   cada cor do design existe UMA vez (--palette-*)
  themes.css     13 blocos @plugin "daisyui/theme" montados sobre as paletas
  retro.css      @utility do skin retro  (btn-retro*, retro-shadow*, retro-border, tooltip-retro)
  terminal.css   @utility do skin terminal (btn-terminal, terminal-glow/scanline/cursor)
src/app/globals.css   imports + config do plugin (exclude!) + base
src/components/
  retro/    ui/ (kit: RetroCard, RetroBadge, RetroSkillChip, RetroSocialLinks,
            RetroSectionTitle, RetroStatusFooter, RetroThemeToggle, WindowDots)
            hub/ e ti/ (seções das rotas /, /ti, /ti/cv)
  terminal/ ui/ (kit: TermWindow, TermModuleHeader, TermBadge, TermSocialLinks,
            TermSectionTitle, TermFooter, TermModeSwitch, WindowDots)
            sections/ (rota /dev) e shell/ (modo terminal interativo)
  shared/   skin-agnósticos de verdade (Logo, Icons, providers, CreditFooter...)
src/data/theme-config.ts   rota -> tema, catálogo de paletas do wizard, script anti-flash
```

## Receitas

### Mudar uma cor

Edite a variável em `palettes.css`. Termina aí — temas e swatches do wizard referenciam
`var(--palette-*)`. Exceção documentada: `THEME_COLOR_LIGHT/DARK` em `theme-config.ts`
(meta tag não lê CSS var) — mantenha iguais a `--palette-cream`/`--palette-noir`.

### Criar um tema

1. Adicione as cores novas em `palettes.css` (se ainda não existirem).
2. Copie um bloco `@plugin "daisyui/theme"` em `themes.css` (todos os tokens são
   obrigatórios, inclusive os extras `--shadow` e `--scanline-color`). Blocos novos vêm
   **depois** de `retro-hub-light` — ordem de fonte decide o cascade.
3. Tema do skin terminal: registre em `TERMINAL_LIGHT_THEMES`/`DARK` no `theme-config.ts`
   (o wizard e o anti-flash leem de lá). Tema retro: ajuste `resolveTheme`.

### Criar/alterar componente de uma skin

- Vive em `src/components/<skin>/ui/`, prefixado (`Retro*`/`Term*`).
- Antes de markup próprio, procure componente daisyUI correspondente (skill
  `daisyui:daisyui`); estenda por tokens/utilities, como `TermBadge` e `RetroCard` fazem.
- Se precisar dele na outra skin: são dois componentes, um por skin. Se não tem nada de
  skin: vai para `shared/` — sem prop `variant` de skin (o lint barra import cruzado).

### Usar componente daisyUI novo

Tire o nome do `exclude` em `globals.css` **no mesmo commit** que adiciona o markup.
`npm run check:excluded` (roda no CI) falha se markup usar classe excluída — o erro
silencioso de classe sem CSS vira erro de build.

## Exclude atual e porquê

`menu, progress, navbar, input, label, steps, toggle` — headers são overlays fixos (não
navbar/menu); medidores do terminal são ASCII/segmentos por identidade (não progress); a
linha de comando do shell é um campo nu com foco na linha (não input); label/steps/toggle
não têm padrão correspondente hoje. `theme-controller` nunca entra: conflita com
next-themes + `THEME_INIT_SCRIPT`.

## Guardas (CI)

- **ESLint** — `no-restricted-imports`: `retro/**` ⇄ `terminal/**` proibido nos dois
  sentidos; `shared/**` não importa de nenhuma skin.
- **check-excluded.mjs** — classe excluída referenciada em markup = build vermelho.
- Identidade visual: mudou componente, compare screenshot antes/depois (light e dark).
