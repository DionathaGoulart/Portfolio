"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";
import { SectionTitle } from "../shared/SectionTitle";
import { SkillBar } from "../shared/SkillBar";

export default function About() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:mb-24"
      id="about"
    >
      <div>
        <SectionTitle number="01" title="core_expertise" variant="terminal" />
        <div className="space-y-6">
          {devContent.about.stacks.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              variant="terminal"
              delay={i * 0.1}
            />
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
