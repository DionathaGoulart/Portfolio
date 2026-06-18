"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/dev/Hero";
import About from "@/components/dev/About";
import Projects from "@/components/dev/Projects";
import Experience from "@/components/dev/Experience";
import Contact from "@/components/dev/Contact";
import { Header } from "@/components/dev/Header";
import { devContent } from "@/data/dev-config";
import { PersonaPage } from "../shared/PersonaPage";

gsap.registerPlugin(ScrollTrigger);

export default function DevPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" },
      );
    }
  }, []);

  const sections = devContent.sections;

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      <div className="terminal-scanline opacity-10 pointer-events-none" />
      <Header />
      <PersonaPage content={devContent}>
        {sections.hero.enabled && <Hero />}
        {sections.about.enabled && <About />}
        {sections.projects.enabled && <Projects />}
        {sections.experience.enabled && <Experience />}
        {sections.contact.enabled && <Contact />}
      </PersonaPage>
    </div>
  );
}
