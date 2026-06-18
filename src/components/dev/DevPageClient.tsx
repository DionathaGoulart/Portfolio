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

gsap.registerPlugin(ScrollTrigger);

export default function DevPageClient() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" },
    );
  }, []);

  const sections = devContent.sections;

  return (
    <div
      ref={containerRef}
      className="selection:bg-accent selection:text-white"
    >
      <Header />
      <main className="max-w-7xl mx-auto px-6 md:px-10 pb-20 pt-28 md:pt-32">
        {sections.hero.enabled && <Hero />}
        {sections.about.enabled && <About />}
        {sections.projects.enabled && <Projects />}
        {sections.experience.enabled && <Experience />}
        {sections.contact.enabled && <Contact />}

        <footer className="py-12 border-t-2 border-border-custom font-black uppercase tracking-widest opacity-40 text-sm">
          {devContent.name} // 2026
        </footer>
      </main>
    </div>
  );
}
