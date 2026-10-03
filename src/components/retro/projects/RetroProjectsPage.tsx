"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectsContent, sortedProjects } from "@/data/projects-config";
import type { ProjectKind } from "@/types/content";
import { RetroTopBar } from "@/components/retro/ui/RetroTopBar";
import { RetroCard } from "@/components/retro/ui/RetroCard";
import { RetroBadge } from "@/components/retro/ui/RetroBadge";
import { RetroStatusFooter } from "@/components/retro/ui/RetroStatusFooter";
import { RetroProjectCover } from "./RetroProjectCover";
import { cn } from "@/lib/utils";

const KINDS: ProjectKind[] = ["pessoal", "profissional"];

/** /projetos in the retro skin: the projects of one kind as cards. */
export function RetroProjectsPage() {
  const [kind, setKind] = useState<ProjectKind>("pessoal");
  const { ui } = projectsContent;
  const projects = sortedProjects().filter((p) => p.kind === kind);

  return (
    <div className="selection:bg-accent selection:text-accent-content font-mono overflow-x-hidden">
      <RetroTopBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-28 md:pt-36 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-10 max-w-3xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter italic uppercase underline decoration-accent decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">
            {projectsContent.title}
          </h1>
          <p className="mt-6 md:mt-8 text-lg md:text-xl font-bold opacity-60">
            {projectsContent.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-12 md:mb-16 retro-border bg-base-200 p-1 retro-shadow-sm inline-flex"
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
                "px-4 md:px-6 py-2 md:py-2.5 font-black text-xs md:text-sm uppercase tracking-tighter transition-all cursor-pointer hover:bg-accent hover:text-accent-content",
                kind === option && "bg-accent text-accent-content"
              )}
            >
              {ui.filters[option]}
            </button>
          ))}
        </motion.div>

        {projects.length === 0 ? (
          <p className="text-lg font-bold opacity-50">{ui.emptyFilter}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link href={`/projetos/${project.slug}`} className="group block h-full">
                  <RetroCard
                    shadow="sm"
                    className="h-full overflow-hidden group-hover:retro-shadow group-hover:-translate-y-1 transition-all"
                  >
                    <RetroProjectCover
                      project={project}
                      priority={i < 3}
                      className="border-b-2 border-base-300"
                    />
                    <div className="p-5 md:p-6 flex flex-col gap-4 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                          {projectsContent.statusLabels[project.status]}
                        </span>
                        {project.year && (
                          <span className="text-[10px] font-bold opacity-40">{project.year}</span>
                        )}
                      </div>
                      <div className="space-y-2 flex-1">
                        <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter group-hover:text-accent transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-sm md:text-base font-medium opacity-70 leading-relaxed">
                          {project.tagline}
                        </p>
                      </div>
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag) => (
                            <RetroBadge variant="tag" key={tag}>
                              {tag}
                            </RetroBadge>
                          ))}
                        </div>
                      )}
                    </div>
                  </RetroCard>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <RetroStatusFooter className="mt-20" />
      </main>
    </div>
  );
}
