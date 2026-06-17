/**
 * Centralized SEO Configuration
 * Update this file to manage all metadata, social media sharing, and search engine settings.
 */

export const seoConfig = {
  siteName: "Dionatha Goulart | Hub Profissional",
  defaultTitle: "Dionatha Goulart | Software Engineer & IT Operations",
  titleTemplate: "%s | Dionatha Goulart",
  description: "Hub profissional de Dionatha Goulart - Especialista em Engenharia de Software e Operações de TI. Explore meu portfólio de desenvolvimento e infraestrutura.",
  author: "Dionatha Goulart",
  url: "https://dionatha.com", // Substitua pelo seu domínio final
  github: "https://github.com/DionathaGoulart",
  linkedin: "https://linkedin.com/in/dionathagoulart",
  email: "dionatha.work@gmail.com",
  keywords: [
    "Dionatha Goulart",
    "Software Engineer",
    "Fullstack Developer",
    "IT Operations",
    "Suporte N2",
    "SaaS",
    "Next.js Portfolio",
    "Infrastructure Automation"
  ],
  og: {
    type: "website",
    locale: "pt_BR",
    image: "/og-image.png", // Certifique-se de que esta imagem exista em /public
    imageAlt: "Dionatha Goulart - Hub Profissional",
  },
  twitter: {
    handle: "@dionathagoulart",
    site: "@dionathagoulart",
    cardType: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Structured Data (JSON-LD) configuration
  schemas: {
    person: {
      name: "Dionatha Goulart",
      jobTitle: "Software Engineer",
      gender: "male",
      sameAs: [
        "https://github.com/DionathaGoulart",
        "https://linkedin.com/in/dionathagoulart"
      ]
    }
  }
};
