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
    <main className="selection:bg-accent selection:text-white font-mono p-6">
      {/* Terminal Style Header */}
      <nav className="flex justify-between items-center mb-16 border-b border-border-custom/30 pb-4">
        <div className="flex gap-4 items-center">
          <Link href="/" className="hover:bg-accent hover:text-white px-2 transition-colors">root@dionatha: ~</Link>
          <span className="text-border-custom/30">|</span>
          <span className="text-xs animate-pulse text-accent">● SYSTEM_ONLINE</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/ti/cv" className="hover:bg-accent hover:text-white px-2 transition-colors">/view-cv</Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero / Terminal Intro */}
      <section className="max-w-4xl mx-auto space-y-8 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-2"
        >
          <p className="opacity-40 tracking-tighter">$ whoami</p>
          <h1 className="text-4xl md:text-6xl font-bold text-accent">{tiContent.role}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-8 bg-accent/5 border border-accent/20 rounded-lg"
        >
          <p className="leading-relaxed text-lg">
            {tiContent.hero.description}
          </p>
        </motion.div>
      </section>

      {/* Expertise Matrix */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div>
          <h2 className="text-2xl font-bold mb-8 border-b border-accent/30 pb-2 inline-block">01. core_expertise</h2>
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
                <div className="flex justify-between mb-1 text-sm">
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
          <h2 className="text-2xl font-bold mb-8 border-b border-accent/30 pb-2 inline-block">02. operational_history</h2>
          <div className="space-y-8">
            {tiContent.experience.map((exp, i) => (
              <motion.div 
                key={exp.company}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-l border-accent/30 pl-6 relative"
              >
                <div className="absolute -left-[4.5px] top-2 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_var(--accent)]" />
                <span className="text-xs opacity-40 mb-1 block">[{exp.period}]</span>
                <h3 className="text-lg font-bold text-accent">{exp.role}</h3>
                <p className="text-sm opacity-70 mb-2">{exp.company}</p>
                <p className="text-sm opacity-60 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / System Status */}
      <footer className="max-w-4xl mx-auto pt-16 border-t border-border-custom/10 text-[10px] opacity-30 flex justify-between uppercase tracking-[0.2em]">
        <span>© 2026 DG_OS_V1.0</span>
        <span>ENC: AES-256-GCM</span>
        <span>LAT: -29.9961 / LONG: -51.0858</span>
      </footer>
    </main>
  );
}
