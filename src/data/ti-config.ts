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
  meta: {
    username: "dionatha_infra",
    prompt: "root@infra-ops:~#",
    host: "TI-CORE-NODE",
    kernel: "Linux 6.1.0-STABLE",
    shell: "/bin/bash",
    copyright: "DIONATHA GOULART",
  },
  hero: {
    title: "Infraestrutura resiliente e automação inteligente.",
    description: "Especialista em suporte N2, redes TCP/IP e otimização de fluxos operacionais. Transformando infraestrutura em vantagem competitiva.",
    gitBranch: "ops/stable",
    uptime: "2 years, 45 days, 12 hours",
    status: "Monitoring_Systems",
    expertise: "IT_Infrastructure",
    location: "Rio_Grande_do_Sul",
    yearsOfExperience: "2+ Years",
  },
  about: {
    text: "Especialista em Operações de TI com foco em infraestrutura resiliente, automação de processos e suporte avançado. Experiência sólida em ambientes críticos, garantindo alta disponibilidade e performance técnica de ponta a ponta.",
    subtitle: "Analista de Infraestrutura",
    envVars: [
      { key: "ROLE", value: "IT_Operations" },
      { key: "SHELL", value: "/bin/bash" },
      { key: "PAGER", value: "less" },
      { key: "LANG", value: "pt_BR.UTF-8" }
    ],
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
      github: "private",
    },
    {
      title: "Monitoramento Zabbix",
      description: "Implementação de monitoramento full-stack com dashboards personalizados.",
      tags: ["Zabbix", "SNMP", "Grafana"],
      link: "#",
      github: "private",
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
      { name: "Gmail", url: "mailto:dionatha.work@gmail.com" },
      { name: "WhatsApp", url: "https://wa.me/5551998544525" },
    ],
  },
};
