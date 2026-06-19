"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";
import { Logo } from "@/components/shared/Logo";
import { SectionTitle } from "../shared/SectionTitle";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative w-full" id="experience">
      <SectionTitle number="02" title="operational_history" variant="terminal" />

      {/* Main Terminal Window (Like Projects.tsx) */}
      <div className="retro-border bg-card retro-shadow overflow-hidden w-full flex flex-col relative h-auto">
        
        {/* Terminal Header Bar (Like Projects.tsx) */}
        <div className="bg-accent/5 border-b border-accent/10 px-4 py-2 flex justify-between items-center text-[10px] font-mono tracking-wider text-accent/50 font-normal relative z-20">
          <div className="flex gap-1.5 shrink-0 opacity-50">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/20" />
          </div>
          <span className="truncate mx-2">root@dg-os: ~/workspace/experience-logs</span>
          <span className="hidden sm:inline opacity-30">(C) {devContent.meta.copyright}</span>
        </div>

        {/* Decorative Logo Background Watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden text-accent select-none mt-8">
          <Logo className="w-[150%] h-[150%] md:w-[120%] md:h-[120%] object-cover -rotate-12" />
        </div>

        {/* Terminal Body (The Git Log from before) */}
        <div className="p-4 md:p-8 font-mono relative z-10 bg-transparent overflow-hidden text-ellipsis">
          <div className="w-full break-words">

            <div className="space-y-10">
              {devContent.experience.map((exp, i) => {
                const isLatest = i === 0;
                // Generate a pseudo-random looking hash based on company name
                const hashBase = (exp.company + exp.period).toLowerCase().replace(/[^a-z0-9]/g, '');
                const hash = (hashBase + "0f9a2b4c6d8e").substring(0, 8);
                const insertions = (i + 1) * 142;
                const deletions = (i + 1) * 23;

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
                      <div className="text-foreground/50">Author:</div>
                      <div className="text-foreground/90">{devContent.name} {"<"}{devContent.email}{">"}</div>
                      
                      <div className="text-foreground/50">Date:</div>
                      <div className="text-foreground/90">{exp.period}</div>
                    </div>
                    
                    {/* Commit Message Body */}
                    <div className="pl-6 md:pl-10 space-y-3 relative before:content-[''] before:absolute before:left-2 before:top-0 before:bottom-0 before:w-[2px] before:bg-accent/20 group-hover:before:bg-accent transition-colors">

                      <div className="text-accent font-black text-base md:text-lg uppercase tracking-tight">
                        {exp.company}
                      </div>
                      <div className="text-foreground font-bold opacity-90 text-xs md:text-sm">
                        feat: {exp.role}
                      </div>
                      <div className="text-foreground/70 leading-relaxed text-xs md:text-sm max-w-2xl mt-2">
                        {exp.description}
                      </div>
                      

                    </div>
                  </motion.div>
                );
              })}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
