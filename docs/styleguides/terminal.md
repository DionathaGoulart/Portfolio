# Style Guide — Skin Terminal (alternativa)

**Temas:** `terminal-*`, escolhidos pelo visitante com o comando `theme` — padrão Light `p2` Abyss Frost · Dark `d2` Vault Gold. Valem para todas as rotas.
**Arquivos:** `src/components/terminal/{hub,sections,shell,projects,ui}/*` · conteúdo em `src/data/{hub,dev,projects}-config.ts` (`meta`, `hero.*`, `about.envVars`, `ui.terminal.*`)

## Personalidade

A skin **imersiva**: uma "workstation" (`root@dg-os`) com janelas de terminal. **Toda página** tem **dois modos**:

- **Modo gráfico (default):** a página em seções, cartões-terminal grandes, Framer Motion.
- **Shell (`TerminalMode`):** CLI interativa real — o visitante navega o portfólio digitando comandos. Alternância pelo botão `▶_ SHELL` (`TermShellToggle`) do header de cada página, via `ShellModeContext` (provido no `app/layout.tsx`) e `TermShellView`, que faz o crossfade de 0.3s em volta do corpo da página.

O shell é o mesmo em todas as rotas: fora do `/dev`, `TerminalMode` cai no `devContent` por padrão — import dentro do módulo lazy, para o `dev-config` não entrar no bundle do hub. O modo volta pro gráfico a cada troca de rota (nunca é persistido).

Referência de tom: densidade técnica alta, mas **legível** — decoração de terminal em opacidade ≤ 30%, nunca competindo com o conteúdo.

## Hub (`/`) — `TermHub`

- Janela `heavy` com `whoami` (nome em `terminal-glow`), `cat manifest.txt` (`TypingText` + descrição) e foto circular na coluna lateral.
- `> agora: construindo` com o projeto `wip` mais recente.
- Janela `bar` "`ls -la`" listando as seções do hub (Portfólio, Projetos) como linhas clicáveis (prompt, título, subtítulo/tags, status, ação); hover inverte a linha em `bg-accent`.
- Rodapé: `TermSocialLinks` + assinatura do build. Toggles `▶_ SHELL` + `[SKIN:RETRO]` + `[MODE:*]` fixos no topo-direito, **fora** do `TermShellView` (são a saída do shell).

## Portfólio (`/dev`) — `TermPersonaPage`

Vocabulário de dev (git/deploy/zsh — ver `meta` e `ui.terminal` em `dev-config.ts`).

1. **Hero** — janela fullscreen: sequência `whoami / fetch --role / git branch / uptime`, role com `TypingText` + `terminal-glow`, descrição em bloco com borda-esquerda, coluna lateral (4/12) com foto e `USER_MANIFEST`.
2. **About** — módulos nomeados (`MODULE: PRIMARY_BIO`, `ENV_CONFIG`, `SYSTEM_SERVICES`), skills estilo HTOP, env vars clicáveis.
3. **Projects** — file manager (`ls -la`) + painel README do projeto ativo; auto-play, teclado (↑/↓, Enter, G); abaixo, `$ ls ~/projetos-pessoais →` leva a `/projetos`.
4. **Experience** — `git log` compacto.
5. **Contact** — protocolo de contato com as redes.
6. Footer: `SYS_BUILD // <ano>` + `AUTHOR_ID`.

Espaçamento entre seções: `gap-16 md:gap-28` (equalizado). Container via `PersonaPage` (`max-w-7xl`, `pt-20 md:pt-24`).

## Projetos (`/projetos`, `/projetos/<slug>`) — `terminal/projects/*`

- Barra de topo `TermTopBar`: prompt → hub, botão `cd .. VOLTAR` (um nível acima, via `parentPath`), toggles de shell, skin e modo. Não repete mais as seções do hub — em `/projetos` isso oferecia a página em que o visitante já estava.
- **Lista:** `cd ~/projetos && ls -la --<kind>` + título em `terminal-glow`; filtro `[$ Pessoais] [> Profissionais]` (`role="tablist"`, estado local, default `pessoal`); janela `bar` com uma linha por projeto (`slug/`, tagline, tags, status, `Abrir >>`). Filtro vazio ⇒ `ui.emptyFilter`.
- **Detalhe:** `cd ..`, janela `heavy` `~/projetos/<slug>/README.md` com status, título, tagline, botões `btn-terminal` por tipo de link, print (se houver) e seções `# SOBRE`, `# DESTAQUES` (`[+]`), `# STACK`.

## Regras específicas

1. **Shell:** manter altura estável do "monitor" e strings enxutas. Comandos leem o `content` do portfólio (`allCommands(content)`, `COMMAND_OUTPUTS`), nunca duplicam conteúdo; `cat cv` abre o CV.
2. Scanline com `opacity-10`; glow só em texto-destaque digitado.
3. CV (`TermCVViewer`) prioriza legibilidade para impressão/PDF — sem scanline/glow no conteúdo.
4. Header do CV: o prompt longo e o botão de shell só aparecem em telas largas (a barra também leva o `DOWNLOAD_CV.SH`). O indicador decorativo `CV_SESSION_ACTIVE` deu lugar ao toggle de shell.

## O que NÃO fazer aqui

- Não reintroduzir botões no Hero (removidos intencionalmente — commit `2cd06bd`).
- Não adicionar strings decorativas de terminal em excesso (limpeza intencional — commits `b035bff`, `9ba14cc`).
- Não hardcodar conteúdo/strings — tudo via `content` (incl. `ui.terminal.*`).
