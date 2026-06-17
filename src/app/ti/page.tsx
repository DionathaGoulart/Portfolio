"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { tiContent } from "@/data/ti-config";

export default function TiPage() {
  const terminalRef = useRef(null);

  return (
    <main className="selection:bg-accent selection:text-white font-mono p-4 md:p-6 overflow-x-hidden">
      {/* Terminal Style Header */}
      <nav className="flex justify-between items-center mb-12 md:mb-16 border-b border-border-custom/30 pb-4">
        <div className="flex gap-2 md:gap-4 items-center overflow-hidden">
          <Link href="/" className="hover:bg-accent hover:text-white px-1 md:px-2 transition-colors text-[10px] sm:text-xs md:text-base whitespace-nowrap">
            ~/home
          </Link>
          <span className="text-border-custom/30 text-[10px] md:text-base">|</span>
          <span className="text-[9px] md:text-xs animate-pulse text-accent whitespace-nowrap flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="hidden sm:inline">SYSTEM_ONLINE</span>
            <span className="sm:hidden">ONLINE</span>
          </span>
        </div>
        <div className="flex gap-3 md:gap-6 items-center">
          <Link href="/ti/cv" className="hover:bg-accent hover:text-white px-1 md:px-2 transition-colors text-[10px] sm:text-xs md:text-base border border-accent/20 rounded px-2">
            ./cv
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero / Terminal Intro */}
      <section className="max-w-4xl mx-auto space-y-6 md:space-y-8 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-2"
        >
          <p className="opacity-40 tracking-tighter text-xs md:text-sm">$ whoami</p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-accent leading-tight">{tiContent.role}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 md:p-8 bg-accent/5 border border-accent/20 rounded-lg"
        >
          <p className="leading-relaxed text-base md:text-lg">
            {tiContent.hero.description}
          </p>
        </motion.div>
      </section>

      {/* Expertise Matrix */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:mb-24">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 border-b border-accent/30 pb-2 inline-block">01. core_expertise</h2>
          <div className="space-y-6">
            {tiContent.skills.map((skill, i) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="flex justify-between mb-1 text-xs md:text-sm">
                  <span>{skill.name}</span>
                  <span className="text-accent">{skill.level}%</span>
                </div>
                <div className="h-1 bg-accent/10 w-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    className="h-full bg-accent shadow-[0_0_10px_var(--accent)]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 border-b border-accent/30 pb-2 inline-block">02. operational_history</h2>
          <div className="space-y-8">
            {tiContent.experience.map((exp, i) => (
              <motion.div 
                key={exp.company}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-l border-accent/30 pl-4 md:pl-6 relative"
              >
                <div className="absolute -left-[4.5px] top-2 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_var(--accent)]" />
                <span className="text-[10px] md:text-xs opacity-40 mb-1 block">[{exp.period}]</span>
                <h3 className="text-base md:text-lg font-bold text-accent">{exp.role}</h3>
                <p className="text-xs md:text-sm opacity-70 mb-2">{exp.company}</p>
                <p className="text-xs md:text-sm opacity-60 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / System Status */}
      <footer className="max-w-4xl mx-auto pt-12 md:pt-16 border-t border-border-custom/10 text-[8px] md:text-[10px] opacity-30 flex flex-wrap justify-between gap-4 uppercase tracking-[0.2em]">
        <span>© 2026 DG_OS_V1.0</span>
        <span className="hidden sm:inline">ENC: AES-256-GCM</span>
        <span>LAT: -29.9961 / LONG: -51.0858</span>
      </footer>
    </main>
  );
}
