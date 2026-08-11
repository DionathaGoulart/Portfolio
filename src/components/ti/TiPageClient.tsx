"use client";
import Hero from "@/components/ti/Hero";
import About from "@/components/ti/About";
import Projects from "@/components/ti/Projects";
import Experience from "@/components/ti/Experience";
import Contact from "@/components/ti/Contact";
import { Header } from "@/components/ti/Header";
import { tiContent } from "@/data/ti-config";
import { PersonaPage } from "../shared/PersonaPage";
import { Footer } from "../shared/Footer";

export default function TiPageClient() {
  const sections = tiContent.sections;

  return (
    <div className="font-mono overflow-x-hidden">
      <Header />
      <PersonaPage content={tiContent} footerContent={<Footer variant="ti" />}>
        {sections.hero.enabled && <Hero />}
        {sections.about.enabled && <About />}
        {sections.projects.enabled && <Projects />}
        {sections.experience.enabled && <Experience />}
        {sections.contact.enabled && <Contact />}
      </PersonaPage>
    </div>
  );
}
