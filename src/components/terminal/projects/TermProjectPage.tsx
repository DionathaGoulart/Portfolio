"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectsContent } from "@/data/projects-config";
import { hubContent } from "@/data/hub-config";
import type { PersonalProject } from "@/types/content";
import { PROJECT_LINK_ICONS, isExternal, paragraphs } from "@/components/shared/projectLinks";
import { LogoWatermark } from "@/components/shared/LogoWatermark";
import { TermTopBar } from "@/components/terminal/ui/TermTopBar";
import { TermWindow } from "@/components/terminal/ui/TermWindow";
import { TermBadge } from "@/components/terminal/ui/TermBadge";
import { TermFooter } from "@/components/terminal/ui/TermFooter";
import { TermShellView } from "@/components/terminal/shell/TermShellView";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs md:text-sm font-black text-accent uppercase tracking-wider">
      # {children}
    </h2>
  );
}

/** /projetos/<slug> in the terminal skin: the project as a README window. */
export function TermProjectPage({ project }: { project: PersonalProject }) {
  const { ui, statusLabels } = projectsContent;

  return (
    <div className="selection:bg-accent selection:text-accent-content font-mono overflow-x-hidden relative">
      <div className="terminal-scanline opacity-10 pointer-events-none" />
      <TermTopBar />
      <TermShellView>
        <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pt-28 md:pt-32 pb-20 relative z-10">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent/60 hover:text-accent mb-6"
          >
            <span>cd ..</span>
            <span className="opacity-50">
              {"// "}
              {ui.backToList}
            </span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <TermWindow
              chrome="heavy"
              title={`~/projetos/${project.slug}/README.md`}
              titleClassName="sm:tracking-[0.3em] text-accent/40 truncate"
            >
              <div className="p-5 sm:p-8 md:p-12 space-y-8 relative">
                <LogoWatermark variant="badge" />

                <div className="relative z-10 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest">
                    <TermBadge variant="tag">{statusLabels[project.status]}</TermBadge>
                    {project.year && <span className="opacity-40">{project.year}</span>}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-accent terminal-glow leading-none">
                    {project.title}
                  </h1>
                  <p className="pl-4 border-l-2 border-accent/20 text-sm md:text-lg text-base-content/80 font-bold uppercase tracking-tight">
                    {project.tagline}
                  </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row flex-wrap gap-3">
                  {project.links.length > 0 ? (
                    project.links.map((link) => {
                      const Icon = PROJECT_LINK_ICONS[link.kind];
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          {...(isExternal(link.href)
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="btn btn-terminal font-mono gap-2 hover:bg-accent hover:text-accent-content"
                        >
                          <Icon size={16} />
                          {link.label}
                        </a>
                      );
                    })
                  ) : (
                    <span className="border border-accent/10 bg-accent/5 opacity-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider">
                      {ui.emptyLinks}
                    </span>
                  )}
                </div>

                {project.image && (
                  <div className="relative z-10 aspect-video border-2 border-accent/30 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-cover"
                    />
                  </div>
                )}

                <section className="relative z-10 space-y-3">
                  <Heading>{ui.aboutTitle}</Heading>
                  {paragraphs(project.description).map((p, i) => (
                    <p
                      key={i}
                      className="text-sm md:text-base text-base-content/80 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </section>

                {project.highlights && project.highlights.length > 0 && (
                  <section className="relative z-10 space-y-3">
                    <Heading>{ui.highlightsTitle}</Heading>
                    <ul className="space-y-1.5 text-sm text-base-content/85">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-accent font-black shrink-0">[+]</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {project.tags.length > 0 && (
                  <section className="relative z-10 space-y-3">
                    <Heading>{ui.stackTitle}</Heading>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <TermBadge variant="tag" key={tag}>
                          {tag}
                        </TermBadge>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </TermWindow>
          </motion.div>

          <TermFooter name={hubContent.name} />
        </main>
      </TermShellView>
    </div>
  );
}
