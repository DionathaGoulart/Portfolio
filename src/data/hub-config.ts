import { HubContent } from "@/types/content";

export const hubContent: HubContent = {
  name: "Dionatha Goulart",
  title: "Dionatha Goulart",
  typingText: "Sistemas de Ponta a Ponta.",
  description: "Engenharia de Software e Operações de TI fundidas em uma única experiência técnica de alta performance.",
  profileImage: "/me.png",
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/dionathagoulart', type: 'linkedin' },
    { name: 'GitHub', url: 'https://github.com/DionathaGoulart', type: 'github' },
    { name: 'Email', url: 'mailto:dionatha.work@gmail.com', type: 'gmail' },
    { name: 'Celular', url: 'https://wa.me/5551998544525', type: 'whatsapp' }
  ],
  sections: {
    dev: {
      title: "Dev_Portfolio",
      subtitle: "SOFTWARE_ENG.EXE",
      tags: "SaaS • Next.js • Fullstack • UX",
      status: "Status: Stable",
      action: "RUN >>",
      href: "/dev",
      hoverColor: "var(--hub-dev-hover)"
    },
    ti: {
      title: "Ops_Terminal",
      subtitle: "IT_OPERATIONS.SH",
      tags: "Infra • Redes • Linux • Auto",
      status: "Active_Session",
      action: "SSH >>",
      href: "/ti",
      hoverColor: "var(--hub-ti-hover)"
    }
  },
  footer: {
    core: "DG_OS_CORE",
    build: "BUILD_2026.06.17",
    root: "PORTIFOLIO_ROOT_HUB"
  }
};
