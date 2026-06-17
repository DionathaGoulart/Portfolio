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
    <main className="min-h-screen bg-[#050505] text-green-500 font-mono p-6 selection:bg-green-500 selection:text-black">
      {/* Terminal Style Header */}
      <nav className="flex justify-between items-center mb-16 border-b border-green-900/30 pb-4">
        <div className="flex gap-4 items-center">
          <Link href="/" className="hover:bg-green-500 hover:text-black px-2 transition-colors">root@dionatha: ~</Link>
          <span className="text-green-900">|</span>
          <span className="text-xs animate-pulse">● SYSTEM_ONLINE</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/ti/cv" className="hover:bg-green-500 hover:text-black px-2 transition-colors">/view-cv</Link>
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
          <p className="text-green-900 tracking-tighter">$ whoami</p>
          <h1 className="text-4xl md:text-6xl font-bold">{tiContent.role}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-8 bg-green-950/10 border border-green-900/30 rounded-lg"
        >
          <p className="text-green-400 leading-relaxed text-lg">
            {tiContent.hero.description}
          </p>
        </motion.div>
      </section>

      {/* Expertise Matrix */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div>
          <h2 className="text-2xl font-bold mb-8 border-b border-green-900/30 pb-2 inline-block">01. core_expertise</h2>
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
                  <span className="text-green-900">{skill.level}%</span>
                </div>
                <div className="h-1 bg-green-950/30 w-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8 border-b border-green-900/30 pb-2 inline-block">02. operational_history</h2>
          <div className="space-y-8">
            {tiContent.experience.map((exp, i) => (
              <motion.div 
                key={exp.company}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-l border-green-900/50 pl-6 relative"
              >
                <div className="absolute -left-[4.5px] top-2 w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-green-900 mb-1 block">[{exp.period}]</span>
                <h3 className="text-lg font-bold text-green-400">{exp.role}</h3>
                <p className="text-sm text-green-700 mb-2">{exp.company}</p>
                <p className="text-sm opacity-60 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / System Status */}
      <footer className="max-w-4xl mx-auto pt-16 border-t border-green-900/20 text-[10px] text-green-900 flex justify-between uppercase tracking-[0.2em]">
        <span>© 2026 DG_OS_V1.0</span>
        <span>ENC: AES-256-GCM</span>
        <span>LAT: -29.9961 / LONG: -51.0858</span>
      </footer>
    </main>
  );
}
