"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectsContent, sortedProjects } from "@/data/projects-config";
import type { ProjectKind } from "@/types/content";
import { TermTopBar } from "@/components/terminal/ui/TermTopBar";
import { TermWindow } from "@/components/terminal/ui/TermWindow";
import { TermBadge } from "@/components/terminal/ui/TermBadge";
import { TermFooter } from "@/components/terminal/ui/TermFooter";
import { TermShellView } from "@/components/terminal/shell/TermShellView";
import { hubContent } from "@/data/hub-config";
import { cn } from "@/lib/utils";

const KINDS: ProjectKind[] = ["pessoal", "profissional"];

/** /projetos in the terminal skin: the projects of one kind as an `ls -la` listing. */
export function TermProjectsPage() {
  const [kind, setKind] = useState<ProjectKind>("pessoal");
  const { ui } = projectsContent;
  const projects = sortedProjects().filter((p) => p.kind === kind);

  return (
    <div className="selection:bg-accent selection:text-accent-content font-mono overflow-x-hidden relative">
      <div className="terminal-scanline opacity-10 pointer-events-none" />
      <TermTopBar />
      <TermShellView>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-28 md:pt-32 pb-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs md:text-sm mb-2">
              <span className="text-accent/30 font-bold">{">"}</span>{" "}
              <span className="text-base-content/30">cd ~/projetos && ls -la --{kind}</span>
            </p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-accent terminal-glow">
              {projectsContent.title}
            </h1>
            <p className="mt-3 text-sm md:text-base text-base-content/70 max-w-2xl uppercase font-bold tracking-tight">
              {projectsContent.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label={projectsContent.title}
          >
            {KINDS.map((option) => (
              <button
                key={option}
                role="tab"
                aria-selected={kind === option}
                onClick={() => setKind(option)}
                className={cn(
                  "border px-3 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors cursor-pointer",
                  kind === option
                    ? "border-accent bg-accent text-accent-content"
                    : "border-accent/30 text-accent hover:bg-accent/10"
                )}
              >
                <span className="opacity-50 mr-1">{kind === option ? "$" : ">"}</span>
                {ui.filters[option]}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <TermWindow
              chrome="bar"
              title={`root@dg-os: ~/projetos/${kind} — ${projects.length} itens`}
              right={<span className="hidden sm:inline opacity-40">ls -la</span>}
            >
              {projects.length === 0 ? (
                <p className="px-4 md:px-8 py-8 text-xs uppercase tracking-widest opacity-50">
                  {ui.emptyFilter}
                </p>
              ) : (
                <nav aria-label={projectsContent.title} className="flex flex-col">
                  {projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projetos/${project.slug}`}
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-6 px-4 md:px-8 py-5 border-b border-accent/10 last:border-b-0 hover:bg-accent hover:text-accent-content transition-colors"
                    >
                      <span className="text-accent group-hover:text-accent-content font-black">
                        {"d"}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-lg md:text-2xl font-black uppercase tracking-tighter">
                          {project.slug}/
                        </span>
                        <span className="block text-xs md:text-sm opacity-60 group-hover:opacity-90">
                          {project.tagline}
                        </span>
                        {project.tags.length > 0 && (
                          <span className="hidden md:block text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-70 mt-1 truncate">
                            {project.tags.join(" · ")}
                          </span>
                        )}
                      </span>
                      <span className="flex items-center gap-3">
                        <TermBadge
                          variant="tag"
                          className="hidden sm:inline-flex group-hover:bg-accent-content/10 group-hover:text-accent-content group-hover:border-accent-content/30"
                        >
                          {projectsContent.statusLabels[project.status]}
                        </TermBadge>
                        <span className="text-xs md:text-sm font-black whitespace-nowrap">
                          {projectsContent.ui.openProject} {">>"}
                        </span>
                      </span>
                    </Link>
                  ))}
                </nav>
              )}
            </TermWindow>
          </motion.div>

          <TermFooter name={hubContent.name} />
        </main>
      </TermShellView>
    </div>
  );
}
