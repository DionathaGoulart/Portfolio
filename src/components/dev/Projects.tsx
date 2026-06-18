"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";

export default function Projects() {
  return (
    <section className="mb-16 md:mb-24" id="projects">
      <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-wider flex items-center gap-2">
        <span className="text-xs opacity-40">03.</span> projects_repo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {devContent.projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 border border-accent/20 bg-accent/5 hover:border-accent/50 transition-colors group"
          >
            <h3 className="text-xl font-black text-accent mb-2 uppercase">
              {project.title}
            </h3>
            <p className="text-sm opacity-70 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] border border-accent/20 px-2 py-0.5 text-accent opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
