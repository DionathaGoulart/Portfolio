"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";

export default function About() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:mb-24"
      id="about"
    >
      <div>
        <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-wider flex items-center gap-2">
          <span className="text-xs opacity-40">01.</span> core_expertise
        </h2>
        <div className="space-y-6">
          {devContent.about.stacks.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex justify-between mb-2 text-xs md:text-sm font-bold tracking-widest uppercase">
                <span>{skill.name}</span>
                <span className="text-accent">{skill.level}%</span>
              </div>
              <div className="h-2 border border-accent/20 w-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  className="h-full bg-accent shadow-[0_0_15px_var(--accent)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="p-6 border border-accent/10 bg-accent/[0.02] relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/40" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/40" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/40" />

          <p className="text-sm md:text-base leading-relaxed opacity-70 font-mono italic">
            {devContent.about.text}
          </p>
        </div>
      </div>
    </section>
  );
}
