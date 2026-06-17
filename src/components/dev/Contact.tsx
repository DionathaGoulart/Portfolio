"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/config";

export default function Contact() {
  return (
    <section className="py-32" id="contact">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="retro-border bg-card p-1 md:p-2 retro-shadow"
      >
        {/* Section Header Bar */}
        <div className="bg-accent text-white p-4 retro-border mb-1 flex justify-between items-center">
          <span className="font-black italic tracking-tighter text-xl uppercase italic">Contact_Terminal</span>
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-white" />
            <div className="w-4 h-4 rounded-full border-2 border-white bg-white" />
          </div>
        </div>

        <div className="p-8 md:p-16 text-left space-y-12">
          <div className="space-y-4 text-left">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
              VAMOS <br /> <span className="text-accent">CONVERSAR?</span>
            </h2>
            <p className="text-xl md:text-2xl font-bold opacity-70 max-w-xl leading-tight uppercase">
              {devContent.contact.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {devContent.contact.socials.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                className="retro-border bg-background p-6 font-black text-xl hover:bg-accent hover:text-white transition-all hover:-translate-y-2 hover:retro-shadow-sm active:translate-y-0 text-center"
              >
                {social.name.toUpperCase()}
              </a>
            ))}
          </div>

          <div className="pt-8 flex flex-col items-start gap-4">
            <div className="w-full h-px bg-border-custom opacity-20" />
            <p className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-40">
              Connection established • Secure protocol active
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
