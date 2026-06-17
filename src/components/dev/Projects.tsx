"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/config";

export default function Projects() {
  return (
    <section className="py-32 bg-accent/[0.03] -mx-6 md:-mx-10 px-6 md:px-10" id="projects">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none italic uppercase">
            PROJETOS <br /> <span className="text-accent">SELECIONADOS</span>
          </h2>
          <p className="text-xl font-bold opacity-60">Uma vitrine de soluções reais desenvolvidas com precisão.</p>
        </div>
        <div className="retro-border bg-card p-6 retro-shadow-sm font-black text-2xl animate-bounce">
          SCROLL ↓
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        {devContent.projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="retro-border bg-card overflow-hidden retro-shadow-sm group-hover:retro-shadow transition-all group-hover:-translate-x-1 group-hover:-translate-y-1">
              <div className="border-b-2 border-border-custom bg-background p-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-border-custom" />
                  <div className="w-3 h-3 rounded-full bg-border-custom" />
                </div>
                <span className="font-mono text-xs font-bold opacity-40 uppercase">PROJECT_FILE_{i + 1}.EXE</span>
              </div>
              
              <div className="p-8 md:p-12 space-y-8">
                <h3 className="text-4xl font-black group-hover:text-accent transition-colors tracking-tighter italic">
                  {project.title}
                </h3>
                <p className="text-xl font-medium leading-relaxed opacity-70">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="retro-border bg-background px-3 py-1 text-xs font-black uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <a href={project.link} className="inline-block retro-border bg-foreground text-background px-6 py-3 font-black text-lg hover:bg-accent transition-colors uppercase">
                    View Case
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
