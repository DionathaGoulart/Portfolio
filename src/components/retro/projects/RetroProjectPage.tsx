"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { projectsContent } from "@/data/projects-config";
import type { PersonalProject } from "@/types/content";
import { PROJECT_LINK_ICONS, isExternal, paragraphs } from "@/components/shared/projectLinks";
import { RetroTopBar } from "@/components/retro/ui/RetroTopBar";
import { RetroCard } from "@/components/retro/ui/RetroCard";
import { RetroBadge } from "@/components/retro/ui/RetroBadge";
import { RetroStatusFooter } from "@/components/retro/ui/RetroStatusFooter";
import { RetroProjectCover } from "./RetroProjectCover";

/** /projetos/<slug> in the retro skin: cover, actions, description, highlights, stack. */
export function RetroProjectPage({ project }: { project: PersonalProject }) {
  const { ui, statusLabels } = projectsContent;

  return (
    <div className="selection:bg-accent selection:text-accent-content font-mono overflow-x-hidden">
      <RetroTopBar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pt-28 md:pt-36 pb-20">
        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all mb-8"
        >
          <ArrowLeft size={14} />
          {ui.backToList}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <RetroBadge variant="accent">{statusLabels[project.status]}</RetroBadge>
            {project.year && (
              <span className="text-xs font-bold opacity-50 tracking-widest">{project.year}</span>
            )}
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-[0.9]">
            {project.title}
          </h1>
          <p className="mt-6 text-lg md:text-2xl font-bold opacity-70 leading-snug max-w-3xl">
            {project.tagline}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            {project.links.length > 0 ? (
              project.links.map((link, i) => {
                const Icon = PROJECT_LINK_ICONS[link.kind];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(isExternal(link.href)
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={
                      i === 0
                        ? "btn btn-retro hover:bg-base-content gap-2"
                        : "btn btn-retro-outline hover:bg-accent hover:text-accent-content gap-2"
                    }
                  >
                    <Icon size={18} />
                    {link.label}
                  </a>
                );
              })
            ) : (
              <span className="retro-border border-base-content/20 text-base-content/40 px-4 py-3 font-black text-xs md:text-sm uppercase">
                {ui.emptyLinks}
              </span>
            )}
          </div>
        </motion.div>

        {/* The generated cover says nothing the title above does not — only a real
            screenshot earns this much room. */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-12"
          >
            <RetroCard className="overflow-hidden">
              <RetroProjectCover project={project} priority />
            </RetroCard>
          </motion.div>
        )}

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <section className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">
              {ui.aboutTitle}
            </h2>
            {paragraphs(project.description).map((p, i) => (
              <p key={i} className="text-base md:text-lg font-medium opacity-75 leading-relaxed">
                {p}
              </p>
            ))}
          </section>

          <aside className="lg:col-span-5 space-y-6">
            {project.highlights && project.highlights.length > 0 && (
              <RetroCard shadow="sm" className="p-6 md:p-8">
                <h2 className="font-black text-lg uppercase tracking-tighter italic mb-4 border-b-2 border-base-300 pb-3">
                  {ui.highlightsTitle}
                </h2>
                <ul className="space-y-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm font-medium leading-relaxed">
                      <span className="text-accent font-black shrink-0">›</span>
                      <span className="opacity-80">{h}</span>
                    </li>
                  ))}
                </ul>
              </RetroCard>
            )}
            {project.tags.length > 0 && (
              <RetroCard shadow="sm" className="p-6 md:p-8">
                <h2 className="font-black text-lg uppercase tracking-tighter italic mb-4 border-b-2 border-base-300 pb-3">
                  {ui.stackTitle}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <RetroBadge variant="chip" key={tag}>
                      {tag}
                    </RetroBadge>
                  ))}
                </div>
              </RetroCard>
            )}
          </aside>
        </div>

        <RetroStatusFooter className="mt-20" />
      </main>
    </div>
  );
}
