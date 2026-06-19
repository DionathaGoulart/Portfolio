"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";
import { TypingText } from "@/components/shared/TypingText";
import { Logo } from "@/components/shared/Logo";
import Image from "next/image";

export default function Hero() {
  const terminalLines = [
    { cmd: "whoami",     value: devContent.meta.username, color: "text-accent" },
    { cmd: "fetch --role", value: devContent.role, isTyping: true },
    { cmd: "git branch",   value: devContent.hero.gitBranch },
    { cmd: "uptime",       value: devContent.hero.uptime },
  ];

  return (
    <section className="relative mb-6 md:mb-10 pt-0 min-h-[calc(100vh-theme(spacing.20))] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="retro-border bg-card retro-shadow overflow-hidden w-full flex flex-col"
      >
        {/* Terminal Header */}
        <div className="bg-accent/10 border-b-2 border-accent flex justify-center sm:justify-between items-center px-6 py-3 shrink-0 min-w-0">
          <div className="hidden sm:flex gap-2.5 shrink-0">
            <div className="w-3.5 h-3.5 rounded-full bg-accent" />
            <div className="w-3.5 h-3.5 rounded-full bg-accent/40" />
            <div className="w-3.5 h-3.5 rounded-full bg-accent/20" />
          </div>
          <div className="font-mono text-[10px] sm:text-xs font-black uppercase sm:tracking-[0.4em] text-accent/60 truncate">
            root@dg-os: ~/workspace/portfolio
          </div>
          <div className="hidden sm:flex gap-1.5 shrink-0">
            <div className="w-6 h-1 bg-accent/40" />
            <div className="w-6 h-1 bg-accent/20" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 flex-1">
          {/* Terminal Content Area - MAXIMIZED HEIGHT */}
          <div className="order-2 md:order-1 md:col-span-8 p-5 sm:p-8 md:p-12 font-mono relative overflow-hidden min-h-[400px] md:min-h-[650px] flex flex-col justify-start">
            {/* Background Logo Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.03] pointer-events-none">
              <Logo className="w-full h-full text-accent" />
            </div>

            <div className="relative z-10 space-y-5">
              {terminalLines.map((line, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-bold text-sm md:text-base">
                      {devContent.meta.prompt}
                    </span>
                    <span className="text-foreground/80 text-sm md:text-base">
                      {line.cmd}
                    </span>
                  </div>
                  <div className="pl-8 border-l-2 border-accent/10 min-h-[1.5rem]">
                    <span
                      className={`${line.color || "text-foreground"} text-sm md:text-base`}
                    >
                      {line.isTyping ? (
                        <span className="text-accent terminal-glow font-bold">
                          <TypingText text={line.value} speed={40} />
                        </span>
                      ) : (
                        line.value
                      )}
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-6 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-accent font-bold text-sm md:text-base">
                    dionatha@linux:~$
                  </span>
                  <span className="text-foreground/80 text-sm md:text-base">
                    cat manifest.md
                  </span>
                </div>
                <div className="pl-8 border-l-2 border-accent/20">
                  <p className="text-foreground/80 leading-snug max-w-2xl uppercase font-bold tracking-tight text-base md:text-xl italic">
                    {devContent.hero.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-6">
                <a
                  href="#projects"
                  className="bg-accent text-white px-6 md:px-8 py-3 md:py-4 font-bold text-sm md:text-base hover:bg-accent/90 transition-colors uppercase text-center tracking-wider retro-border retro-shadow-sm flex items-center justify-center gap-2"
                >
                  <span className="font-mono">{">"}</span> {devContent.ui?.heroProjectsButton || "Ver Projetos"}
                </a>
                <a
                  href="#contact"
                  className="border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/40 px-6 md:px-8 py-3 md:py-4 font-bold text-sm md:text-base transition-colors uppercase text-center tracking-wider flex items-center justify-center"
                >
                  {devContent.ui?.heroContactButton || "Iniciar Conexão"}
                </a>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <span className="text-accent font-bold text-sm md:text-base">
                  {devContent.meta.prompt}
                </span>
                <span className="w-3 h-6 bg-accent animate-pulse" />
              </div>
            </div>
          </div>

          {/* Side Info / Photo Panel */}
          <div className="order-1 md:order-2 md:col-span-4 border-b-2 md:border-b-0 md:border-l-2 border-accent bg-accent/5 p-5 md:p-8 flex flex-col items-center justify-center gap-8 md:gap-16 relative overflow-hidden">
            {/* Decorative grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(var(--color-accent) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Photo with spinning rings */}
            <div className="relative group scale-110 md:scale-125">
              <div className="absolute -inset-6 border-2 border-accent/10 group-hover:border-accent/30 transition-colors animate-[spin_15s_linear_infinite] rounded-full" />
              <div className="absolute -inset-12 border border-accent/5 animate-[spin_20s_linear_infinite_reverse] rounded-full" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent/60 transition-colors duration-500 z-10 bg-card">
                {/* Logo background inside circle */}
                <div className="absolute inset-0 flex items-center justify-center p-4 opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700">
                  <Logo className="w-full h-full text-accent" />
                </div>
                {/* Photo */}
                <Image
                  src="/me.png"
                  alt={devContent.name}
                  fill
                  className="object-cover z-10 grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
            </div>

            <div className="text-center space-y-5 relative z-10 w-full max-w-[280px]">
              <div className="flex justify-between items-center">
                <div className="h-px flex-1 bg-accent/20" />
                <div className="mx-4 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.5em] opacity-40 whitespace-nowrap">
                  USER_MANIFEST
                </div>
                <div className="h-px flex-1 bg-accent/20" />
              </div>

              <div className="grid grid-cols-1 gap-3 font-mono">
                <div className="flex justify-between items-center text-xs border-b border-accent/10 pb-1.5">
                  <span className="opacity-40 uppercase">User</span>
                  <span className="text-accent font-black">
                    {devContent.meta.username.replace(/_/g, ".")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-accent/10 pb-1.5">
                  <span className="opacity-40 uppercase">Status</span>
                  <span className="text-accent font-black text-[10px] md:text-xs">
                    {devContent.hero.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-accent/10 pb-1.5">
                  <span className="opacity-40 uppercase">Expertise</span>
                  <span className="text-accent font-black">{devContent.hero.expertise}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-accent/10 pb-1.5">
                  <span className="opacity-40 uppercase">Location</span>
                  <span className="text-accent font-black text-[10px] md:text-xs">
                    {devContent.hero.location}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-40 uppercase">Experience</span>
                  <span className="text-accent font-black">{devContent.hero.yearsOfExperience}</span>
                </div>
              </div>

              <div className="pt-4 text-left">
                <div className="font-mono text-[8px] md:text-[10px] uppercase tracking-widest opacity-30 mb-2 flex justify-between">
                  <span>Sync_Level</span>
                  <span>100%</span>
                </div>
                <div className="h-1.5 w-full bg-accent/10 rounded-full overflow-hidden flex gap-1">
                  <div className="h-full bg-accent w-[20%]" />
                  <div className="h-full bg-accent w-[20%]" />
                  <div className="h-full bg-accent w-[20%]" />
                  <div className="h-full bg-accent w-[20%]" />
                  <div className="h-full bg-accent w-[20%] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-accent text-white px-4 py-1.5 flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.3em]">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              Connected: SSH/LOCAL
            </span>
            <span className="hidden sm:inline opacity-60">● 127.0.0.1</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="opacity-60 hidden md:inline">CPU: 2%</span>
            <span className="bg-white text-accent px-2 font-black py-0.5">
              DG_ROOT_ACCESS
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
