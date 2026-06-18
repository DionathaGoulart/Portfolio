export interface SocialLink {
  name: string;
  url: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  status?: string;
  role?: string;
  features?: string[];
  details?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface SectionConfig {
  enabled: boolean;
}

export interface EnvVar {
  key: string;
  value: string;
  isLink?: boolean;
  href?: string;
}

export interface PortfolioContent {
  name: string;
  role: string;
  email: string;
  sections: {
    hero: SectionConfig;
    about: SectionConfig;
    projects: SectionConfig;
    experience: SectionConfig;
    contact: SectionConfig;
  };
  meta: {
    username: string;       // e.g. "dionatha_goulart"
    prompt: string;         // e.g. "dionatha@linux:~$"
    host: string;           // e.g. "DG-WORKSTATION"
    kernel: string;         // e.g. "6.1.0-STABLE"
    shell: string;          // e.g. "/bin/zsh"
    copyright: string;      // e.g. "DIONATHA GOULART"
  };
  hero: {
    title: string;
    description: string;
    gitBranch: string;      // e.g. "production/stable"
    uptime: string;         // e.g. "3 years, 128 days, 4 hours"
    status: string;         // e.g. "Available_to_Code"
    expertise: string;      // e.g. "Fullstack_Dev"
    location: string;       // e.g. "Rio_Grande_do_Sul"
    yearsOfExperience: string; // e.g. "3+ Years"
  };
  about: {
    text: string;
    subtitle: string;       // e.g. "Engenheiro de Software Fullstack"
    stacks: Skill[];
    envVars: EnvVar[];      // contact/env variables shown in ENV_CONFIG module
  };
  projects: Project[];
  experience: Experience[];
  contact: {
    title: string;
    description: string;
    socials: SocialLink[];
  };
}

export interface HubContent {
  name: string;
  title: string;
  typingText: string;
  description: string;
  profileImage: string;
  socials: (SocialLink & { type: string })[];
  sections: {
    [key: string]: {
      title: string;
      subtitle: string;
      tags: string;
      status: string;
      action: string;
      href: string;
      hoverColor: string;
    };
  };
  footer: {
    core: string;
    build: string;
    root: string;
  };
}
