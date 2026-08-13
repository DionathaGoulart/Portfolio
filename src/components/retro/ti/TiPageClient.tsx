"use client";
import Hero from "@/components/retro/ti/Hero";
import About from "@/components/retro/ti/About";
import Projects from "@/components/retro/ti/Projects";
import Experience from "@/components/retro/ti/Experience";
import Contact from "@/components/retro/ti/Contact";
import { Header } from "@/components/retro/ti/Header";
import { tiContent } from "@/data/ti-config";
import { PersonaPage } from "@/components/shared/PersonaPage";
import { RetroStatusFooter } from "../ui/RetroStatusFooter";

export default function TiPageClient() {
  const sections = tiContent.sections;

  return (
    <div className="font-mono overflow-x-hidden">
      <Header />
      <PersonaPage footerContent={<RetroStatusFooter />}>
        {sections.hero.enabled && <Hero />}
        {sections.about.enabled && <About />}
        {sections.projects.enabled && <Projects />}
        {sections.experience.enabled && <Experience />}
        {sections.contact.enabled && <Contact />}
      </PersonaPage>
    </div>
  );
}
