import type { PersonalProject, Project, ProjectKind, ProjectsContent } from "@/types/content";

/**
 * Every project, personal and professional: /projetos lists them behind the kind filter,
 * /projetos/<slug> is each one's page and /<slug> redirects there (next.config.ts). Adding
 * a project is adding an entry here — plus an optional screenshot under public/projects/.
 *
 * This is also where the portfolio's showcase comes from: dev-config maps the
 * `profissional` entries into the /dev projects section and the shell, so a client project
 * is described once instead of once per page.
 */
export const projectsContent: ProjectsContent = {
  title: "Projetos",
  subtitle: "Tudo o que eu construo por conta própria — com código aberto, demo e download.",
  statusLabels: {
    wip: "Em desenvolvimento",
    beta: "Beta",
    stable: "Estável",
  },
  ui: {
    backToList: "Todos os projetos",
    highlightsTitle: "Destaques",
    stackTitle: "Stack",
    aboutTitle: "Sobre o projeto",
    emptyLinks: "Links em breve",
    openProject: "Abrir",
    filters: {
      pessoal: "Pessoais",
      profissional: "Profissionais",
    },
    emptyFilter: "Nada por aqui ainda.",
  },
  projects: [
    {
      slug: "dg-os",
      title: "DG_OS",
      tagline: "Este site: hub pessoal e portfólio com duas skins e um terminal interativo.",
      description:
        "Hub pessoal e portfólio construído com Next.js 16, React 19 e Tailwind CSS v4. O visitante alterna entre duas skins completas — retro neo-brutalista e terminal — e pode navegar pelo portfólio digitando comandos num shell.\n\nTodo o conteúdo vive em arquivos de configuração tipados, as cores saem de um catálogo único de paletas montado em temas daisyUI, e o isolamento entre as skins é garantido por regras de lint.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "daisyUI", "Framer Motion"],
      status: "wip",
      kind: "pessoal",
      year: "2026",
      updated: "2026-09-19",
      highlights: [
        "Duas skins trocadas em tempo real, sem flash na primeira pintura",
        "Shell interativo com autocompletar, histórico e seletor de paletas",
        "Conteúdo 100% em config tipada; páginas estáticas",
      ],
      links: [
        { kind: "site", label: "Abrir site", href: "https://dionatha.com.br" },
        {
          kind: "repo",
          label: "Ver código",
          href: "https://github.com/DionathaGoulart/Portfolio",
        },
      ],
    },
    {
      slug: "linkspace",
      title: "LinkSpace",
      tagline: "Encurtador de URLs com analytics em tempo real e geolocalização.",
      description:
        "Encurtador de URLs corporativo com analytics em tempo real e geolocalização dos acessos.",
      tags: [],
      status: "wip",
      kind: "pessoal",
      year: "",
      updated: "2026-01-01",
      links: [],
    },
    {
      slug: "macro-helldivers-2",
      title: "Macro Helldivers 2",
      tagline: "Automação desktop com emulação de hardware e integração nativa com o SO.",
      description:
        "Automação desktop feita com Electron, com emulação de hardware e integração nativa com o sistema operacional.",
      tags: ["Electron"],
      status: "wip",
      kind: "pessoal",
      year: "",
      updated: "2026-01-01",
      links: [],
    },
    {
      slug: "mil-ideias",
      title: "Mil Ideias®",
      tagline:
        "Plataforma premium para catálogo de produtos e geração de orçamentos personalizados.",
      description:
        "Uma solução completa desenvolvida para digitalizar e otimizar as operações comerciais de catálogos e orçamentos, reduzindo o tempo de fechamento de vendas em mais de 40%.",
      tags: ["Next.js", "PostgreSQL", "Tailwind"],
      status: "stable",
      kind: "profissional",
      year: "",
      updated: "2026-01-01",
      highlights: [
        "Catálogo de produtos interativo com carregamento instantâneo",
        "Geração automatizada de orçamentos personalizados em PDF",
        "Painel administrativo robusto para controle de inventário e vendas",
        "Integração com gateways de pagamento locais e analytics",
      ],
      links: [
        { kind: "site", label: "Abrir site", href: "https://milideias.com.br" },
        { kind: "repo", label: "Ver código", href: "https://github.com/DionathaGoulart" },
      ],
      showcase: { status: "PRODUCTION", role: "Fullstack Developer" },
    },
    {
      slug: "xr-card",
      title: "XR Card",
      tagline: "Plataforma de benefícios de saúde e telemedicina com alta conversão.",
      description:
        "Plataforma desenvolvida para simplificar o acesso a benefícios de saúde e telemedicina, focada em entregar uma experiência de usuário limpa, rápida e sem atritos para o usuário final.",
      tags: ["React", "Node.js", "Supabase"],
      status: "stable",
      kind: "profissional",
      year: "",
      updated: "2026-01-01",
      highlights: [
        "Fluxo de onboarding ultra-otimizado com alta conversão",
        "Integração direta com APIs de telemedicina e agendamento",
        "Assinatura digital de contratos e pagamentos recorrentes",
        "Dashboard do paciente com histórico clínico e carteira virtual",
      ],
      links: [
        { kind: "site", label: "Abrir site", href: "https://xrcard.com.br" },
        { kind: "repo", label: "Ver código", href: "https://github.com/DionathaGoulart" },
      ],
      showcase: { status: "STABLE", role: "Lead Fullstack Developer" },
    },
    {
      slug: "detcheler",
      title: "Detcheler",
      tagline: "Sincronização inteligente com Tiny ERP e automação via WhatsApp.",
      description:
        "Um middleware de alto desempenho projetado para unificar sistemas ERP com canais de comunicação direta, automatizando a jornada de pós-venda e eliminando erros manuais de sincronização.",
      tags: ["Node.js", "ERP API", "Automation"],
      status: "stable",
      kind: "profissional",
      year: "",
      updated: "2026-01-01",
      highlights: [
        "Sincronização bidirecional de estoque e pedidos em tempo real",
        "Disparo automatizado de notificações de rastreamento via WhatsApp",
        "Processamento de filas de mensagens com retry automático",
        "Relatórios de consistência de dados entre ERP e e-commerce",
      ],
      links: [],
      showcase: {
        status: "ACTIVE",
        role: "Backend & Integration Specialist",
        github: "private",
        fileExtension: ".ts",
      },
    },
    {
      slug: "containner",
      title: "Containner®",
      tagline: "Showcase imersivo com geradores de patterns dinâmicos e monorepo.",
      description:
        "Um showcase interativo premium e imersivo construído sobre uma arquitetura de monorepo de última geração, integrando design arrojado e performance técnica extrema.",
      tags: ["React", "Turborepo", "Framer Motion"],
      status: "stable",
      kind: "profissional",
      year: "",
      updated: "2026-01-01",
      highlights: [
        "Gerador algorítmico de patterns visuais dinâmicos em SVG/CSS",
        "Arquitetura Monorepo escalável usando Turborepo e pnpm",
        "Animações fluidas a 60fps usando Framer Motion e Tailwind",
        "Sistema modular de componentes compartilhados reutilizáveis",
      ],
      links: [
        { kind: "site", label: "Abrir site", href: "https://containner.com.br" },
        { kind: "repo", label: "Ver código", href: "https://github.com/DionathaGoulart" },
      ],
      showcase: { status: "STABLE", role: "Fullstack Developer" },
    },
  ],
};

