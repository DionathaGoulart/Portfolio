import { PersonaContent } from "@/types/content";
import { showcaseProjects } from "./projects-config";

export const devContent: PersonaContent = {
  persona: "dev",
  name: "Dionatha Goulart",
  role: "Desenvolvedor Fullstack — React, Next.js, Node.js",
  email: "dionatha.work@gmail.com",

  // ─── System Meta ─────────────────────────────────────────────────────────────
  meta: {
    username: "dionatha_goulart",
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
    contact: { enabled: true },
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
    yearsOfExperience: "3+ Years",
    workplace: "Alvorada/RS · Remoto",
    badges: ["3+ YEARS", "FULLSTACK"],
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
      {
        key: "DG_EMAIL",
        value: "dionatha.work@gmail.com",
        isLink: true,
        href: "mailto:dionatha.work@gmail.com",
      },
      {
        key: "DG_LINKEDIN",
        value: "linkedin.com/in/dionathagoulart",
        isLink: true,
        href: "https://linkedin.com/in/dionathagoulart",
      },
      {
        key: "DG_GITHUB",
        value: "github.com/DionathaGoulart",
        isLink: true,
        href: "https://github.com/DionathaGoulart",
      },
      {
        key: "DG_PHONE",
        value: "+55 (51) 98648-5232",
        isLink: true,
        href: "https://wa.me/5551986485232",
      },
      { key: "DG_STATUS", value: "READY_FOR_DEPLOYMENT" },
      { key: "DG_ROLE", value: "FULLSTACK_ENGINEER" },
    ],
  },

  // ─── Projects ────────────────────────────────────────────────────────────────
  // The professional projects live in projects-config, next to the personal ones, so
  // /projetos and this showcase describe the same work from a single entry.
  projects: showcaseProjects(),

  // ─── Experience ──────────────────────────────────────────────────────────────
  experience: [
    {
      company: "Containner®",
      role: "Fullstack Developer (Freelance)",
      period: "2025 - Presente",
      description:
        "Liderança técnica no desenvolvimento de aplicações imersivas e arquitetura de monorepos.",
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
      { name: "Gmail", url: "mailto:dionatha.work@gmail.com" },
      { name: "WhatsApp", url: "https://wa.me/5551986485232" },
    ],
  },

  // ─── UI / App Strings ────────────────────────────────────────────────────────
  ui: {
    terminal: {
      aboutTitle: "// System_Overview",
      experienceTitle: "operational_history",
      projectsTitle: "projects_repo",
      projectsHintNavigate: "NAVEGAR ENTRE PROJETOS",
      projectsHintOpen: "ABRIR VERSÃO PRODUÇÃO (LIVE)",
      projectsHintSource: "VISITAR CÓDIGO FONTE (GITHUB)",
      aboutSubtitle: "Hardware & Cognitive Specs v4.0",
      aboutModuleBio: "MODULE: PRIMARY_BIO",
      aboutModuleEnv: "MODULE: ENV_CONFIG",
      aboutModuleSys: "MODULE: SYSTEM_SERVICES",
      aboutSysHtop: "HTOP / CORE_MODULES",
      projectsPersonalLink: "ls ~/projetos-pessoais",
    },
    retro: {
      heroProjectsButton: "Ver Projetos",
      heroContactButton: "Falar Comigo",
      heroCvButton: "Currículo",
      aboutBadge: "Sobre",
      aboutTitlePrefix: "Transformando ideias em ",
      aboutTitleHighlight: "Produtos Reais.",
      aboutStackTitle: "Stack_Principal",
      projectsTitle: "PROJETOS SELECIONADOS",
      projectsSubtitle: "Aplicações em produção, do banco de dados à interface.",
      projectsScrollHint: "SCROLL ↓",
      projectsDeployButton: "Deploy Production",
      projectsOfflineButton: "Offline",
      projectsPrivateButton: "GitHub Privado",
      projectsRepoButton: "GitHub Repo",
      projectsPersonalLink: "Ver projetos pessoais",
      experienceTitle: "EXPERIÊNCIA",
      contactPrompt: "Iniciar protocolo de contato",
      contactFooterText: "Connection encrypted • Protocol active",
      contactStatus: "Online",
    },
  },
};
