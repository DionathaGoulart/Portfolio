import type { PersonaContent } from "@/types/content";
import RetroCVViewer from "./RetroCVViewer";
import { Header } from "./Header";
import { RetroStatusFooter } from "../ui/RetroStatusFooter";

/** The CV (/dev/cv) in the retro skin. */
export function RetroCVPage({ content, cv }: { content: PersonaContent; cv: string }) {
  return (
    <main className="selection:bg-accent selection:text-accent-content font-mono overflow-x-hidden">
      <Header content={content} cvContent={cv} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20 pt-28 md:pt-32">
        <div className="max-w-4xl mx-auto">
          <RetroCVViewer content={cv} />
        </div>

        <RetroStatusFooter className="mt-20" />
      </div>
    </main>
  );
}
