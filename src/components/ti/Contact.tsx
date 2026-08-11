"use client";
import { motion } from "framer-motion";
import { tiContent } from "@/data/ti-config";
import { SocialLinks } from "@/components/shared/SocialLinks";

export default function Contact() {
  return (
    <section className="py-20 md:py-32" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="retro-border bg-base-200 retro-shadow relative overflow-hidden"
      >
        {/* Decorative accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

        <div className="p-8 sm:p-10 md:p-16 lg:p-20">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <span className="font-mono text-accent text-xs sm:text-sm uppercase tracking-widest font-bold mb-4 block">
              {">"} {tiContent.ui.contactPrompt}
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
              {tiContent.contact.title.split("?")[0]}
              {tiContent.contact.title.includes("?") && <span className="text-accent">?</span>}
            </h2>
            <p className="mt-6 text-base sm:text-lg md:text-xl font-medium text-base-content/60 max-w-2xl leading-relaxed">
              {tiContent.contact.description}
            </p>
          </div>

          <SocialLinks socials={tiContent.contact.socials} variant="grid" />

          {/* Footer line */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-base-300/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-base-content/30">
              {tiContent.ui.contactFooterText}
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-base-content/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {tiContent.ui.contactStatus}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
