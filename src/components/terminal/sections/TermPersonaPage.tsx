"use client";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import { Header } from "./Header";
import type { PersonaContent } from "@/types/content";
import { PersonaPage } from "@/components/shared/PersonaPage";
import { TermFooter } from "../ui/TermFooter";
import { TermShellView } from "../shell/TermShellView";
import { PageTransition } from "@/components/shared/PageTransition";

/** The portfolio page (/dev) in the terminal skin: graphic sections or the live shell. */
export default function TermPersonaPage({ content }: { content: PersonaContent }) {
  const { sections } = content;

  return (
    <div className="relative overflow-x-hidden">
      <div className="terminal-scanline opacity-10 pointer-events-none" />
      <Header content={content} />
      <PageTransition>
        <TermShellView content={content}>
          <PersonaPage footerContent={<TermFooter name={content.name} />}>
            <div className="flex flex-col gap-16 md:gap-28">
              {sections.hero.enabled && <Hero content={content} />}
              {sections.about.enabled && <About content={content} />}
              {sections.projects.enabled && <Projects content={content} />}
              {sections.experience.enabled && <Experience content={content} />}
              {sections.contact.enabled && <Contact content={content} />}
            </div>
          </PersonaPage>
        </TermShellView>
      </PageTransition>
    </div>
  );
}
