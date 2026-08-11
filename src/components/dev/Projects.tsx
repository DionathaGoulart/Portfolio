"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { devContent } from "@/data/dev-config";
import { SectionTitle } from "../shared/SectionTitle";
import { projectFilename } from "@/lib/slug";
import { LogoWatermark } from "@/components/ui/LogoWatermark";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const projects = devContent.projects;
  const activeProject = projects[activeIndex];

  // Auto-cycle through projects if not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, projects.length]);

  // Mirrors activeIndex so the key handler can read it without re-subscribing every change.
  const activeIndexRef = useRef(0);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Keyboard navigation.
  // Gated on hover/focus rather than mere viewport visibility: the old check swallowed
  // ArrowUp/ArrowDown for the whole page whenever this section was on screen, so the
  // visitor could not scroll with the keyboard.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const engaged = section.matches(":hover") || section.contains(document.activeElement);
      if (!engaged) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % projects.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
      } else if (e.key === "Enter") {
        const link = projects[activeIndexRef.current]?.link;
        if (link && link !== "#") {
          e.preventDefault();
          window.open(link, "_blank", "noopener,noreferrer");
        }
      } else if (e.key.toLowerCase() === "g") {
        const github = projects[activeIndexRef.current]?.github;
        if (github && github !== "private") {
          e.preventDefault();
          window.open(github, "_blank", "noopener,noreferrer");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects]);

  if (!activeProject) return null;

  const selectProject = (idx: number) => {
    setActiveIndex(idx);
    // Stop the carousel: on touch there is no mouseleave, so an explicit pick used to be
    // overwritten by the 8s auto-advance.
    setIsPaused(true);
    // Smooth scroll to details viewer on smaller screens
    if (window.innerWidth < 1024 && viewerRef.current) {
      viewerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full" id="projects">
      <SectionTitle number="03" title="projects_repo" variant="terminal" />

      {/* Main Terminal Window */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="retro-border bg-base-200 retro-shadow overflow-hidden w-full flex flex-col relative h-auto"
      >
        {/* Terminal Header Bar */}
        <div className="bg-accent/5 border-b border-accent/10 px-4 py-2 flex justify-between items-center text-[10px] font-mono tracking-wider text-accent/50 font-black min-w-0">
          <div className="flex gap-1.5 shrink-0 opacity-50">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/20" />
          </div>
          <span className="truncate mx-2 flex-1 text-center font-normal">
            root@dg-os: ~/workspace/projects-repository
          </span>
          <span className="hidden sm:inline text-[9px] bg-accent/10 px-1 py-0.5 rounded text-accent/50 shrink-0 font-normal">
            {isPaused ? "● PAUSED" : "● AUTO_PLAY"}
          </span>
        </div>

        {/* Decorative Logo Background Watermark */}
        <LogoWatermark className="mt-8" />

        {/* Terminal Body Split Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 relative z-10">
          {/* Left Column: Interactive File Manager List */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-accent/20 bg-accent/[0.01] flex flex-col justify-between">
            <div className="p-4 space-y-1">
              <div className="font-mono text-[9px] uppercase tracking-widest opacity-40 mb-3 px-2 flex justify-between">
                <span>Directory listing (ls -la)</span>
                <span className="hidden sm:inline">Size</span>
              </div>

              <div className="flex flex-col gap-1">
                {projects.map((project, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={project.title}
                      onClick={() => selectProject(idx)}
                      className={`w-full text-left font-mono text-xs py-3 px-3 flex items-center justify-between transition-colors border-b border-accent/5 last:border-b-0 cursor-pointer group ${
                        isActive
                          ? "bg-accent text-accent-content font-black border-l-4 border-white"
                          : "hover:bg-accent/10 text-base-content/85"
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden mr-2">
                        <span
                          className={`w-3 flex justify-center shrink-0 ${isActive ? "text-accent-content" : "text-accent"}`}
                        >
                          {isActive ? "►" : " "}
                        </span>

                        {/* Mock permissions - Hidden on narrow screens */}
                        <span className="hidden sm:inline text-[10px] opacity-40 shrink-0 font-light tracking-tight select-none mr-1 font-mono">
                          -rwxr-xr-x
                        </span>

                        <span
                          className={`truncate font-bold ${isActive ? "text-accent-content" : "group-hover:text-accent"}`}
                        >
                          {projectFilename(project)}
                        </span>
                      </div>

                      {/* Info side element */}
                      <div className="flex items-center gap-2 select-none shrink-0 font-mono text-[9px]">
                        <span className="hidden sm:inline opacity-30">
                          {idx === 0 ? "4.2K" : idx === 1 ? "3.8K" : idx === 2 ? "5.1K" : "6.4K"}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 font-bold uppercase rounded-sm border ${
                            isActive
                              ? "border-white/50 text-accent-content bg-white/10"
                              : "border-accent/20 text-accent bg-accent/5"
                          }`}
                        >
                          {project.status || "STABLE"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terminal Shortcuts Legend Footer */}
            <div className="p-4 border-t border-accent/15 font-mono text-[9px] text-accent/50 leading-relaxed space-y-0.5 select-none bg-accent/[0.005]">
              <p className="hidden lg:block">● [↑ / ↓] NAVEGAR ENTRE PROJETOS</p>
              <p>● [ENTER] ABRIR VERSÃO PRODUÇÃO (LIVE)</p>
              <p>● [G] VISITAR CÓDIGO FONTE (GITHUB)</p>
            </div>
          </div>

          {/* Right Column: Interactive Project View Panel (README.md) */}
          <div
            ref={viewerRef}
            className="lg:col-span-7 bg-transparent relative flex flex-col min-h-[420px] lg:h-[650px] overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="flex-1 flex flex-col h-full w-full max-h-full"
              >
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 pb-4">
                  {/* Simulated Viewer Command */}
                  <div className="space-y-6 font-mono">
                    {/* README Body */}
                    <div className="space-y-5">
                      {/* Retro Banner Header */}
                      <div className="border-l-4 border-accent pl-3 space-y-1">
                        <span className="text-[10px] tracking-wider text-accent opacity-60 uppercase font-black">
                          PROJECTS_REPOSITORY // {activeProject.status || "STABLE"}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-accent uppercase tracking-tight">
                          {activeProject.title}
                        </h3>
                        <p className="text-xs text-base-content/60 italic font-medium">
                          Função: {activeProject.role || "Fullstack Developer"}
                        </p>
                      </div>

                      {/* Brief description */}
                      <p className="text-sm md:text-base leading-relaxed text-base-content font-semibold">
                        {activeProject.description}
                      </p>

                      {/* System Separator */}
                      <div className="w-full border-t border-dashed border-accent/20 select-none" />

                      {/* Rich Details */}
                      {activeProject.details && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-accent uppercase tracking-wider">
                            # RESUMO SISTÊMICO
                          </h4>
                          <p className="text-xs md:text-sm text-base-content/80 leading-relaxed">
                            {activeProject.details}
                          </p>
                        </div>
                      )}

                      {/* Features checklist */}
                      {activeProject.features && activeProject.features.length > 0 && (
                        <div className="space-y-2.5">
                          <h4 className="text-xs font-bold text-accent uppercase tracking-wider">
                            # CARACTERÍSTICAS TÉCNICAS (FEATURES)
                          </h4>
                          <ul className="space-y-1.5 text-xs text-base-content/85">
                            {activeProject.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2 leading-relaxed">
                                <span className="text-accent font-black shrink-0">[+]</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Tags */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-accent uppercase tracking-wider">
                          # INTEGRATED_STACKS
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {activeProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-bold border border-accent/20 px-2 py-0.5 text-accent bg-accent/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Terminal Action Bar buttons - FIXED AT BOTTOM */}
                <div className="p-6 md:p-8 pt-4 border-t border-accent/10 bg-transparent shrink-0 flex flex-col sm:flex-row gap-3 z-20">
                  {activeProject.link && activeProject.link !== "#" ? (
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-border border-accent/30 bg-accent/5 hover:bg-accent hover:text-accent-content px-4 py-2.5 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer select-none text-center flex-1"
                    >
                      <span>🌐</span>
                      <span>LAUNCH_LIVE_DEPL.EXE</span>
                    </a>
                  ) : (
                    <span className="retro-border border-accent/10 bg-accent/5 opacity-40 px-4 py-2.5 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 select-none text-center flex-1">
                      <span>🌐</span>
                      <span>NO_LIVE_DEPLOY</span>
                    </span>
                  )}

                  {activeProject.github && activeProject.github !== "private" ? (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-border border-accent/30 bg-accent/5 hover:bg-accent hover:text-accent-content px-4 py-2.5 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer select-none text-center flex-1"
                    >
                      <span>📂</span>
                      <span>OPEN_SOURCE_REPO.SH</span>
                    </a>
                  ) : (
                    <span className="retro-border border-red-500/15 bg-red-500/5 text-red-500/60 px-4 py-2.5 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 select-none text-center flex-1">
                      <span>🔒</span>
                      <span>SOURCE_RESTRICTED [PRIVATE]</span>
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
