"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";
import { TypingText } from "@/components/shared/TypingText";

export default function Hero() {
  return (
    <section className="space-y-6 md:space-y-8 mb-16 md:mb-24">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-2"
      >
        <p className="opacity-40 tracking-tighter text-xs md:text-sm">
          $ WHOAMI --ROLE
        </p>
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black opacity-0 pointer-events-none select-none uppercase leading-tight">
            {devContent.role}
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-accent leading-tight uppercase terminal-glow absolute top-0 left-0">
            <TypingText text={devContent.role} speed={70} />
          </h1>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-6 md:p-8 border border-accent/20 bg-accent/5 relative overflow-hidden group max-w-4xl"
      >
        <div className="absolute top-0 right-0 p-2 opacity-10 font-mono text-[8px] select-none uppercase">
          STATUS: ACTIVE
          <br />
          SOURCE: DG_OS
        </div>

        <div className="leading-relaxed text-base md:text-lg relative z-10 flex gap-2">
          <span className="text-accent font-bold">{">"}</span>
          <p>{devContent.hero.description}</p>
        </div>
      </motion.div>
    </section>
  );
}
