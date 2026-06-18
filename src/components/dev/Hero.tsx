"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";
import { TypingText } from "@/components/shared/TypingText";
import { Logo } from "@/components/shared/Logo";

export default function Hero() {
  const terminalLines = [
    { cmd: "whoami", value: "dionatha_goulart", color: "text-accent" },
    { cmd: "fetch --role", value: devContent.role, isTyping: true },
    { cmd: "git branch", value: "production/stable" },
    { cmd: "uptime", value: "3 years, 128 days, 4 hours" },
  ];

  return (
    <section className="relative mb-16 md:mb-24 pt-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="retro-border bg-card retro-shadow overflow-hidden max-w-5xl mx-auto"
      >
        {/* Terminal Header */}
        <div className="bg-accent/10 border-b-2 border-accent flex justify-between items-center px-4 py-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <div className="w-3 h-3 rounded-full bg-accent/40" />
            <div className="w-3 h-3 rounded-full bg-accent/20" />
          </div>
          <div className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-accent/60">
            root@dg-os: ~/workspace/portfolio
          </div>
          <div className="flex gap-1">
             <div className="w-4 h-1 bg-accent/40" />
             <div className="w-4 h-1 bg-accent/20" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Terminal Content Area - FIXED HEIGHT */}
          <div className="md:col-span-8 p-6 md:p-10 font-mono relative overflow-hidden h-[450px] md:h-[400px] flex flex-col justify-start">
            {/* Background Logo Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] pointer-events-none">
              <Logo className="w-full h-full text-accent" />
            </div>

            <div className="relative z-10 space-y-3">
              {terminalLines.map((line, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold text-xs md:text-sm">dionatha@linux:~$</span>
                    <span className="text-foreground/80 text-xs md:text-sm">{line.cmd}</span>
                  </div>
                  <div className="pl-6 border-l-2 border-accent/10 min-h-[1.2rem]">
                    <span className={`${line.color || 'text-foreground'} text-xs md:text-sm`}>
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
              
              <div className="pt-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-accent font-bold text-xs md:text-sm">dionatha@linux:~$</span>
                  <span className="text-foreground/80 text-xs md:text-sm">cat manifest.md</span>
                </div>
                <div className="pl-6 border-l-2 border-accent/20">
                   <p className="text-foreground/80 leading-snug max-w-lg uppercase font-bold tracking-tight text-sm md:text-base italic">
                      {devContent.hero.description}
                   </p>
                </div>
              </div>

              {/* Blinking Cursor */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-accent font-bold text-xs md:text-sm">dionatha@linux:~$</span>
                <span className="w-2 h-4 bg-accent animate-pulse" />
              </div>
            </div>
          </div>

          {/* Side Info / Logo Branding */}
          <div className="md:col-span-4 border-t-2 md:border-t-0 md:border-l-2 border-accent bg-accent/5 p-6 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
             {/* Decorative grid pattern */}
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)', backgroundSize: '15px 15px' }} 
             />

             <div className="relative group scale-90 md:scale-100">
                <div className="absolute -inset-4 border-2 border-accent/10 group-hover:border-accent/30 transition-colors animate-[spin_15s_linear_infinite] rounded-full" />
                <div className="absolute -inset-8 border border-accent/5 animate-[spin_20s_linear_infinite_reverse] rounded-full" />
                <Logo className="w-24 h-24 md:w-28 md:h-28 text-accent drop-shadow-[0_0_15px_rgba(var(--color-accent),0.3)] relative z-10" />
             </div>

             <div className="text-center space-y-3 relative z-10 w-full max-w-[200px]">
                <div className="flex justify-between items-center">
                   <div className="h-px flex-1 bg-accent/20" />
                   <div className="mx-3 font-mono text-[7px] uppercase tracking-[0.4em] opacity-40 whitespace-nowrap">USER_MANIFEST</div>
                   <div className="h-px flex-1 bg-accent/20" />
                </div>
                
                <div className="grid grid-cols-1 gap-1.5 font-mono">
                   <div className="flex justify-between items-center text-[9px] border-b border-accent/10 pb-1">
                      <span className="opacity-40 uppercase">User</span>
                      <span className="text-accent font-bold">dionatha.goulart</span>
                   </div>
                   <div className="flex justify-between items-center text-[9px] border-b border-accent/10 pb-1">
                      <span className="opacity-40 uppercase">Status</span>
                      <span className="text-accent font-bold">Available_to_Code</span>
                   </div>
                   <div className="flex justify-between items-center text-[9px] border-b border-accent/10 pb-1">
                      <span className="opacity-40 uppercase">Expertise</span>
                      <span className="text-accent font-bold">Fullstack_Dev</span>
                   </div>
                   <div className="flex justify-between items-center text-[9px] border-b border-accent/10 pb-1">
                      <span className="opacity-40 uppercase">Location</span>
                      <span className="text-accent font-bold">Rio_Grande_do_Sul</span>
                   </div>
                   <div className="flex justify-between items-center text-[9px]">
                      <span className="opacity-40 uppercase">Experience</span>
                      <span className="text-accent font-bold">3+ Years</span>
                   </div>
                </div>

                <div className="pt-2 text-left">
                   <div className="font-mono text-[6px] uppercase tracking-widest opacity-30 mb-1 flex justify-between">
                      <span>Sync_Level</span>
                      <span>100%</span>
                   </div>
                   <div className="h-1 w-full bg-accent/10 rounded-full overflow-hidden flex gap-0.5">
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
             <span className="bg-white text-accent px-2 font-black py-0.5">DG_ROOT_ACCESS</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
