"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import type { PersonaContent } from "@/types/content";
import { TermSectionTitle } from "../ui/TermSectionTitle";
import { LogoWatermark } from "@/components/shared/LogoWatermark";
import { TermWindow } from "@/components/terminal/ui/TermWindow";

export default function Experience({ content }: { content: PersonaContent }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative w-full" id="experience">
      <TermSectionTitle number="02" title={content.ui.terminal.experienceTitle} />

      {/* Main Terminal Window (Like Projects.tsx) */}
      <TermWindow
        chrome="bar"
        className="relative h-auto"
        barClassName="relative z-20"
        title="root@dg-os: ~/workspace/experience-logs"
        right={<span className="hidden sm:inline opacity-30">(C) {content.meta.copyright}</span>}
      >
        {/* Decorative Logo Background Watermark */}
        <LogoWatermark className="mt-8" />

        {/* Terminal Body (The Git Log from before) */}
        <div className="p-4 md:p-8 font-mono relative z-10 bg-transparent overflow-hidden text-ellipsis">
          <div className="w-full break-words">
            <div className="space-y-10">
              {content.experience.map((exp, i) => {
                return (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: i * 0.2 }}
                    className="group"
                  >
                    {/* Author & Date */}
                    <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-x-2 gap-y-1 mb-5 text-[11px] md:text-xs">
                      <div className="text-base-content/50">Author:</div>
                      <div className="text-base-content/90">
                        {content.name} {"<"}
                        {content.email}
                        {">"}
                      </div>

                      <div className="text-base-content/50">Date:</div>
                      <div className="text-base-content/90">{exp.period}</div>
                    </div>

                    {/* Commit Message Body */}
                    <div className="pl-6 md:pl-10 space-y-3 relative before:content-[''] before:absolute before:left-2 before:top-0 before:bottom-0 before:w-[2px] before:bg-accent/20 group-hover:before:bg-accent transition-colors">
                      <div className="text-accent font-black text-base md:text-lg uppercase tracking-tight">
                        {exp.company}
                      </div>
                      <div className="text-base-content font-bold opacity-90 text-xs md:text-sm">
                        feat: {exp.role}
                      </div>
                      <div className="text-base-content/70 leading-relaxed text-xs md:text-sm max-w-2xl mt-2">
                        {exp.description}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </TermWindow>
    </section>
  );
}
