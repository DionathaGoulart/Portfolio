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
  /** Extension shown in the terminal file listing. Defaults to `.tsx`. */
  fileExtension?: string;
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

/** Shape both personas share. Persona-specific extras live in DevContent / TiContent. */
export interface PortfolioContent {
  name: string;
  role: string;
  sections: {
    hero: SectionConfig;
    about: SectionConfig;
    projects: SectionConfig;
    experience: SectionConfig;
    contact: SectionConfig;
  };
  hero: {
    title: string;
    description: string;
    badges?: string[]; // e.g. ["LVL: 99", "OPS_READY"]
  };
  about: {
    text: string;
    stacks: Skill[];
  };
  projects: Project[];
  experience: Experience[];
  contact: {
    title: string;
    description: string;
    socials: SocialLink[];
  };
}

/**
 * UI strings are typed per persona rather than Record<string, string>, so a typo in a key
 * is a compile error and every key is provably rendered somewhere.
 */
export interface DevUiStrings {
  aboutTitle: string;
  aboutSubtitle: string;
  aboutModuleBio: string;
  aboutModuleEnv: string;
  aboutModuleSys: string;
  aboutSysHtop: string;
}

export interface TiUiStrings {
  heroProjectsButton: string;
  heroContactButton: string;
  aboutBadge: string;
  aboutTitlePrefix: string;
  aboutTitleHighlight: string;
  aboutStackTitle: string;
  projectsTitle: string;
  projectsSubtitle: string;
  projectsScrollHint: string;
  projectsDeployButton: string;
  projectsOfflineButton: string;
  projectsPrivateButton: string;
  projectsRepoButton: string;
  experienceTitle: string;
  contactPrompt: string;
  contactFooterText: string;
  contactStatus: string;
}

/**
 * The dev skin renders a fake shell, so it carries system metadata and env variables the
 * ti skin has no surface for. These used to sit on the shared type, which forced ti-config
 * to invent values that were never rendered.
 */
export interface DevContent extends PortfolioContent {
  email: string;
  meta: {
    username: string; // e.g. "dionatha_goulart"
    host: string; // e.g. "DG-WORKSTATION"
    kernel: string; // e.g. "6.1.0-STABLE"
    shell: string; // e.g. "/bin/zsh"
    copyright: string; // e.g. "DIONATHA GOULART"
  };
  hero: PortfolioContent["hero"] & {
    gitBranch: string; // e.g. "production/stable"
    uptime: string; // e.g. "3 years, 128 days, 4 hours"
    status: string; // e.g. "Available_to_Code"
    expertise: string; // e.g. "Fullstack_Dev"
    location: string; // e.g. "Rio_Grande_do_Sul"
    yearsOfExperience: string; // e.g. "3+ Years"
  };
  about: PortfolioContent["about"] & {
    subtitle: string; // e.g. "Engenheiro de Software Fullstack"
    envVars: EnvVar[]; // contact/env variables shown in ENV_CONFIG module
  };
  ui: DevUiStrings;
}

export interface TiContent extends PortfolioContent {
  ui: TiUiStrings;
}

export interface HubContent {
  name: string;
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
