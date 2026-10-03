/** schema.org Person for the portfolio and CV pages. */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dionatha Goulart",
    url: "https://dionatha.com.br",
    jobTitle: "Desenvolvedor Fullstack",
    description:
      "Fullstack developer specialized in SaaS, Monorepos, and immersive UX with React and Node.js.",
    knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "SaaS", "Monorepos", "Python"],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Estácio",
      },
      {
        "@type": "EducationalOrganization",
        name: "EBAC",
      },
    ],
    sameAs: ["https://www.linkedin.com/in/dionathagoulart", "https://github.com/DionathaGoulart"],
  };
}
