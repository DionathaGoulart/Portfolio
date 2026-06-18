"use client";
import { motion } from "framer-motion";
import { tiContent } from "@/data/ti-config";
import { SocialLinks } from "../shared/SocialLinks";

export default function Contact() {
  return (
    <section className="py-20 md:py-32" id="contact">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="retro-border bg-card p-1 md:p-2 retro-shadow"
      >
        {/* Section Header Bar */}
        <div className="bg-accent text-white p-3 md:p-4 retro-border mb-1 flex justify-between items-center">
          <span className="font-black italic tracking-tighter text-lg md:text-xl uppercase">
            Contact_Terminal
          </span>
          <div className="flex gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white bg-white" />
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-16 text-left space-y-8 md:space-y-12">
          <div className="space-y-4 text-left">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
              {tiContent.contact.title.split('?')[0]} <br /> <span className="text-accent">{tiContent.contact.title.includes('?') ? tiContent.contact.title.split('?')[1] || '?' : ''}</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-bold opacity-70 max-w-xl leading-tight uppercase">
              {tiContent.contact.description}
            </p>
          </div>

          <SocialLinks socials={tiContent.contact.socials} variant="retro" className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6" />

          <div className="pt-6 md:pt-8 flex flex-col items-start gap-4">
            <div className="w-full h-px bg-border-custom opacity-20" />
            <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-40">
              Connection established • Secure protocol active
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
