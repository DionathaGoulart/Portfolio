"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";

export default function Experience() {
  return (
    <section className="mb-16 md:mb-24" id="experience">
      <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-wider flex items-center gap-2">
        <span className="text-xs opacity-40">02.</span> operational_history
      </h2>
      <div className="space-y-8">
        {devContent.experience.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-l-2 border-accent/30 pl-4 md:pl-6 relative group"
          >
            <div className="absolute -left-[6px] top-2 w-2.5 h-2.5 bg-accent shadow-[0_0_10px_var(--accent)]" />
            <span className="text-[10px] md:text-xs opacity-40 mb-1 block font-bold tracking-widest uppercase">
              [{exp.period}]
            </span>
            <h3 className="text-base md:text-lg font-black text-accent uppercase group-hover:terminal-glow transition-all">
              {exp.role}
            </h3>
            <p className="text-xs md:text-sm opacity-70 mb-2 font-bold uppercase tracking-tighter">
              {exp.company}
            </p>
            <p className="text-xs md:text-sm opacity-60 leading-relaxed border-t border-accent/10 pt-2">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
