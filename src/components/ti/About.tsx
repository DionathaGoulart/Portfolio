"use client";
import { motion } from "framer-motion";
import { tiContent } from "@/data/ti-config";
import { SectionTitle } from "../shared/SectionTitle";
import { SkillBar } from "../shared/SkillBar";

export default function About() {
  return (
    <section className="py-20 md:py-32" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 text-left">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-6 md:space-y-8"
        >
          <div className="inline-block retro-border bg-accent px-4 py-2 text-white font-black text-lg md:text-xl retro-shadow-sm mb-2 md:mb-4 uppercase">
            {tiContent.ui?.aboutBadge || "Sobre"}
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.1] md:leading-none">
            {tiContent.ui?.aboutTitlePrefix || "Transformando ideias em "}
            <span className="text-accent underline decoration-4 md:decoration-8">
              {tiContent.ui?.aboutTitleHighlight || "Sistemas Reais."}
            </span>
          </h2>
          <p className="text-lg md:text-2xl font-bold opacity-70 leading-relaxed md:leading-snug">
            {tiContent.about.text}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="retro-border bg-card p-6 md:p-8 retro-shadow-sm h-full">
            <h3 className="font-black text-xl md:text-2xl mb-6 md:mb-8 border-b-2 border-border-custom pb-4 uppercase tracking-tighter italic">
              {tiContent.ui?.aboutStackTitle || "Stack_Principal"}
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {tiContent.about.stacks.map((stack) => (
                <SkillBar
                  key={stack.name}
                  name={stack.name}
                  level={stack.level}
                  variant="retro"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
