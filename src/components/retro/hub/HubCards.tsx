"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/shared/Logo";
import { hubContent } from "@/data/hub-config";
import { projectsContent } from "@/data/projects-config";
import { RetroCard } from "@/components/retro/ui/RetroCard";

/**
 * The hub's route cards, one per `hubContent.sections` entry (Portfólio, Projetos...). Each
 * sets --hub-hover-bg so its hover colour announces the destination.
 */
export function HubCards() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-5 grid gap-6 md:gap-8"
    >
      {Object.entries(hubContent.sections).map(([key, section], i) => (
        <Link key={key} href={section.href} className="group">
          <RetroCard
            shadow="sm"
            className="p-1 group-hover:retro-shadow transition-all transform group-hover:-translate-y-2 relative overflow-hidden group-hover:text-white"
            style={{ "--hub-hover-bg": section.hoverColor } as React.CSSProperties}
          >
            {/* Terminal Title Bar */}
            <div className="bg-accent text-accent-content px-3 py-1.5 flex justify-between items-center mb-1 group-hover:bg-white transition-colors">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:text-[var(--hub-hover-bg)]">
                <Logo className="w-3 h-3 text-accent-content group-hover:text-[var(--hub-hover-bg)]" />
                {section.subtitle}
              </span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full border border-white group-hover:border-[var(--hub-hover-bg)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-[var(--hub-hover-bg)]" />
              </div>
            </div>

            <div className="p-5 sm:p-7 space-y-4 font-mono group-hover:bg-[var(--hub-hover-bg)] transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold group-hover:text-white">
                  {i === 0 ? "$" : ">"}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase italic leading-none mb-1">
                    {section.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold opacity-60 uppercase leading-tight group-hover:opacity-100">
                    {section.tags}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-accent/10 group-hover:border-white/20 flex justify-between items-center opacity-40 group-hover:opacity-100">
                <span className="text-[9px] uppercase tracking-widest bg-accent/10 group-hover:bg-white/20 px-2 py-0.5 rounded text-accent group-hover:text-white">
                  {section.status.replace("{count}", String(projectsContent.projects.length))}
                </span>
                <span className="text-xs font-black">{section.action}</span>
              </div>
            </div>
          </RetroCard>
        </Link>
      ))}
    </motion.div>
  );
}
