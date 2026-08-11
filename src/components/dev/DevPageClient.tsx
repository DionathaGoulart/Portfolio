"use client";
import Hero from "@/components/dev/Hero";
import About from "@/components/dev/About";
import Projects from "@/components/dev/Projects";
import Experience from "@/components/dev/Experience";
import Contact from "@/components/dev/Contact";
import { Header } from "@/components/dev/Header";
import TerminalMode from "@/components/dev/TerminalMode";
import { devContent } from "@/data/dev-config";
import { PersonaPage } from "../shared/PersonaPage";
import { Footer } from "../shared/Footer";
import { useDevMode } from "@/context/DevModeContext";
import { PageTransition } from "@/components/shared/PageTransition";
import { AnimatePresence, motion } from "framer-motion";

export default function DevPageClient() {
  const { mode, toggleMode } = useDevMode();

  const sections = devContent.sections;

  return (
    <div className="relative overflow-x-hidden">
      <div className="terminal-scanline opacity-10 pointer-events-none" />
      <Header />
      <PageTransition>
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
                footerContent={<Footer variant="terminal" name={devContent.name} />}
              >
                <div className="flex flex-col gap-16 md:gap-28">
                  {sections.hero.enabled && <Hero />}
                  {sections.about.enabled && <About />}
                  {sections.projects.enabled && <Projects />}
                  {sections.experience.enabled && <Experience />}
                  {sections.contact.enabled && <Contact />}
                </div>
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
      </PageTransition>
    </div>
  );
}
