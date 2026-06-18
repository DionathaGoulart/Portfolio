import { PortfolioContent } from "@/types/content";

export const devContent: PortfolioContent = {
  name: "Dionatha Goulart",
  role: "Software Engineer | Fullstack Developer",
  email: "dionatha.work@gmail.com",

  // ─── System Meta ─────────────────────────────────────────────────────────────
  meta: {
    username: "dionatha_goulart",
    prompt: "dionatha@linux:~$",
    host: "DG-WORKSTATION",
    kernel: "6.1.0-STABLE",
    shell: "/bin/zsh",
    copyright: "DIONATHA GOULART",
  },

  sections: {
    hero: { enabled: true },
    about: { enabled: true },
    projects: { enabled: true },
    experience: { enabled: true },
    contact: { enabled: false },
  },

  // ─── Hero ─────────────────────────────────────────────────────────────────────
  hero: {
    title: "Construindo o futuro através de código sólido.",
    description:
      "Especialista em criar aplicações SaaS, Monorepos e experiências digitais imersivas. Focado em performance, escalabilidade e design premium.",
    gitBranch: "production/stable",
    uptime: "3 years, 128 days, 4 hours",
    status: "Available_to_Code",
    expertise: "Fullstack_Dev",
    location: "Rio_Grande_do_Sul",
    yearsOfExperience: "3+ Years",
  },

  // ─── About ───────────────────────────────────────────────────────────────────
  about: {
    subtitle: "Engenheiro de Software Fullstack",
    text: "Desenvolvedor fullstack com mais de 3 anos de experiência em produção. Especialista em ecossistemas JavaScript/TypeScript, construindo soluções que unem design de elite com arquitetura robusta.",
    stacks: [
      { name: "React / Next.js", level: 95 },
      { name: "Node.js / Express", level: 90 },
      { name: "TypeScript", level: 92 },
      { name: "Python / Django", level: 85 },
      { name: "PostgreSQL / MongoDB", level: 88 },
      { name: "Docker / DevOps", level: 80 },
    ],
    envVars: [
      { key: "DG_EMAIL",    value: "dionatha.work@gmail.com",         isLink: true, href: "mailto:dionatha.work@gmail.com" },
      { key: "DG_LINKEDIN", value: "linkedin.com/in/dionathagoulart", isLink: true, href: "https://linkedin.com/in/dionathagoulart" },
      { key: "DG_GITHUB",   value: "github.com/DionathaGoulart",      isLink: true, href: "https://github.com/DionathaGoulart" },
      { key: "DG_PHONE",    value: "+55 (51) 98648-5232",             isLink: true, href: "https://wa.me/5551986485232" },
      { key: "DG_STATUS",   value: "READY_FOR_DEPLOYMENT" },
      { key: "DG_ROLE",     value: "FULLSTACK_ENGINEER" },
    ],
  },

  // ─── Projects ────────────────────────────────────────────────────────────────
  projects: [
    {
      title: "Mil Ideias®",
      description: "Plataforma premium para catálogo de produtos e geração de orçamentos personalizados.",
      tags: ["Next.js", "PostgreSQL", "Tailwind"],
      link: "https://milideias.com.br",
      github: "https://github.com/DionathaGoulart",
      status: "PRODUCTION",
      role: "Fullstack Developer",
      features: [
        "Catálogo de produtos interativo com carregamento instantâneo",
        "Geração automatizada de orçamentos personalizados em PDF",
        "Painel administrativo robusto para controle de inventário e vendas",
        "Integração com gateways de pagamento locais e analytics",
      ],
      details:
        "Uma solução completa desenvolvida para digitalizar e otimizar as operações comerciais de catálogos e orçamentos, reduzindo o tempo de fechamento de vendas em mais de 40%.",
    },
    {
      title: "XR Card",
      description: "Plataforma de benefícios de saúde e telemedicina com alta conversão.",
      tags: ["React", "Node.js", "Supabase"],
      link: "https://xrcard.com.br",
      github: "https://github.com/DionathaGoulart",
      status: "STABLE",
      role: "Lead Fullstack Developer",
      features: [
        "Fluxo de onboarding ultra-otimizado com alta conversão",
        "Integração direta com APIs de telemedicina e agendamento",
        "Assinatura digital de contratos e pagamentos recorrentes",
        "Dashboard do paciente com histórico clínico e carteira virtual",
      ],
      details:
        "Plataforma desenvolvida para simplificar o acesso a benefícios de saúde e telemedicina, focada em entregar uma experiência de usuário limpa, rápida e sem atritos para o usuário final.",
    },
    {
      title: "Detcheler",
      description: "Sincronização inteligente com Tiny ERP e automação via WhatsApp.",
      tags: ["Node.js", "ERP API", "Automation"],
      link: "#",
      github: "private",
      status: "ACTIVE",
      role: "Backend & Integration Specialist",
      features: [
        "Sincronização bidirecional de estoque e pedidos em tempo real",
        "Disparo automatizado de notificações de rastreamento via WhatsApp",
        "Processamento de filas de mensagens com retry automático",
        "Relatórios de consistência de dados entre ERP e e-commerce",
      ],
      details:
        "Um middleware de alto desempenho projetado para unificar sistemas ERP com canais de comunicação direta, automatizando a jornada de pós-venda e eliminando erros manuais de sincronização.",
    },
    {
      title: "Containner®",
      description: "Showcase imersivo com geradores de patterns dinâmicos e monorepo.",
      tags: ["React", "Turborepo", "Framer Motion"],
      link: "https://containner.com.br",
      github: "https://github.com/DionathaGoulart",
      status: "STABLE",
      role: "Fullstack Developer",
      features: [
        "Gerador algorítmico de patterns visuais dinâmicos em SVG/CSS",
        "Arquitetura Monorepo escalável usando Turborepo e pnpm",
        "Animações fluidas a 60fps usando Framer Motion e Tailwind",
        "Sistema modular de componentes compartilhados reutilizáveis",
      ],
      details:
        "Um showcase interativo premium e imersivo construído sobre uma arquitetura de monorepo de última geração, integrando design arrojado e performance técnica extrema.",
    },
  ],

  // ─── Experience ──────────────────────────────────────────────────────────────
  experience: [
    {
      company: "Containner®",
      role: "Fullstack Developer (Freelance)",
      period: "2025 - Presente",
      description: "Liderança técnica no desenvolvimento de aplicações imersivas e arquitetura de monorepos.",
    },
    {
      company: "Cybernetrs",
      role: "IT Operations & Automation",
      period: "2023 - 2024",
      description: "Automação de processos críticos e monitoramento de infraestrutura.",
    },
  ],

  // ─── Contact ─────────────────────────────────────────────────────────────────
  contact: {
    title: "Vamos conversar?",
    description: "Estou aberto a novas oportunidades e parcerias em projetos inovadores.",
    socials: [
      { name: "LinkedIn", url: "https://linkedin.com/in/dionathagoulart" },
      { name: "GitHub", url: "https://github.com/DionathaGoulart" },
      { name: "Email", url: "mailto:dionatha.work@gmail.com" },
    ],
  },
};

export const themeConfig = {
  routes: {
    "/": "theme-default",
    "/dev": "theme-dev",
    "/ti": "theme-ti",
    "/dev/cv": "theme-dev",
    "/ti/cv": "theme-ti",
  },
  default: "theme-default",
};
