"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { devContent } from "@/data/dev-config";
import { Logo } from "@/components/shared/Logo";

const tabs = [
  { id: "main-profile", label: "01. MAIN PROFILE [ABOUT]", shortcut: "1" },
  { id: "lspci", label: "02. LSPCI -V [SKILLS]", shortcut: "2" },
  { id: "journalctl", label: "03. JOURNALCTL -U HISTORY", shortcut: "3" },
  { id: "env", label: "04. PRINTENV CONFIG [CONTACT]", shortcut: "4" },
];

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  const [isRebooting, setIsRebooting] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-cycling tabs every 5 seconds
  useEffect(() => {
    if (isPaused || isRebooting) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, isRebooting]);

  // Clickable contact variables as environment mocks
  const envVars = [
    { key: "DG_EMAIL", value: '"dionatha.work@gmail.com"', isLink: true, href: "mailto:dionatha.work@gmail.com" },
    { key: "DG_LINKEDIN", value: '"linkedin.com/in/dionathagoulart"', isLink: true, href: "https://linkedin.com/in/dionathagoulart" },
    { key: "DG_GITHUB", value: '"github.com/DionathaGoulart"', isLink: true, href: "https://github.com/DionathaGoulart" },
    { key: "DG_STATUS", value: '"DISPONIVEL_PARA_NOVOS_PROJETOS"' },
    { key: "DG_LOCALE", value: '"pt_BR.UTF-8"' },
    { key: "DG_SHELL", value: '"/bin/zsh (custom)"' },
    { key: "DG_IDE", value: '"VSCode + Vim Emulation"' },
    { key: "DG_COFFEE_LEVEL", value: '"98% (ESTABILIDADE CRITICA)"' },
    { key: "DG_MUSIC_CHANNEL", value: '"Synthwave / Lofi Beats"' },
    { key: "DG_UPTIME", value: '"3 ANOS COMERCIAL (STABLE)"' },
  ];

  // Professional experience formatted as system startup logs (journalctl)
  const journalLogs = [
    "[2023-01-10] systemd[1]: Starting Cybernetrs Daemon (IT Operations)...",
    "[2023-05-18] Cybernetrs[412]: Automação de processos críticos e criação de scripts utilitários.",
    "[2023-11-05] Cybernetrs[412]: Monitoramento de infraestrutura local e servidores (uptime 99.9%).",
    "[2024-12-15] systemd[1]: Cybernetrs Daemon stopped successfully. [SYSTEM_EXIT_0]",
    "[2025-01-01] systemd[1]: Starting Containner Daemon (Fullstack Dev)...",
    "[2025-04-12] Containner[808]: Desenvolvimento de showcases web premium e aplicações altamente interativas.",
    "[2025-10-30] Containner[808]: Liderança técnica no desenvolvimento de monorepos robustos via Turborepo.",
    "[2026-06-18] status[1]: ACTIVE WORKSTATION // HEALTH 100% - READY_TO_DEPLOY"
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom >= 0;
      if (!inView) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveTab((prev) => (prev + 1) % tabs.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
      } else if (e.key === "F10") {
        e.preventDefault();
        triggerReboot();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerReboot = () => {
    if (isRebooting) return;
    setIsRebooting(true);
    setBootLines([]);

    const lines = [
      "AMIBIOS (C) 2026 Dionatha Goulart Industries",
      "PORTFOLIO DEPLOY SYSTEM V4.02 // CPU POST INITIATED",
      "-------------------------------------------------------------",
      "CPU: AMD RYZEN OCTA-CORE PROCESSOR @ 4.20GHz OK",
      "L1 CACHE: 512KB  //  L2 CACHE: 4096KB  //  L3 CACHE: 16384KB",
      "SYSTEM MEMORY TEST : 16384KB PASSED SUCCESSFULLY",
      "DETECTING LOCAL STORAGE BUS DEVICING...",
      "  PORT 0: PRIMARY NVMe M.2 SSD [1024GB] - BOOTABLE",
      "  PORT 1: SECONDARY INT_TEMP [98C] - COFFEE_ACTIVE",
      "-------------------------------------------------------------",
      "BOOTING 'Dionatha-OS-Stable' FROM M.2 PRIMARY PARTITION...",
      "LOADING SYSTEM KERNEL AND DRIVER RESOURCES...",
      "[  OK  ] MOUNTED DEV INFRASTRUCTURE AT /dev/sdc",
      "[  OK  ] MOUNTED EXPERTISE STACKS AT /root/skills",
      "[  OK  ] INITIALIZED REACT/NEXT.JS ENGINE V16.2",
      "[  OK  ] ESTABLISHED STABLE PRODUCTION DAEMON",
      "-------------------------------------------------------------",
      "POST SUCCESSFUL. RETURNING TO BIOS CONFIG..."
    ];

    lines.forEach((line, index) => {
      setTimeout(() => {
        setBootLines((prev) => [...prev, line]);
      }, index * 95);
    });

    setTimeout(() => {
      setIsRebooting(false);
    }, lines.length * 95 + 400);
  };

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen flex flex-col justify-center py-4 md:py-6 relative" 
      id="about"
    >
      {/* Outer BIOS Container - STRICT TALLER HEIGHT ON DESKTOP */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="retro-border bg-card retro-shadow overflow-hidden w-full flex flex-col relative h-auto md:h-[780px]"
      >
        
        {/* Top Header Bar */}
        <div className="bg-accent/10 border-b-2 border-accent/20 px-4 py-2 flex justify-between items-center text-[10px] font-mono tracking-wider text-accent font-black">
          <span>AMIBIOS SETUP UTILITY - VERSION 4.02</span>
          <span className="hidden md:inline">(C) 2026 DIONATHA GOULART INDUSTRIES</span>
          <span className="animate-pulse">● AUTO-CYCLE ACTIVE</span>
        </div>

        {/* Inner BIOS Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 min-h-0">
          
          {/* Left Column: Menu Items */}
          <div className="md:col-span-4 border-b border-accent/10 md:border-b-0 md:border-r border-accent/20 bg-accent/[0.01] flex flex-col justify-between">
            <div className="p-4 space-y-1.5">
              <div className="font-mono text-[9px] uppercase tracking-widest opacity-40 mb-3 px-2">
                Setup Navigation
              </div>
              <div className="space-y-1">
                {tabs.map((tab, idx) => {
                  const isSelected = activeTab === idx;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(idx)}
                      className={`w-full text-left px-3 py-3.5 font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer group ${
                        isSelected
                          ? "bg-accent text-white font-black border-l-4 border-white"
                          : "hover:bg-accent/10 text-foreground/70"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{isSelected ? "►" : " "}</span>
                        {tab.label}
                      </span>
                      <span
                        className={`text-[9px] opacity-30 ${
                          isSelected ? "text-white" : "group-hover:opacity-60"
                        }`}
                      >
                        [F{tab.shortcut}]
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hardware Diagnostic Info */}
            <div className="hidden md:block p-4 border-t border-accent/15 font-mono text-[9px] opacity-30 leading-normal space-y-1 select-none">
              <p>SYSTEM CORE: COGNITIVE_v4</p>
              <p>CLOCK: 4.20GHz (BURST MODE)</p>
              <p>THERMAL: NOMINAL (38°C)</p>
              <p>COOLING: COFFEE-INJECTED LIQUID</p>
            </div>
          </div>

          {/* Right Column: Dynamic Content Panel - STRICT TALLER HEIGHT */}
          <div className="md:col-span-8 p-6 md:p-8 bg-background relative overflow-hidden flex flex-col justify-between h-[380px] md:h-[700px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="flex-1 flex flex-col justify-between min-h-0"
              >
                
                {/* 1. MAIN PROFILE [ABOUT] */}
                {activeTab === 0 && (
                  <div className="space-y-4 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start border-b border-accent/10 pb-3 shrink-0">
                      <div>
                        <h3 className="font-mono text-xs text-accent font-black tracking-widest">
                          {">"} MAIN PROFILE // PERFIL DO SISTEMA
                        </h3>
                        <p className="font-mono text-[9px] opacity-40 mt-0.5">
                          RETRIEVING BIOGRAPHY & PRIMARY SYNOPSIS
                        </p>
                      </div>
                      <div className="w-10 h-10 shrink-0 text-accent/80 p-1.5 border border-accent/10 bg-accent/[0.01]">
                        <Logo className="w-full h-full" />
                      </div>
                    </div>

                    <div className="font-mono text-[11px] md:text-xs space-y-3 bg-black/10 p-4 border border-accent/10 rounded overflow-y-auto flex-1 max-h-[320px] md:max-h-[490px] leading-relaxed">
                      <div>
                        <span className="text-accent font-bold">NOME</span>
                        <p className="pl-4 text-foreground/85">dionatha — Engenheiro de Software Fullstack focado em engenharia de alta performance.</p>
                      </div>
                      
                      <div>
                        <span className="text-accent font-bold">SINOPSE</span>
                        <p className="pl-4 text-foreground/85">dionatha [OPÇÕES]... [EXPERIÊNCIA_COMERCIAL]...</p>
                      </div>

                      <div>
                        <span className="text-accent font-bold">DESCRIÇÃO</span>
                        <p className="pl-4 text-foreground/85">
                          {devContent.about.text}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-accent/5 grid grid-cols-2 gap-2 text-[10px] text-foreground/50">
                        <p><span className="text-accent font-bold">HOST:</span> DG-WORKSTATION</p>
                        <p><span className="text-accent font-bold">KERNEL:</span> 6.1.0-STABLE</p>
                        <p><span className="text-accent font-bold">SHELL:</span> /bin/zsh</p>
                        <p><span className="text-accent font-bold">STATUS:</span> READY_TO_DEPLOY</p>
                      </div>
                    </div>

                    <div className="font-mono text-[9px] opacity-35 shrink-0">
                      MAIN_PROFILE(1) // GENERAL INFO v4.02
                    </div>
                  </div>
                )}

                {/* 2. LSPCI -V [SKILLS] */}
                {activeTab === 1 && (
                  <div className="space-y-4 h-full flex flex-col justify-between">
                    <div className="pb-2 border-b border-accent/10 shrink-0">
                      <h3 className="font-mono text-xs text-accent font-black tracking-widest">
                        {">"} LSPCI -V // DRIVERS & DISPOSITIVOS
                      </h3>
                      <p className="font-mono text-[9px] opacity-40 mt-0.5">
                        HARDWARE REVELADO COM CAPACIDADES TÉCNICAS DETALHADAS
                      </p>
                    </div>

                    {/* Skill hardware list with max-height to guarantee strict layout boundaries */}
                    <div className="space-y-4 overflow-y-auto pr-1 flex-1 max-h-[320px] md:max-h-[500px] py-1 select-none">
                      {devContent.about.stacks.map((skill, i) => {
                        // Custom driver descriptions based on skill name
                        let capabilities = "";
                        if (skill.name.includes("React")) capabilities = "Interfaces imersivas de alta fidelidade, Next.js, SEO avançado e renderização premium.";
                        else if (skill.name.includes("Node")) capabilities = "APIs escaláveis em TypeScript, microserviços robustos e arquitetura orientada a eventos.";
                        else if (skill.name.includes("TypeScript")) capabilities = "Tipagem estrita, prevenção estática de erros e arquitetura de código extremamente escalável.";
                        else if (skill.name.includes("Python")) capabilities = "Modelagem robusta de dados via Django, automação avançada de scripts e raspagem.";
                        else if (skill.name.includes("PostgreSQL")) capabilities = "Queries otimizadas, modelagem complexa de banco de dados relacionais e NoSQL, Prisma.";
                        else capabilities = "Deploy automatizado via Docker Compose, pipelines CI/CD integrados e containerização isolada.";

                        return (
                          <div key={skill.name} className="group font-mono text-[11px] border-b border-accent/5 pb-2 last:border-b-0">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <span className="opacity-30">00:0{i + 1}.0 Controller:</span>
                                {skill.name}
                              </span>
                              <span className="text-[10px] text-accent font-black">
                                RECURSOS ALLOCADOS {skill.level}%
                              </span>
                            </div>

                            {/* Segmented LED style block meter */}
                            <div className="flex gap-1 pt-0.5 mb-1.5">
                              {[...Array(12)].map((_, index) => {
                                const threshold = (index / 12) * 100;
                                const isActive = skill.level > threshold;
                                return (
                                  <div
                                    key={index}
                                    className={`h-2 flex-1 border transition-all duration-300 ${
                                      isActive
                                        ? "bg-accent/85 border-accent/40 shadow-[0_0_2px_rgba(var(--color-accent),0.2)]"
                                        : "bg-accent/[0.02] border-accent/5 opacity-15"
                                    }`}
                                  />
                                );
                              })}
                            </div>

                            <p className="text-[10px] text-foreground/60 leading-normal pl-4">
                              <span className="text-accent font-bold">Driver:</span> {capabilities}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. JOURNALCTL -U HISTORY */}
                {activeTab === 2 && (
                  <div className="space-y-4 h-full flex flex-col justify-between">
                    <div className="pb-2 border-b border-accent/10 shrink-0">
                      <h3 className="font-mono text-xs text-accent font-black tracking-widest">
                        {">"} JOURNALCTL -U HISTORY --NO-PAGER
                      </h3>
                      <p className="font-mono text-[9px] opacity-40 mt-0.5">
                        LINHA DO TEMPO PROFISSIONAL DETALHADA EM FORMATO DE SYSTEM LOG
                      </p>
                    </div>

                    <div className="flex-1 bg-black/10 border border-accent/10 p-4 font-mono text-[10px] leading-relaxed opacity-85 max-h-[320px] md:max-h-[500px] overflow-y-auto select-none rounded space-y-2">
                      {journalLogs.map((log, index) => (
                        <div key={index} className="flex gap-2 items-start border-b border-accent/5 pb-1 last:border-0 last:pb-0">
                          <span className="text-accent shrink-0 font-bold">
                            {log.substring(0, 12)}
                          </span>
                          <span className="text-foreground/80 leading-normal">
                            {log.substring(12)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. PRINTENV CONFIG [CONTACT] */}
                {activeTab === 3 && (
                  <div className="space-y-4 h-full flex flex-col justify-between">
                    <div className="pb-2 border-b border-accent/10 shrink-0">
                      <h3 className="font-mono text-xs text-accent font-black tracking-widest">
                        {">"} PRINTENV | GREP DG_CONFIG
                      </h3>
                      <p className="font-mono text-[9px] opacity-40 mt-0.5">
                        PORTFÓLIO DE VARIÁVEIS DO SISTEMA E LINKS DIRETOS PARA CONTATO
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-2 overflow-y-auto max-h-[320px] md:max-h-[500px] flex-1">
                      {envVars.map((env) => (
                        <div
                          key={env.key}
                          className="flex justify-between items-center border-b border-accent/5 pb-1 font-mono text-xs"
                        >
                          <span className="opacity-40 uppercase font-bold text-[9px]">
                            {env.key}
                          </span>
                          {env.isLink ? (
                            <a
                              href={env.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:underline font-black tracking-wider text-[11px] flex items-center gap-1 cursor-pointer"
                            >
                              {env.value.replace(/"/g, "")}
                              <span className="text-[8px] opacity-50">↗</span>
                            </a>
                          ) : (
                            <span className="text-accent font-black tracking-wider text-[11px]">
                              {env.value}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
            
            {/* Inner bottom decorator bar */}
            <div className="mt-4 border-t border-accent/10 pt-3 flex justify-between items-center font-mono text-[8px] opacity-25 shrink-0">
              <span>ACTIVE_MODULE: ABOUT_BIO_V4</span>
              <span>STATE: STABLE_OK</span>
            </div>
          </div>
        </div>

        {/* Bottom Legend / Shortcuts Bar */}
        <div className="bg-accent/5 border-t-2 border-accent/20 px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] font-mono tracking-widest text-foreground/40 shrink-0">
          <div className="flex gap-4">
            <span>[HOVER] PAUSAR TIMER</span>
            <span>[CLICK] NAVEGAR</span>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={triggerReboot}
              className="text-accent hover:underline font-black cursor-pointer uppercase py-0.5"
            >
              [F10] REBOOT DO SISTEMA
            </button>
          </div>
        </div>

        {/* Simulated POST Reboot Screen Cover */}
        <AnimatePresence>
          {isRebooting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black text-white p-6 md:p-10 font-mono text-xs z-50 overflow-y-auto flex flex-col justify-between"
            >
              <div className="space-y-1.5 select-none leading-normal">
                {bootLines.map((line, idx) => (
                  <div key={idx} className="font-mono text-[10px] md:text-xs">
                    {line}
                  </div>
                ))}
                <div className="w-2 h-4 bg-white animate-pulse inline-block" />
              </div>

              <div className="text-[9px] text-white/40 border-t border-white/10 pt-4 text-right tracking-widest uppercase">
                POST SEQUENCE RUNNING // COGNITIVE RESET COMPLETE
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Aligned Breadcrumbs / Path Decos */}
      <div className="mt-4 flex justify-between items-center px-4 font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-30">
        <div className="flex items-center gap-2">
          <span className="text-accent">~</span>
          <span>/</span>
          <span>root</span>
          <span>/</span>
          <span>bios</span>
          <span>/</span>
          <span className="text-accent">setup_utility</span>
        </div>
        <div className="hidden sm:block">
          DG_CORE_v4.02 // ARCH_X86_64
        </div>
      </div>
    </section>
  );
}
