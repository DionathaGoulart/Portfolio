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

/** Core both skins read. The per-skin extras live in PersonaContent. */
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
 * UI strings are typed per skin rather than Record<string, string>, so a typo in a key is a
 * compile error and every key is provably rendered somewhere. Every persona carries both
 * sets, because every page renders in either skin.
 */
export interface TerminalUiStrings {
  aboutTitle: string;
  experienceTitle: string;
  projectsTitle: string;
  projectsHintNavigate: string;
  projectsHintOpen: string;
  projectsHintSource: string;
  aboutSubtitle: string;
  aboutModuleBio: string;
  aboutModuleEnv: string;
  aboutModuleSys: string;
  aboutSysHtop: string;
  projectsPersonalLink: string;
}

export interface RetroUiStrings {
  heroProjectsButton: string;
  heroContactButton: string;
  heroCvButton: string;
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
  projectsPersonalLink: string;
  experienceTitle: string;
  contactPrompt: string;
  contactFooterText: string;
  contactStatus: string;
}

export type Persona = "dev";

/**
 * The portfolio (/dev) in full. The terminal skin renders a fake shell, so it reads
 * the system metadata and env variables; the retro skin reads the badges and its own UI
 * strings. Both skins read the shared PortfolioContent core.
 */
export interface PersonaContent extends PortfolioContent {
  persona: Persona;
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
    yearsOfExperience: string; // e.g. "3+ Years"
    workplace: string; // e.g. "Alvorada/RS · Remoto"
  };
  about: PortfolioContent["about"] & {
    subtitle: string; // e.g. "Engenheiro de Software Fullstack"
    envVars: EnvVar[]; // contact/env variables shown in ENV_CONFIG module
  };
  ui: {
    terminal: TerminalUiStrings;
    retro: RetroUiStrings;
  };
}

/** Where a project's action button goes. Picks the button's label and icon. */
export type ProjectLinkKind = "demo" | "repo" | "download" | "store" | "site";

export interface ProjectLink {
  kind: ProjectLinkKind;
  /** Button text, e.g. "Testar demo", "Baixar para Windows". */
  label: string;
  href: string;
}

export type ProjectStatus = "wip" | "beta" | "stable";

/**
 * Who a project was built for. `/projetos` filters the list on it, and the portfolio
 * (/dev) shows only the professional ones.
 */
export type ProjectKind = "pessoal" | "profissional";

/**
 * Fields only the /dev showcase renders. They stay out of the project page, which reads
 * the shared fields above, and out of the personal projects, which have no client.
 */
export interface ProjectShowcase {
  /** Status chip of the /dev repo view, e.g. "PRODUCTION". Free text, unlike `status`. */
  status: string;
  /** e.g. "Lead Fullstack Developer". */
  role: string;
  /** Repository that is not a public link: "private" renders as a disabled button. */
  github?: string;
  /** Extension shown in the terminal file listing. Defaults to `.tsx`. */
  fileExtension?: string;
}

/** A project: one card on /projetos and one page at /projetos/<slug>. */
export interface PersonalProject {
  /** URL segment: /projetos/<slug>, plus the short link /<slug>. Lowercase, digits and dashes. */
  slug: string;
  title: string;
  /** One line: what it is. Shown on cards and under the title. */
  tagline: string;
  /** The project page body. Paragraphs split on blank lines. */
  description: string;
  tags: string[];
  status: ProjectStatus;
  kind: ProjectKind;
  /** When work started, e.g. "2025". */
  year: string;
  /** Last update (YYYY-MM-DD). Orders the list and picks the hub's "agora: construindo" line. */
  updated: string;
  /** Screenshot under /public, e.g. "/projects/linkspace.png". Without it a generated cover is drawn. */
  image?: string;
  highlights?: string[];
  links: ProjectLink[];
  /** Present on professional projects; drives their card in the /dev showcase. */
  showcase?: ProjectShowcase;
}

export interface ProjectsContent {
  title: string;
  subtitle: string;
  statusLabels: Record<ProjectStatus, string>;
  ui: {
    backToList: string;
    highlightsTitle: string;
    stackTitle: string;
    aboutTitle: string;
    emptyLinks: string;
    openProject: string;
    /** Label of the kind filter, one per ProjectKind. */
    filters: Record<ProjectKind, string>;
    /** Shown when the selected kind has no project yet. */
    emptyFilter: string;
  };
  projects: PersonalProject[];
}

export interface HubContent {
  name: string;
  typingText: string;
  description: string;
  profileImage: string;
  socials: (SocialLink & { type: string })[];
  /** Prefix of the "currently building" line; the project comes from projects-config. */
  nowLabel: string;
  /**
   * Chrome shared by every page: the top bar's back button and the terminal skin's
   * graphic/shell toggle, which both live outside any single page's content.
   */
  nav: {
    back: string;
    /** Tooltip / aria-label, e.g. "Voltar para o hub". */
    backTitle: string;
    /** Short labels of the shell toggle, for the header bar. */
    shell: string;
    graphic: string;
    /** Full sentences of the same toggle, for the mobile menu and the tooltips. */
    shellLong: string;
    graphicLong: string;
  };
  /** One card per entry, in order. `{count}` in `status` becomes the number of projects. */
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
