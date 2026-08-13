"use client";
import { motion } from "framer-motion";
import { tiContent } from "@/data/ti-config";
import { RetroSectionTitle } from "../ui/RetroSectionTitle";
import { RetroCard } from "../ui/RetroCard";
import { RetroBadge } from "../ui/RetroBadge";

export default function Experience() {
  return (
    <section className="py-20 md:py-32" id="experience">
      <RetroSectionTitle title={tiContent.ui.experienceTitle} />

      <div className="space-y-6">
        {tiContent.experience.map((exp) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <RetroCard
              shadow="sm"
              className="p-6 md:p-12 md:flex-row gap-6 md:gap-8 items-start hover:retro-shadow transition-all text-left"
            >
              <div className="w-full md:w-1/4">
                <RetroBadge variant="accent">{exp.period}</RetroBadge>
              </div>
              <div className="w-full md:w-3/4 space-y-3 md:space-y-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase leading-tight">
                  {exp.role}
                </h3>
                <h4 className="text-lg md:text-xl font-bold text-accent italic">{exp.company}</h4>
                <p className="text-base md:text-xl font-medium opacity-70 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </RetroCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
