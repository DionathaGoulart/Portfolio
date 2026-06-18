"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";

export default function Experience() {
  return (
    <section className="py-20 md:py-32" id="experience">
      <h2 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-12 md:mb-20 text-left italic underline decoration-accent decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8 uppercase">
        EXPERIÊNCIA
      </h2>

      <div className="space-y-6">
        {devContent.experience.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="retro-border bg-card p-6 md:p-12 retro-shadow-sm flex flex-col md:flex-row gap-6 md:gap-8 items-start hover:retro-shadow transition-all text-left"
          >
            <div className="w-full md:w-1/4">
              <span className="inline-block retro-border bg-accent text-white px-4 py-2 font-black text-xs md:text-sm uppercase whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <div className="w-full md:w-3/4 space-y-3 md:space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase leading-tight">
                {exp.role}
              </h3>
              <h4 className="text-lg md:text-xl font-bold text-accent italic">
                {exp.company}
              </h4>
              <p className="text-base md:text-xl font-medium opacity-70 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
