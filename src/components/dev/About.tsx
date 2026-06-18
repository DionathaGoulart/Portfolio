"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { devContent } from "@/data/dev-config";
import { Logo } from "@/components/shared/Logo";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // System Uptime Counter
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const envVars = devContent.about.envVars;

  return (
    <section ref={sectionRef} className="min-h-[90vh] flex flex-col justify-center py-16 relative" id="about">
      {/* Title */}
      <div className="mb-6 md:mb-8 flex items-center justify-between border-b-2 border-accent/20 pb-4">
        <div>
          <h2 className="font-mono text-2xl md:text-4xl font-black text-accent tracking-tighter uppercase">
            // System_Overview
          </h2>
          <p className="font-mono text-xs md:text-sm text-foreground/60 mt-2 tracking-widest uppercase">
            Hardware & Cognitive Specs v4.0
          </p>
        </div>
        <div className="hidden md:block text-right font-mono text-xs text-accent/50">
          <p>UPTIME: {formatUptime(uptime)}</p>
          <p className="animate-pulse">STATUS: ONLINE</p>
        </div>
      </div>

      {/* Bento Grid HUD */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
        
        {/* Profile Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-12 lg:col-span-7 retro-border bg-card retro-shadow-sm flex flex-col relative overflow-hidden"
        >
          <div className="bg-accent/10 border-b border-accent/20 px-4 py-2 flex items-center justify-between text-[10px] font-mono tracking-wider text-accent font-bold z-20">
            <span>[ MODULE: PRIMARY_BIO ]</span>
            <span>PID: 001</span>
          </div>
          
          <div className="p-5 md:p-6 flex-1 flex flex-col gap-4 items-start relative z-10">
            <div className="space-y-3 font-mono">
              <div>
                <h3 className="text-xl md:text-3xl font-black text-foreground uppercase tracking-tight">{devContent.name.toLowerCase()}</h3>
                <p className="text-accent text-xs tracking-widest uppercase mt-1">{devContent.about.subtitle}</p>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl font-sans">
                {devContent.about.text}
              </p>
              <div className="flex flex-wrap gap-3 text-[10px] text-foreground/50 border-t border-accent/10 pt-3 mt-2">
                <p><span className="text-accent font-bold">HOST:</span> {devContent.meta.host}</p>
                <p><span className="text-accent font-bold">KERNEL:</span> {devContent.meta.kernel}</p>
                <p><span className="text-accent font-bold">SHELL:</span> {devContent.meta.shell}</p>
              </div>
            </div>
          </div>

          {/* Decorative Logo Background Watermark */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden text-accent select-none">
            <Logo className="w-[150%] h-[150%] md:w-[120%] md:h-[120%] object-cover -rotate-12" />
          </div>
        </motion.div>

        {/* Environment / Contact Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-12 lg:col-span-5 retro-border bg-card retro-shadow-sm flex flex-col relative z-10"
        >
          <div className="bg-accent/10 border-b border-accent/20 px-4 py-2 flex items-center justify-between text-[10px] font-mono tracking-wider text-accent font-bold">
            <span>[ MODULE: ENV_CONFIG ]</span>
            <span>PRINTENV</span>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center">
            <div className="space-y-2">
              {envVars.map((env) => (
                <div
                  key={env.key}
                  className="flex justify-between items-center border-b border-accent/5 pb-2 font-mono text-[10px] sm:text-xs"
                >
                  <span className="opacity-50 uppercase font-bold text-[9px] sm:text-[10px]">
                    {env.key}
                  </span>
                  {env.isLink ? (
                    <a
                      href={env.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-card hover:bg-accent px-1 transition-colors font-black tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      {env.value}
                      <span className="text-[8px] opacity-50">↗</span>
                    </a>
                  ) : (
                    <span className="text-foreground font-bold tracking-wider opacity-90">
                      {env.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Module - Terminal ASCII Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-12 retro-border bg-card retro-shadow-sm flex flex-col relative z-10"
        >
          <div className="bg-accent/10 border-b border-accent/20 px-4 py-2 flex items-center justify-between text-[10px] font-mono tracking-wider text-accent font-bold relative z-20">
            <span>[ MODULE: SYSTEM_SERVICES ]</span>
            <span>HTOP / CORE_MODULES</span>
          </div>

          {/* Decorative Logo Background Watermark */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden text-accent select-none mt-8">
            <Logo className="w-[150%] h-[150%] md:w-[120%] md:h-[120%] object-cover -rotate-12" />
          </div>

          <div className="p-4 md:p-6 bg-transparent font-mono text-xs md:text-sm text-foreground/80 relative z-10">
            <div className="w-full">
              <div className="text-accent/70 mb-4 font-bold flex items-center gap-2">
                <span>root@dg-os:~#</span>
                <span className="text-foreground">core_modules --status --all</span>
              </div>
              
              {/* Table Header */}
              <div className="flex border-b border-accent/30 pb-2 mb-3 text-[10px] md:text-xs text-accent font-black tracking-widest uppercase">
                <div className="w-[60%] md:w-[30%]">MODULE_ID</div>
                <div className="hidden md:block w-[15%]">CAPACITY</div>
                <div className="w-[40%] md:w-[15%]">STATUS</div>
                <div className="hidden md:block w-[40%]">ALLOCATION_BAR</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {devContent.about.stacks.map((skill, i) => {
                  const totalBlocks = 20;
                  const activeBlocks = Math.floor((skill.level / 100) * totalBlocks);
                  const barStr = "█".repeat(activeBlocks) + "▒".repeat(totalBlocks - activeBlocks);

                  return (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
                      className="flex items-center text-[10px] md:text-xs hover:bg-accent/10 py-1 transition-colors group"
                    >
                      <div className="w-[60%] md:w-[30%] font-bold text-foreground group-hover:text-accent flex items-center gap-2">
                        <span className="text-accent/50">{">"}</span>
                        {skill.name.toLowerCase().replace(/[\s/]+/g, '_')}.sys
                      </div>
                      <div className="hidden md:block w-[15%] text-accent font-black">{skill.level}%</div>
                      <div className="w-[40%] md:w-[15%] text-green-500/90 animate-pulse font-black drop-shadow-[0_0_2px_rgba(34,197,94,0.5)]">
                        [ OK ]
                      </div>
                      <div className="hidden md:block w-[40%] text-accent/90 tracking-widest text-[9px] md:text-[10px]">{barStr}</div>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-3 border-t border-accent/20 text-accent/70 flex items-center gap-2 font-bold">
                <span>root@dg-os:~#</span>
                <span className="w-2 h-4 bg-accent/80 animate-pulse inline-block" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
