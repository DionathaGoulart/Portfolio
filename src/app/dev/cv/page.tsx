import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";
import DevCVViewer from "@/components/dev/DevCVViewer";
import { Metadata } from "next";
import { Header } from "@/components/dev/Header";
import { generatePersonSchema } from "@/lib/schema";
import { PageTransition } from "@/components/shared/PageTransition";
import { Footer } from "@/components/shared/Footer";
import { devContent } from "@/data/dev-config";

export const metadata: Metadata = {
  title: "CV | Software Engineer",
  description:
    "Currículo de Dionatha Goulart focado em Engenharia de Software e Desenvolvimento Fullstack.",
  alternates: { canonical: "/dev/cv" },
  openGraph: {
    title: "CV | Software Engineer | Dionatha Goulart",
    description:
      "Currículo de Dionatha Goulart focado em Engenharia de Software e Desenvolvimento Fullstack.",
    url: "/dev/cv",
  },
  twitter: {
    title: "CV | Software Engineer | Dionatha Goulart",
    description:
      "Currículo de Dionatha Goulart focado em Engenharia de Software e Desenvolvimento Fullstack.",
  },
};

export default function DevCVPage() {
  const filePath = path.join(process.cwd(), "src/data/cv-dev.md");
  let content: string;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    notFound();
  }
  const schema = generatePersonSchema("DEV");

  return (
    <div className="selection:bg-accent selection:text-accent-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header cvContent={content} />
      <PageTransition className="max-w-7xl mx-auto px-6 md:px-10 pb-20 pt-28 md:pt-32">
        <DevCVViewer content={content} />

        <Footer variant="retro" name={devContent.name} className="mt-20" />
      </PageTransition>
    </div>
  );
}
