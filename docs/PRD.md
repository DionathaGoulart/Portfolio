# PRD — Marca Pessoal de Dionatha Goulart (Foco: Stack Tecnológica)

**Produto:** Portfólio pessoal e marca profissional de Dionatha Goulart, posicionado por **domínio de tecnologias** (não por projetos).
**Objetivo:** Converter recrutadores, tech leads e clientes em contatos qualificados, comunicando profundidade e amplitude técnica: **Web (React/Next.js) + Backend (Node/NestJS/Python) + Mobile (React Native/Expo/Flutter)**.

**Site:** este repositório (Next.js 16, App Router). Estrutura atual: Hub geral (`/`) → Portfólio profissional (`/dev`, o link para recrutadores) e Projetos pessoais (`/projetos`), com CV imprimível em `/dev/cv`.

---

## 0. Estado Atual da Implementação (mapa PRD → código)

| Rota                            | Papel                                                                                          | Conteúdo em                   |
| ------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------- |
| `/`                             | Hub geral: porta de entrada pra todo mundo (Portfólio, Projetos, redes)                        | `src/data/hub-config.ts`      |
| `/dev`                          | Portfólio profissional — o link para recrutadores (modo gráfico + shell)                       | `src/data/dev-config.ts`      |
| `/dev/cv`                       | Currículo (viewer + PDF)                                                                       | `src/data/cv-dev.md`          |
| `/projetos`, `/projetos/<slug>` | Projetos pessoais e profissionais (filtro), com demo, código e download; `/<slug>` redireciona | `src/data/projects-config.ts` |

SEO centralizado em `src/data/seo-config.ts`. Todo conteúdo textual vive em `src/data/*` — **nunca hardcoded nos componentes**.

> Páginas futuras (ex.: `/youtube`) seguem o mesmo padrão: config própria em `src/data/`, uma view por skin via `SkinView`, style guide próprio em `docs/styleguides/`.

---

## 1. Posicionamento Central

**Headline:** "Desenvolvedor Fullstack — Web, Backend e Mobile. Uma stack completa, um único desenvolvedor."

**Narrativa:** Dionatha não é "dev de uma tecnologia só". Ele cobre o ciclo completo de produto digital: interfaces web modernas em React/Next.js, APIs robustas em Node.js/NestJS e Python/Django, apps mobile multiplataforma com React Native/Expo e Flutter, e apps desktop com Electron. Isso elimina a necessidade de múltiplos contratados e reduz atrito de comunicação — argumento forte tanto para vagas quanto para freelance.

**Provas de sustentação:** +3 anos de experiência, +10 aplicações em produção, arquitetura de monorepos (Turborepo), CI/CD com GitHub Actions, deploy contínuo (Vercel/Docker).

---

## 2. Pilares Tecnológicos (estrutura do portfólio)

> Cada pilar vira uma seção/página do portfólio, com copy própria, palavras-chave próprias e nível de proficiência declarado.

### Pilar 1 — Frontend Web: React & Next.js ⭐ (pilar principal)

- **Tecnologias:** React.js, Next.js (App Router, SSR/SSG/ISR), TypeScript, Vite, Tailwind CSS, Framer Motion.
- **Diferenciais:** experiências visuais avançadas e animações complexas (Framer Motion, geradores de patterns SVG); SEO técnico (meta tags, Open Graph, dados estruturados, Core Web Vitals); bibliotecas de componentes compartilhados em monorepo.
- **Copy sugerida:** "Interfaces rápidas, acessíveis e memoráveis. React e Next.js com TypeScript, do design system à experiência imersiva."
- **Nível declarado:** Avançado — uso diário em produção desde 2023.

### Pilar 2 — Backend: Node.js, NestJS & Python

- **Tecnologias:** Node.js, Express, **NestJS** `[definir nível: usado em produção? estudo avançado?]`, Python, Django, Django REST Framework, APIs RESTful, autenticação JWT/OAuth.
- **Diferenciais:** APIs escaláveis e bem documentadas (Postman); geração dinâmica de documentos/PDF; integrações de terceiros (WhatsApp Business API, Tiny ERP, gateways de pagamento); arquitetura modular (NestJS: modules, DI, guards, interceptors).
- **Copy sugerida:** "APIs robustas e escaláveis com Node.js, NestJS e Django — arquitetura limpa, autenticação segura e integrações que funcionam."
- **Nível declarado:** Node/Express e Django: Avançado. NestJS: `[confirmar]`.

