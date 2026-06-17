"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/config";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-20 relative">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="retro-border bg-card p-8 md:p-16 retro-shadow relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-accent rotate-45 translate-x-8 -translate-y-8" />
          
          <span className="font-mono text-accent font-bold uppercase tracking-widest mb-6 block">
            {">"} {devContent.role}
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            {devContent.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl font-medium text-foreground/80 max-w-2xl mb-12">
            {devContent.hero.description}
          </p>
          
          <div className="flex flex-wrap gap-6 text-left">
            <a href="#projects" className="retro-border bg-accent text-white px-10 py-5 font-black text-xl retro-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase">
              Projetos
            </a>
            <a href="#contact" className="retro-border bg-background px-10 py-5 font-black text-xl retro-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase">
              Contato
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
