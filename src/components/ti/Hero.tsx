"use client";
import { motion } from "framer-motion";
import { tiContent } from "@/data/ti-config";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center py-12 md:py-20 relative overflow-x-hidden">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="retro-border bg-card p-6 sm:p-8 md:p-16 retro-shadow relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-accent rotate-45 translate-x-8 -translate-y-8" />

          <span className="font-mono text-accent font-bold uppercase tracking-widest mb-4 md:mb-6 block text-xs sm:text-base">
            {">"} {tiContent.role}
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 md:mb-8 leading-[1] md:leading-[0.9] tracking-tighter uppercase">
            {tiContent.hero.title}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-foreground/80 max-w-2xl mb-8 md:mb-12">
            {tiContent.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 text-left">
            <a
              href="#projects"
              className="retro-border bg-accent text-white px-8 py-4 md:px-10 md:py-5 font-black text-lg md:text-xl retro-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase text-center sm:text-left"
            >
              Projetos
            </a>
            <a
              href="#contact"
              className="retro-border bg-background px-8 py-4 md:px-10 md:py-5 font-black text-lg md:text-xl retro-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase text-center sm:text-left"
            >
              Contato
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