### Pilar 3 — Mobile: React Native, Expo & Flutter

- **Tecnologias:** **React Native**, **Expo** (EAS Build, OTA updates), **Flutter/Dart** — `[definir nível de cada: apps publicados? side projects? em aprendizado ativo?]`.
- **Diferenciais:** reaproveitamento de lógica e componentes entre web (React) e mobile (React Native) no mesmo monorepo; publicação nas lojas (Google Play / App Store); Flutter como segunda opção multiplataforma.
- **Copy sugerida:** "Apps multiplataforma com React Native + Expo e Flutter — uma base de código, Android e iOS."
- **Nível declarado:** `[confirmar — crítico: recrutadores testam mobile em entrevista]`.
- ⚠️ **Ação obrigatória:** ter ao menos 1 app mobile demonstrável (ainda que interno/demo) antes de declarar este pilar publicamente.

### Pilar 4 — Dados & Persistência

- **Tecnologias:** PostgreSQL, MySQL, MongoDB (Mongoose), Supabase (Auth, Realtime, Storage, RLS).
- **Copy sugerida:** "Modelagem de dados que escala: SQL e NoSQL, com Supabase para produtos que precisam ir ao ar rápido."

### Pilar 5 — DevOps, Arquitetura & Ferramentas

- **Tecnologias:** Docker, Git, GitHub Actions (CI/CD), Vercel, Turborepo (monorepos), Figma, Postman.
- **Diferenciais:** pipelines de CI/CD automatizados; monorepos com builds incrementais; desktop apps com Electron + auto-update; automação com nut.js.
- **Copy sugerida:** "Do commit ao deploy sem fricção: CI/CD, Docker e monorepos com Turborepo."

---

## 3. Matriz de Proficiência (para a seção "Skills" do portfólio)

| Tecnologia                   | Nível sugerido         | Em produção?  |
| ---------------------------- | ---------------------- | ------------- |
| React.js / TypeScript        | Avançado               | ✅ Sim        |
| Next.js                      | Avançado               | ✅ Sim        |
| Tailwind CSS / Framer Motion | Avançado               | ✅ Sim        |
| Node.js / Express            | Avançado               | ✅ Sim        |
| NestJS                       | `[confirmar]`          | `[confirmar]` |
| Python / Django / DRF        | Intermediário-Avançado | ✅ Sim        |
| React Native / Expo          | `[confirmar]`          | `[confirmar]` |
| Flutter / Dart               | `[confirmar]`          | `[confirmar]` |
| PostgreSQL / Supabase        | Avançado               | ✅ Sim        |
| MongoDB / MySQL              | Intermediário          | ✅ Sim        |
| Docker / GitHub Actions      | Intermediário-Avançado | ✅ Sim        |
| Electron                     | Avançado               | ✅ Sim        |

> **Regra de ouro:** só declarar "Avançado" no que sustenta em entrevista técnica. Tecnologias em aprendizado entram como "Em evolução" — honestidade aqui gera confiança, não fraqueza.

Os níveis atualmente exibidos em `/dev` vivem em `devContent.about.stacks` (`src/data/dev-config.ts`). Qualquer ajuste da matriz acima deve ser refletido nesses arquivos.

---

## 4. Identidade Profissional

- **Nome:** Dionatha Goulart
- **Cargo:** Desenvolvedor Fullstack (Web · Backend · Mobile)
- **Idade:** `[preencher]`
- **Localização:** Alvorada, RS, Brasil (remoto-friendly)
- **Contato:** dionatha.work@gmail.com · (51) 98648-5232
- **LinkedIn:** linkedin.com/in/dionathagoulart · **GitHub:** github.com/DionathaGoulart · **Site:** `[confirmar domínio: seo-config.ts usa dionatha.com; PRD original citava dionatha.com.br]`

> WhatsApp unificado em `wa.me/5551986485232` (`dev-config.ts` e `hub-config.ts`).

**Bio curta (hero):**
"Desenvolvedor Fullstack com +3 anos e +10 aplicações em produção. React, Next.js e TypeScript no front; Node.js, NestJS e Django no back; React Native, Expo e Flutter no mobile."

