import { PortfolioContent } from "@/types/content";

export const tiContent: PortfolioContent = {
  name: "Dionatha Goulart",
  role: "IT Operations Specialist | Infrastructure",
  email: "dionatha.work@gmail.com",
  sections: {
    hero: { enabled: true },
    about: { enabled: true },
    projects: { enabled: true },
    experience: { enabled: true },
    contact: { enabled: true },
  },
  hero: {
    title: "Infraestrutura resiliente e automação inteligente.",
    description: "Especialista em suporte N2, redes TCP/IP e otimização de fluxos operacionais. Transformando infraestrutura em vantagem competitiva.",
  },
  about: {
    text: "Especialista em Operações de TI com foco em infraestrutura resiliente, automação de processos e suporte avançado. Experiência sólida em ambientes críticos, garantindo alta disponibilidade e performance técnica de ponta a ponta.",
    stacks: [
      { name: "Redes TCP/IP", level: 95 },
      { name: "Docker / Containers", level: 90 },
      { name: "Linux Administration", level: 92 },
      { name: "Python / Automation", level: 88 },
      { name: "Monitoring (Zabbix/GLPI)", level: 85 },
      { name: "Troubleshooting", level: 98 },
    ],
  },
  projects: [
    {
      title: "Automação de Backup",
      description: "Scripts em Python para backup automatizado e verificação de integridade.",
      tags: ["Python", "Bash", "Linux"],
      link: "#",
    },
    {
      title: "Monitoramento Zabbix",
      description: "Implementação de monitoramento full-stack com dashboards personalizados.",
      tags: ["Zabbix", "SNMP", "Grafana"],
      link: "#",
    }
  ],
  experience: [
    {
      company: "Cybernetrs",
      role: "Técnico de Suporte Nível 2",
      period: "2023 - 2024",
      description: "Diagnóstico avançado de redes, resolução de incidentes críticos e automação de rotinas de suporte.",
    },
    {
      company: "Freelance",
      role: "Especialista em Automação",
      period: "2023 - Presente",
      description: "Desenvolvimento de ferramentas de integração ERP e scripts de automação de infraestrutura.",
    },
  ],
  contact: {
    title: "Conexão de Rede?",
    description: "Inicie um novo protocolo de comunicação para colaborações em infraestrutura e automação.",
    socials: [
      { name: "LinkedIn", url: "https://linkedin.com/in/dionathagoulart" },
      { name: "GitHub", url: "https://github.com/DionathaGoulart" },
      { name: "Email", url: "mailto:dionatha.work@gmail.com" },
    ],
  },
};
