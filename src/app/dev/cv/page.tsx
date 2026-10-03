import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";
import { Metadata } from "next";
import { generatePersonSchema } from "@/lib/schema";
import { devContent } from "@/data/dev-config";
import { SkinView } from "@/components/shared/SkinProvider";
import { RetroCVPage } from "@/components/retro/persona/RetroCVPage";
import { TermCVPage } from "@/components/terminal/sections/TermCVPage";

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
  const schema = generatePersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SkinView
        retro={<RetroCVPage content={devContent} cv={content} />}
        terminal={<TermCVPage content={devContent} cv={content} />}
      />
    </>
  );
}
