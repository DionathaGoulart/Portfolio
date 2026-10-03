import { HubContent } from "@/types/content";

export const hubContent: HubContent = {
  name: "Dionatha Goulart",
  typingText: "Desenvolvedor Fullstack.",
  description:
    "React, Next.js e Node.js. Aqui ficam meus projetos, meu portfólio e tudo o que eu construo.",
  nowLabel: "agora: construindo",
  nav: {
    back: "Voltar",
    backTitle: "Voltar",
    shell: "SHELL",
    graphic: "GRAPHIC",
    shellLong: "Abrir o shell interativo",
    graphicLong: "Voltar ao modo gráfico",
  },
  profileImage: "/me.png",
  socials: [
    { name: "LinkedIn", url: "https://linkedin.com/in/dionathagoulart", type: "linkedin" },
    { name: "GitHub", url: "https://github.com/DionathaGoulart", type: "github" },
    { name: "Email", url: "mailto:dionatha.work@gmail.com", type: "gmail" },
    { name: "Celular", url: "https://wa.me/5551986485232", type: "whatsapp" },
  ],
  sections: {
    portfolio: {
      title: "Portfólio",
      subtitle: "PORTFOLIO.EXE",
      tags: "Stack • Experiência • Currículo",
      status: "Profissional",
      action: "ABRIR >>",
      href: "/dev",
      hoverColor: "var(--hub-dev-hover)",
    },
    projects: {
      title: "Projetos",
      subtitle: "PROJECTS.SH",
      tags: "Demos • Código • Downloads",
      status: "{count} projetos",
      action: "VER >>",
      href: "/projetos",
      hoverColor: "var(--hub-projects-hover)",
    },
  },
  footer: {
    core: "DG_OS_CORE",
    build: "BUILD_2026.06.17",
    root: "PORTIFOLIO_ROOT_HUB",
  },
};
