import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";
import TiCVViewer from "@/components/retro/ti/TiCVViewer";
import { Metadata } from "next";
import { generatePersonSchema } from "@/lib/schema";
import { Header } from "@/components/retro/ti/Header";
import { RetroStatusFooter } from "@/components/retro/ui/RetroStatusFooter";

export const metadata: Metadata = {
  title: "CV | IT Operations Specialist",
  description: "Currículo de Dionatha Goulart focado em Infraestrutura, Redes e Automação de TI.",
  alternates: { canonical: "/ti/cv" },
  openGraph: {
    title: "CV | IT Operations Specialist | Dionatha Goulart",
    description: "Currículo de Dionatha Goulart focado em Infraestrutura, Redes e Automação de TI.",
    url: "/ti/cv",
  },
  twitter: {
    title: "CV | IT Operations Specialist | Dionatha Goulart",
    description: "Currículo de Dionatha Goulart focado em Infraestrutura, Redes e Automação de TI.",
  },
};

export default function TiCVPage() {
  const filePath = path.join(process.cwd(), "src/data/cv-ti.md");
  let content: string;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    notFound();
  }
  const schema = generatePersonSchema("TI");

  return (
    <main className="selection:bg-accent selection:text-accent-content font-mono overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header cvContent={content} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20 pt-28 md:pt-32">
        <div className="max-w-4xl mx-auto">
          <TiCVViewer content={content} />
        </div>

        <RetroStatusFooter className="mt-20" />
      </div>
    </main>
  );
}
