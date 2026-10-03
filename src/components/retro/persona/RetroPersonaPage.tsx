"use client";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import { Header } from "./Header";
import type { PersonaContent } from "@/types/content";
import { PersonaPage } from "@/components/shared/PersonaPage";
import { RetroStatusFooter } from "../ui/RetroStatusFooter";

/** The portfolio page (/dev) in the retro skin. */
export default function RetroPersonaPage({ content }: { content: PersonaContent }) {
  const { sections } = content;

  return (
    <div className="font-mono overflow-x-hidden">
      <Header content={content} />
      <PersonaPage footerContent={<RetroStatusFooter />}>
        {sections.hero.enabled && <Hero content={content} />}
        {sections.about.enabled && <About content={content} />}
        {sections.projects.enabled && <Projects content={content} />}
        {sections.experience.enabled && <Experience content={content} />}
        {sections.contact.enabled && <Contact content={content} />}
      </PersonaPage>
    </div>
  );
}
