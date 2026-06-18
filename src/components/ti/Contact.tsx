"use client";
import { motion } from "framer-motion";
import { tiContent } from "@/data/ti-config";
import { iconMap } from "../shared/Icons";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="py-20 md:py-32" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="retro-border bg-card retro-shadow relative overflow-hidden"
      >
        {/* Decorative accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

        <div className="p-8 sm:p-10 md:p-16 lg:p-20">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <span className="font-mono text-accent text-xs sm:text-sm uppercase tracking-widest font-bold mb-4 block">
              {">"} Iniciar protocolo de contato
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
              {tiContent.contact.title.split("?")[0]}
              {tiContent.contact.title.includes("?") && (
                <span className="text-accent">?</span>
              )}
            </h2>
            <p className="mt-6 text-base sm:text-lg md:text-xl font-medium text-foreground/60 max-w-2xl leading-relaxed">
              {tiContent.contact.description}
            </p>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {tiContent.contact.socials.map((social, i) => {
              const type = social.name.toLowerCase() as keyof typeof iconMap;
              const Icon = iconMap[type] || iconMap.github;
              return (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group retro-border bg-background flex flex-col items-center justify-center gap-3 p-6 md:p-8 hover:bg-accent hover:text-white transition-all duration-300 retro-shadow-sm hover:retro-shadow hover:-translate-y-1 active:translate-y-0"
                  >
                    <Icon size={28} />
                    <span className="font-black text-xs uppercase tracking-widest text-center">
                      {social.name}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Footer line */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-border-custom/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/30">
              Connection encrypted • Protocol active
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Online
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
