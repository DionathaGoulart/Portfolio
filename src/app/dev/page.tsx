"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/dev/Hero";
import About from "@/components/dev/About";
import Projects from "@/components/dev/Projects";
import Experience from "@/components/dev/Experience";
import Contact from "@/components/dev/Contact";
import { Header } from "@/components/shared/Header";

gsap.registerPlugin(ScrollTrigger);

export default function DevPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP Smooth Reveal for the whole page
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="bg-background text-foreground selection:bg-accent selection:text-white pt-10">
      <Header />
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="contact">
        <Contact />
      </div>

      <footer className="py-12 text-center text-foreground/40 text-sm border-t-2 border-border-custom font-black uppercase tracking-widest">
        Dionatha Goulart // 2026
      </footer>
    </div>
  );
}
