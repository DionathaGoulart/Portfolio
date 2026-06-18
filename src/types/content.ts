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
  hero: {
    title: string;
    description: string;
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
