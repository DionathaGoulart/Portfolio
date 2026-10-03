import type { PersonaContent } from "@/types/content";
import TermCVViewer from "./TermCVViewer";
import { Header } from "./Header";
import { PageTransition } from "@/components/shared/PageTransition";
import { CreditFooter } from "@/components/shared/CreditFooter";
import { TermShellView } from "../shell/TermShellView";

/** The CV (/dev/cv) in the terminal skin. */
export function TermCVPage({ content, cv }: { content: PersonaContent; cv: string }) {
  return (
    <div className="selection:bg-accent selection:text-accent-content">
      <Header content={content} cvContent={cv} />
      <TermShellView content={content}>
        <PageTransition className="max-w-7xl mx-auto px-6 md:px-10 pb-20 pt-28 md:pt-32">
          <TermCVViewer content={cv} />

          <CreditFooter name={content.name} className="mt-20" />
        </PageTransition>
      </TermShellView>
    </div>
  );
}
