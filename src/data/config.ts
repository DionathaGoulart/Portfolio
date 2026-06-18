export const devContent = {
  name: "Dionatha Goulart",
  role: "Software Engineer | Fullstack Developer",
  email: "dionatha.work@gmail.com",
  sections: {
    hero: { enabled: true },
    about: { enabled: true },
    projects: { enabled: true },
    experience: { enabled: true },
    contact: { enabled: true },
  },
  hero: {
    title: "Construindo o futuro através de código sólido.",
    description: "Especialista em criar aplicações SaaS, Monorepos e experiências digitais imersivas. Focado em performance, escalabilidade e design premium.",
  },
  about: {
    text: "Desenvolvedor fullstack com mais de 3 anos de experiência em produção. Especialista em ecossistemas JavaScript/TypeScript, construindo soluções que unem design de elite com arquitetura robusta.",
    stacks: [
      { name: "React / Next.js", level: 95 },
      { name: "Node.js / Express", level: 90 },
      { name: "TypeScript", level: 92 },
      { name: "Python / Django", level: 85 },
      { name: "PostgreSQL / MongoDB", level: 88 },
      { name: "Docker / DevOps", level: 80 },
    ],
  },
  projects: [
    {
      title: "Mil Ideias®",
      description: "Plataforma premium para catálogo de produtos e geração de orçamentos personalizados.",
      tags: ["Next.js", "PostgreSQL", "Tailwind"],
      link: "#",
    },
    {
      title: "XR Card",
      description: "Plataforma de benefícios de saúde e telemedicina com alta conversão.",
      tags: ["React", "Node.js", "Supabase"],
      link: "#",
    },
    {
      title: "Detcheler",
      description: "Sincronização inteligente com Tiny ERP e automação via WhatsApp.",
      tags: ["Node.js", "ERP API", "Automation"],
      link: "#",
    },
    {
      title: "Containner®",
      description: "Showcase imersivo com geradores de patterns dinâmicos e monorepo.",
      tags: ["React", "Turborepo", "Framer Motion"],
      link: "#",
    },
  ],
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
