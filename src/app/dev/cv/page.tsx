import fs from "fs";
import path from "path";
import CVViewer from "@/components/shared/CVViewer";
import { Metadata } from "next";
import { Header } from "@/components/dev/Header";
import { generatePersonSchema } from "@/lib/schema";
import { PageTransition } from "@/components/shared/PageTransition";

export const metadata: Metadata = {
  title: "CV | Software Engineer - Dionatha Goulart",
  description:
    "Currículo de Dionatha Goulart focado em Engenharia de Software e Desenvolvimento Fullstack.",
};

export default function DevCVPage() {
  const filePath = path.join(process.cwd(), "src/data/cv-dev.md");
  const content = fs.readFileSync(filePath, "utf8");
  const schema = generatePersonSchema("DEV");

  return (
    <div className="selection:bg-accent selection:text-white">
      <Header cvContent={content} />
      <PageTransition className="max-w-7xl mx-auto px-6 md:px-10 pb-20 pt-28 md:pt-32">
        <CVViewer content={content} persona="DEV" />

        <footer className="py-12 border-t-2 border-border-custom font-black uppercase tracking-widest opacity-40 text-sm mt-20">
          Dionatha Goulart // 2026
        </footer>
      </PageTransition>
    </div>
  );
}
