# Style Guide — Skin Retro (padrão)

**Tema:** mesma base em todas as rotas, um **accent por rota** — hub `retro-hub-*` (crimson/rose) · `/dev` `retro-dev-*` (crimson/gold) · `/projetos` `retro-projetos-*` (crimson/ember) — no light tudo é crimson, a diferenciação é só no dark. O accent de cada rota é a cor do hover do cartão que leva até ela (`RETRO_ROUTE_THEMES` em `theme-config.ts`)
**Arquivos:** `src/components/retro/{hub,persona,projects,ui}/*` · conteúdo em `src/data/{hub,dev,projects}-config.ts` (`ui.retro.*`)

## Personalidade

A skin padrão do site: **neo-brutalista**, cartões com borda dura e sombra sólida, títulos gigantes em caixa alta. Um "console de operações" — status e vigilância, com o terminal só como tempero (scanline fraca, prompts `>` no microtexto).

Wrapper inteiro em `font-mono`. Sem shell interativo (isso é da skin terminal) — só Framer Motion.

## Hub (`/`) — `RetroHub`

- `main` centralizado verticalmente (`min-h-screen flex flex-col justify-center`), grid `lg:grid-cols-12`:
  - **Esquerda (7 cols):** foto de perfil em moldura retro (logo como marca d'água + overlay `SYNC_COMPLETE`), nome gigante em bloco `bg-accent` (`text-8xl font-black italic uppercase`, quebra de linha no sobrenome), card de manifesto com `TypingText` e descrição.
  - **Direita (5 cols):** um cartão por entrada de `hubContent.sections` (hoje **Portfólio** e **Projetos**) estilo **janela de terminal** — title bar `bg-accent` com logo + dots, corpo `font-mono` com prompt, tags, status (`{count}` vira o número de projetos) e ação. Card novo = entrada nova na config.
  - O cartão de manifesto termina com `> agora: construindo <projeto>` (projeto `wip` mais recente).
- **Rodapé:** socials em cartões retro (desktop) + assinatura `DG_OS_CORE // BUILD_...` em micro-mono 30%.
- Toggles fixos no topo-direito: skin (`RetroSkinToggle`) + tema (`RetroThemeToggle`).
- **Hover cross-tema:** cada cartão pinta o hover com o accent da página de destino (`--hub-dev-hover`, `--hub-projects-hover`, definidos nos temas `retro-hub-*`) — as duas pontas usam a mesma `--palette-*`, então o hover é a prévia real. Cartão novo ⇒ var nos dois modos **+** tema `retro-<rota>-*` **+** entrada em `RETRO_ROUTE_THEMES`.
- Não adicionar seções de conteúdo no hub — ele é a porta de entrada, o detalhe fica no `/dev` e em `/projetos`.

## Portfólio (`/dev`) — `RetroPersonaPage`

O link para recrutadores. Ordem das seções (controlada por `content.sections.*.enabled`):

1. **Hero** — cartão retro horizontal: à esquerda role + título gigante + descrição + local/modelo de trabalho (`hero.workplace`) + CTAs (projetos sólido accent; contato e currículo outline); à direita **avatar-radar**: foto circular com anéis girando (`spin` 20–40s, sentidos opostos), logo rotativo de fundo, 2 badges flutuantes (`hero.badges`). Canto decorativo `bg-accent` rotacionado 45°.
2. **About** — badge, título com highlight accent, stack como chips (`RetroSkillChip`).
3. **Projects** — os projetos `profissional` de `projects-config` (via `showcaseProjects()`) em cards com botões de estado (`Deploy Production` / `Offline` / `GitHub Privado`), fechando com o link "Ver projetos pessoais" → `/projetos`.
4. **Experience** — timeline de cartões.
5. **Contact** — protocolo de contato, status `Online`.
6. Footer micro-mono (`RetroStatusFooter`).

Header (`persona/Header`): logo, nav em caixa retro, toggles de skin + tema. No CV, botão `Baixar Currículo`.

## Projetos (`/projetos`, `/projetos/<slug>`) — `retro/projects/*`

- Barra de topo `RetroTopBar`: logo → hub, botão `← VOLTAR` (um nível acima, via `parentPath`), toggles de skin e tema. Não repete mais as seções do hub — em `/projetos` isso oferecia a página em que o visitante já estava.
- **Lista:** título gigante sublinhado em accent, filtro **Pessoais / Profissionais** em caixa retro (`role="tablist"`, estado local, default `pessoal`), grid de cards (capa, status, título, tagline, até 4 tags), mais recentes primeiro. Filtro vazio ⇒ `ui.emptyFilter`.
- **Capa:** o print do projeto (`image`) ou, sem print, uma capa gerada (título sobre o bloco accent com o logo ao fundo). No detalhe, a capa só aparece com print real.
- **Detalhe:** voltar à lista, status + ano, título, tagline, botões por tipo de link (demo, código, download, loja, site — o primeiro sólido), descrição, e cards de destaques e stack.

## Regras específicas

1. **Elementos circulares** (anéis, radar, foto redonda) são assinatura do hero retro — contraste proposital com o resto, que é 100% ortogonal.
2. Animações contínuas só nos anéis decorativos (spin lento) e indicadores de status (pulse); conteúdo entra com fade/slide 0.6s.
3. Foto grayscale→color no hover (desktop).
4. CV (`RetroCVViewer`) prioriza legibilidade para impressão/PDF.
5. Todo conteúdo/strings via `content` (incl. `ui.retro.*`) — nada hardcoded.
