"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PersonaContent } from "@/types/content";
import { RetroSectionTitle } from "../ui/RetroSectionTitle";
import { WindowDots } from "@/components/retro/ui/WindowDots";
import { RetroCard } from "../ui/RetroCard";
import { RetroBadge } from "../ui/RetroBadge";

export default function Projects({ content }: { content: PersonaContent }) {
  return (
    <section
      className="py-20 md:py-32 bg-accent/[0.03] -mx-4 sm:-mx-6 md:-mx-10 px-4 sm:px-6 md:px-10"
      id="projects"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
        <div className="max-w-2xl text-left">
          <RetroSectionTitle title={content.ui.retro.projectsTitle} className="mb-4 md:mb-8" />
          <p className="text-lg md:text-xl font-bold opacity-60">
            {content.ui.retro.projectsSubtitle}
          </p>
        </div>
        <RetroCard shadow="sm" className="hidden md:block p-6 font-black text-2xl animate-bounce">
          {content.ui.retro.projectsScrollHint}
        </RetroCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left">
        {content.projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <RetroCard
              shadow="sm"
              className="overflow-hidden group-hover:retro-shadow transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 h-full"
            >
              <div className="border-b-2 border-base-300 bg-base-100 p-3 md:p-4 flex justify-between items-center shrink-0">
                <WindowDots size="responsive" className="md:gap-2" />
                <span className="font-mono text-[10px] md:text-xs font-bold opacity-40 uppercase">
                  PROJECT_FILE_{i + 1}.EXE
                </span>
              </div>

              <div className="p-6 md:p-12 flex flex-col flex-1 gap-6 md:gap-8">
                <div className="space-y-4 flex-1">
                  <h3 className="text-3xl md:text-4xl font-black group-hover:text-accent transition-colors tracking-tighter italic uppercase">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-xl font-medium leading-relaxed opacity-70">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <RetroBadge variant="tag" key={tag}>
                      {tag}
                    </RetroBadge>
                  ))}
                </div>

                <div className="pt-2 md:pt-4 flex flex-col sm:flex-row gap-3 md:gap-4">
                  {project.link !== "#" ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-retro-invert flex-1 hover:bg-accent hover:text-accent-content"
                    >
                      {content.ui.retro.projectsDeployButton}
                    </a>
                  ) : (
                    <span className="flex-1 text-center retro-border border-base-content/20 text-base-content/40 px-4 py-3 font-black text-xs md:text-sm uppercase cursor-not-allowed">
                      {content.ui.retro.projectsOfflineButton}
                    </span>
                  )}

                  {project.github === "private" ? (
                    <span className="flex-1 text-center retro-border border-base-content/20 text-base-content/40 px-4 py-3 font-black text-xs md:text-sm uppercase cursor-not-allowed">
                      {content.ui.retro.projectsPrivateButton}
                    </span>
                  ) : project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-retro-invert flex-1 bg-transparent text-base-content hover:bg-base-content hover:text-base-100"
                    >
                      {content.ui.retro.projectsRepoButton}
                    </a>
                  ) : null}
                </div>
              </div>
            </RetroCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 md:mt-16 flex justify-center">
        <Link
          href="/projetos"
          className="btn btn-retro-outline hover:bg-accent hover:text-accent-content"
        >
          {content.ui.retro.projectsPersonalLink} →
        </Link>
      </div>
    </section>
  );
}