**Bio longa (Sobre):**
"Sou Dionatha Goulart, desenvolvedor fullstack de Alvorada/RS. Trabalho com o ecossistema JavaScript/TypeScript de ponta a ponta — React e Next.js para web, Node.js e NestJS para APIs, React Native e Expo para mobile — além de Python/Django no backend e Flutter como stack multiplataforma. Nos últimos 3 anos coloquei mais de 10 aplicações em produção, sempre com arquitetura sólida: monorepos com Turborepo, CI/CD com GitHub Actions e deploy contínuo. Meu diferencial é cobrir o ciclo completo do produto sem perder profundidade em nenhuma camada."

---

## 5. Experiência Profissional (resumida, orientada a stack)

- **Containner® — Fullstack (Freelance) | abr/2025–atual:** React + Vite + TypeScript em monorepo; Framer Motion avançado; biblioteca de componentes compartilhada.
- **Freelancer/Autônomo — Fullstack | jun/2023–atual:** +10 apps web e desktop entregues; SaaS, dashboards com Supabase/PostgreSQL, Electron com auto-update; integrações WhatsApp Business API, Tiny ERP e pagamentos.
- **Cybernetrs LTDA — Suporte N2 | mar/2023–out/2024:** infraestrutura, redes, automação e monitoramento de sistemas críticos.

**Projetos em destaque (já no site, `/dev`):** Mil Ideias® (Next.js/PostgreSQL), XR Card (React/Node/Supabase), Detcheler (Node/ERP/WhatsApp), Containner® (React/Turborepo/Framer Motion).

## 6. Formação

- Análise e Desenvolvimento de Sistemas — Estácio (2025–2027, em andamento)
- Desenvolvedor Full Stack Python — EBAC (2023–2025)
- Redes TCP/IP — Fiberschool
- **Idiomas:** Português (nativo) · Inglês (B1/B2)

---

## 7. SEO — Palavras-chave por Pilar

**Pilar Web:** desenvolvedor react, desenvolvedor next.js, desenvolvedor frontend typescript, especialista react brasil, desenvolvedor next.js freelancer.
**Pilar Backend:** desenvolvedor node.js, desenvolvedor nestjs, desenvolvedor backend typescript, api rest node, desenvolvedor django.
**Pilar Mobile:** desenvolvedor react native, desenvolvedor expo, desenvolvedor flutter, criar app android ios, desenvolvedor mobile multiplataforma.
**Locais:** desenvolvedor fullstack porto alegre, desenvolvedor react rs, programador alvorada.
**Cauda longa:** "contratar desenvolvedor fullstack react e node", "desenvolvedor para criar saas", "app react native com expo freelancer".

**Title tag:** `Dionatha Goulart | Desenvolvedor Fullstack — React, Next.js, NestJS, React Native & Flutter`
**Meta description:** `Desenvolvedor Fullstack: React e Next.js no frontend, Node.js e NestJS no backend, React Native, Expo e Flutter no mobile. +10 apps em produção. Vamos conversar?`

Implementação: metadados por rota via `src/data/seo-config.ts` (`seoGlobal`, `seoHub`, `seoDev`, `seoProjects`), consumidos em `src/app/layout.tsx` e nos layouts das personas. `robots.ts` e `sitemap.ts` já existem em `src/app/`. Dados estruturados em `src/lib/schema.ts`.

---

## 8. Tom de Voz & CTAs

**Tom:** confiante e técnico, sem jargão vazio; cada tecnologia conectada a um benefício ("Next.js → SEO e performance", "NestJS → APIs escaláveis", "Expo → apps nas lojas mais rápido").

A camada visual do site usa vocabulário de "sistema operacional / terminal" (`DG_OS`, prompts, `RUN >>`, `SSH >>`) — isso é estética, não substitui a clareza da copy. Todo texto de UI vem dos objetos `ui` nos configs.

**CTAs:**

- Primário: "Vamos conversar" → WhatsApp
- Secundário: "Enviar e-mail" → dionatha.work@gmail.com
- Por pilar: "Ver o que já construí com [tecnologia]" → ancora nos cases (quando reativados)

---

## 9. Checklist antes de publicar

1. Definir nível real de NestJS, React Native/Expo e Flutter (produção, estudo ou aprendizado).
2. Ter pelo menos 1 demo mobile pública antes de anunciar o pilar Mobile.
3. Preencher idade e confirmar domínio canônico (dionatha.com vs dionatha.com.br).
4. ~~Unificar o número de WhatsApp~~ ✅ todos usam `wa.me/5551986485232`.
5. Replicar headline e bio no LinkedIn e GitHub para consistência de marca.
6. ~~Novo portfólio em Next.js com SSR/SSG~~ ✅ já é este repositório (Next.js 16 App Router).
