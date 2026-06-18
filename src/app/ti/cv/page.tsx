import fs from "fs";
import path from "path";
import CVViewer from "@/components/shared/CVViewer";
import { Metadata } from "next";
import { generatePersonSchema } from "@/lib/schema";
import { Header } from "@/components/ti/Header";

export const metadata: Metadata = {
  title: "CV | IT Operations Specialist - Dionatha Goulart",
  description:
    "Currículo de Dionatha Goulart focado em Infraestrutura, Redes e Automação de TI.",
};

export default function TiCVPage() {
  const filePath = path.join(process.cwd(), "src/data/cv-ti.md");
  const content = fs.readFileSync(filePath, "utf8");
  const schema = generatePersonSchema("TI");

  return (
    <main className="selection:bg-accent selection:text-white font-mono overflow-x-hidden">
      <Header cvContent={content} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20 pt-28 md:pt-32">
        <div className="max-w-4xl mx-auto">
          <CVViewer content={content} persona="TI" />
        </div>

        {/* Footer / System Status */}
        <footer className="pt-12 md:pt-16 border-t border-border-custom/10 text-[8px] md:text-[10px] opacity-30 flex flex-wrap justify-between gap-4 uppercase tracking-[0.2em] mt-20">
          <span>© 2026 DG_OS_V1.0</span>
          <span className="hidden sm:inline">ENC: AES-256-GCM</span>
          <span>LAT: -29.9961 / LONG: -51.0858</span>
        </footer>
      </div>
    </main>
  );
}
