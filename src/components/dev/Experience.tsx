"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/config";

export default function Experience() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-20 text-center italic underline decoration-accent decoration-8 underline-offset-8">
          EXPERIÊNCIA
        </h2>

        <div className="space-y-6">
          {devContent.experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="retro-border bg-card p-8 md:p-12 retro-shadow-sm flex flex-col md:flex-row gap-8 items-start hover:retro-shadow transition-all"
            >
              <div className="md:w-1/4">
                <span className="retro-border bg-accent text-white px-4 py-2 font-black text-sm uppercase">
                  {exp.period}
                </span>
              </div>
              <div className="md:w-3/4 space-y-4">
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">{exp.role}</h3>
                <h4 className="text-xl font-bold text-accent">{exp.company}</h4>
                <p className="text-lg md:text-xl font-medium opacity-70 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
