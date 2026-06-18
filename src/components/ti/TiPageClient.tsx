"use client";
import Hero from "@/components/ti/Hero";
import About from "@/components/ti/About";
import Projects from "@/components/ti/Projects";
import Experience from "@/components/ti/Experience";
import Contact from "@/components/ti/Contact";
import { Header } from "@/components/ti/Header";
import { tiContent } from "@/data/ti-config";
import { PersonaPage } from "../shared/PersonaPage";

export default function TiPageClient() {
  const sections = tiContent.sections;

  return (
    <div className="font-mono overflow-x-hidden">
      <Header />
      <PersonaPage
        content={tiContent}
        footerContent={
          <footer className="pt-12 md:pt-16 border-t border-border-custom/10 text-[8px] md:text-[10px] opacity-30 flex flex-wrap justify-between gap-4 uppercase tracking-[0.2em]">
            <span>© 2026 DG_OS_V1.0</span>
            <span className="hidden sm:inline">ENC: AES-256-GCM</span>
            <span>LAT: -29.9961 / LONG: -51.0858</span>
          </footer>
        }
      >
        {sections.hero.enabled && <Hero />}
        {sections.about.enabled && <About />}
        {sections.projects.enabled && <Projects />}
        {sections.experience.enabled && <Experience />}
        {sections.contact.enabled && <Contact />}
      </PersonaPage>
    </div>
  );
}