/** Projects newest first, the order every list uses. */
export function sortedProjects() {
  return [...projectsContent.projects].sort((a, b) => b.updated.localeCompare(a.updated));
}

export function findProject(slug: string) {
  return projectsContent.projects.find((p) => p.slug === slug);
}

/** The most recently updated project still in development: the hub's "agora: construindo". */
export function currentProject() {
  return sortedProjects().find((p) => p.status === "wip");
}

/** The projects of one kind, in config order. */
export function projectsByKind(kind: ProjectKind): PersonalProject[] {
  return projectsContent.projects.filter((p) => p.kind === kind);
}

/**
 * The professional projects in the shape the /dev sections and the shell read. The
 * portfolio talks about clients (role, status chip, private repos), the project page talks
 * about the work itself, so the showcase-only fields travel in `showcase` and are unpacked
 * here rather than duplicated in dev-config.
 */
export function showcaseProjects(): Project[] {
  return projectsByKind("profissional").map((p) => {
    const site = p.links.find((l) => l.kind === "site" || l.kind === "demo");
    const repo = p.links.find((l) => l.kind === "repo");
    return {
      title: p.title,
      description: p.tagline,
      tags: p.tags,
      link: site?.href ?? "#",
      github: repo?.href ?? p.showcase?.github,
      status: p.showcase?.status,
      role: p.showcase?.role,
      features: p.highlights,
      details: p.description,
      fileExtension: p.showcase?.fileExtension,
    };
  });
}
