"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { PersonaContent } from "@/types/content";
import { TermSectionTitle } from "../ui/TermSectionTitle";
import { projectFilename } from "@/lib/slug";
import { LogoWatermark } from "@/components/shared/LogoWatermark";
import { TermWindow } from "@/components/terminal/ui/TermWindow";
import { TermBadge } from "@/components/terminal/ui/TermBadge";

// Decorative shell strings — scenography, not content.
const TERMINAL_PATH = "root@dg-os: ~/workspace/projects-repository";
const FILE_PERMISSIONS = "-rwxr-xr-x";

export default function Projects({ content }: { content: PersonaContent }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const projects = content.projects;
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
      <TermSectionTitle number="03" title={content.ui.terminal.projectsTitle} />

      {/* Main Terminal Window */}
      <TermWindow
        chrome="bar"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative h-auto"
        barClassName="font-black"
        title={TERMINAL_PATH}
        titleClassName="flex-1 text-center font-normal"
        right={
          <TermBadge variant="pill" className="hidden sm:inline-flex shrink-0">
            {isPaused ? "● PAUSED" : "● AUTO_PLAY"}
          </TermBadge>
        }
      >
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

              {/* The list picks which project the right pane shows — that is a tab set. */}
              <div className="flex flex-col gap-1" role="tablist" aria-label="Projetos">
                {projects.map((project, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={project.title}
                      role="tab"
                      id={`project-tab-${idx}`}
                      aria-selected={isActive}
                      aria-controls="project-panel"
                      tabIndex={isActive ? 0 : -1}
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
                          {FILE_PERMISSIONS}
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
              <p className="hidden lg:block">
                ● [↑ / ↓] {content.ui.terminal.projectsHintNavigate}
              </p>
              <p>● [ENTER] {content.ui.terminal.projectsHintOpen}</p>
              <p>● [G] {content.ui.terminal.projectsHintSource}</p>
            </div>
          </div>

          {/* Right Column: Interactive Project View Panel (README.md) */}
          <div
            ref={viewerRef}
            id="project-panel"
            role="tabpanel"
            aria-labelledby={`project-tab-${activeIndex}`}
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
                        {activeProject.role && (
                          <p className="text-xs text-base-content/60 italic font-medium">
                            Função: {activeProject.role}
                          </p>
                        )}
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
                            <TermBadge variant="tag" key={tag}>
                              {tag}
                            </TermBadge>
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
                      className="btn btn-terminal font-mono flex-1 gap-2 select-none hover:bg-accent hover:text-accent-content"
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
                      className="btn btn-terminal font-mono flex-1 gap-2 select-none hover:bg-accent hover:text-accent-content"
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
      </TermWindow>

      <Link
        href="/projetos"
        className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent border border-accent/20 px-3 py-2 hover:bg-accent hover:text-accent-content transition-colors"
      >
        <span className="opacity-50">$</span> {content.ui.terminal.projectsPersonalLink} →
      </Link>
    </section>
  );
}
