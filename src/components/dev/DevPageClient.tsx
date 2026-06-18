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
import TerminalMode from "@/components/dev/TerminalMode";
import { devContent } from "@/data/dev-config";
import { PersonaPage } from "../shared/PersonaPage";
import { useDevMode } from "@/context/DevModeContext";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function DevContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mode, toggleMode } = useDevMode();

  useEffect(() => {
    if (containerRef.current && mode === "graphic") {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" },
      );
    }
  }, [mode]);

  const sections = devContent.sections;

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      <div className="terminal-scanline opacity-10 pointer-events-none" />
      <Header />
      <AnimatePresence mode="wait">
        {mode === "graphic" ? (
          <motion.div
            key="graphic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PersonaPage 
              content={devContent}
              footerContent={
                <footer className="mt-20 py-8 border-t-2 border-accent/20 font-mono flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-accent/60 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent/40 rounded-full animate-pulse" />
                    SYS_BUILD // {new Date().getFullYear()}
                  </div>
                  <div className="text-center md:text-right">
                    <span className="opacity-50">AUTHOR_ID: </span>
                    <span className="font-black text-accent">{devContent.name.replace(/_/g, '.')}</span>
                  </div>
                </footer>
              }
            >
              {sections.hero.enabled && <Hero />}
              {sections.about.enabled && <About />}
              {sections.projects.enabled && <Projects />}
              {sections.experience.enabled && <Experience />}
              {sections.contact.enabled && <Contact />}
            </PersonaPage>
          </motion.div>
        ) : (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TerminalMode onSwitchToGui={toggleMode} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DevPageClient() {
  return <DevContent />;
}
