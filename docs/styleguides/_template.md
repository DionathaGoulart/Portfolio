# Style Guide — <Nome da Página> (`/<rota>`)

> Copie este arquivo para `docs/styleguides/<rota>.md` ao criar uma página nova.
> Toda página existe **nas duas skins** (retro, padrão, e terminal) — o visitante alterna pelo
> botão de skin. Esta página precisa, portanto, de uma view por skin, seguindo
> `docs/styleguides/retro.md` e `docs/styleguides/terminal.md`.

**Tema retro:** família de rota em `resolveTheme` (`src/data/theme-config.ts`) — reusar `retro-hub-*` ou criar par light/dark
**Tema terminal:** automático (paleta do visitante)
**Arquivos:** `src/app/<rota>/*` · `src/components/retro/<rota>/*` · `src/components/terminal/<rota>/*` · conteúdo em `src/data/<rota>-config.ts`

## Personalidade

_Qual é a metáfora desta página? Como ela se traduz em cada skin (cartões brutalistas vs. janelas
de terminal)?_

## Estrutura

### Retro

1. ...

### Terminal

1. ...

## Regras específicas

1. _Convenções próprias (formas, densidade, microtexto decorativo)._
2. Todo conteúdo/strings via `src/data/<rota>-config.ts`, com strings de UI separadas por skin — nada hardcoded.

## Checklist de integração (obrigatório)

- [ ] Rota renderiza `<SkinView retro={...} terminal={...} />` (`src/components/shared/SkinProvider.tsx`)
- [ ] Headers das duas views com o toggle de skin (`RetroSkinToggle` / `TermSkinToggle`) e o de tema
- [ ] Tema retro mapeado em `resolveTheme` **e** no `THEME_INIT_SCRIPT` (`src/data/theme-config.ts`)
- [ ] Hover cross-tema no Hub, se a página ganhar cartão na Home (`--hub-<rota>-hover`)
- [ ] `src/data/<rota>-config.ts` criado e tipado
- [ ] SEO em `src/data/seo-config.ts` + `sitemap.ts`
