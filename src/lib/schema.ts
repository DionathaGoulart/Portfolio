export function generatePersonSchema(persona: 'DEV' | 'TI') {
  const common = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dionatha Goulart",
    "url": "https://dionatha.com.br",
    "jobTitle": persona === 'DEV' ? "Software Engineer" : "IT Operations Specialist",
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Estácio"
      },
      {
        "@type": "EducationalOrganization",
        "name": "EBAC"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/in/dionathagoulart",
      "https://github.com/DionathaGoulart"
    ]
  };

  if (persona === 'DEV') {
    return {
      ...common,
      "description": "Software Engineer specialized in SaaS, Monorepos, and immersive UX with React and Node.js.",
      "knowsAbout": ["React", "Next.js", "TypeScript", "Node.js", "SaaS", "Monorepos", "Python"]
    };
  }

  return {
    ...common,
    "description": "IT Operations Specialist specialized in infrastructure automation, networking, and L2 technical support.",
    "knowsAbout": ["Infrastructure", "Networking", "Docker", "Automation", "Python", "L2 Support", "Linux"]
  };
}
