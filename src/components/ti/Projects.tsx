"use client";
import { motion } from "framer-motion";
import { tiContent } from "@/data/ti-config";
import { SectionTitle } from "../shared/SectionTitle";

export default function Projects() {
  return (
    <section
      className="py-20 md:py-32 bg-accent/[0.03] -mx-4 sm:-mx-6 md:-mx-10 px-4 sm:px-6 md:px-10"
      id="projects"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
        <div className="max-w-2xl text-left">
          <SectionTitle title="PROJETOS SELECIONADOS" variant="retro" className="mb-4 md:mb-8" />
          <p className="text-lg md:text-xl font-bold opacity-60">
            Uma vitrine de soluções reais desenvolvidas com precisão.
          </p>
        </div>
        <div className="hidden md:block retro-border bg-card p-6 retro-shadow-sm font-black text-2xl animate-bounce">
          SCROLL ↓
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left">
        {tiContent.projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="retro-border bg-card overflow-hidden retro-shadow-sm group-hover:retro-shadow transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 h-full flex flex-col">
              <div className="border-b-2 border-border-custom bg-background p-3 md:p-4 flex justify-between items-center shrink-0">
                <div className="flex gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-accent" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-border-custom" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-border-custom" />
                </div>
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
                    <span
                      key={tag}
                      className="retro-border bg-background px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs font-black uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 md:pt-4 flex flex-col sm:flex-row gap-3 md:gap-4">
                  {project.link && project.link !== "#" ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center retro-border bg-foreground text-background px-4 py-3 font-black text-xs md:text-sm hover:bg-accent hover:text-white transition-colors uppercase"
                    >
                      Deploy Production
                    </a>
                  ) : (
                    <span className="flex-1 text-center retro-border border-foreground/20 text-foreground/40 px-4 py-3 font-black text-xs md:text-sm uppercase cursor-not-allowed">
                      Offline
                    </span>
                  )}
                  
                  {project.github === "private" ? (
                    <span className="flex-1 text-center retro-border border-foreground/20 text-foreground/40 px-4 py-3 font-black text-xs md:text-sm uppercase cursor-not-allowed">
                      GitHub Privado
                    </span>
                  ) : project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center retro-border border-foreground text-foreground px-4 py-3 font-black text-xs md:text-sm hover:bg-foreground hover:text-background transition-colors uppercase"
                    >
                      GitHub Repo
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
