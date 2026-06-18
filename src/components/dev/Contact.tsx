"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";

export default function Contact() {
  return (
    <section className="mb-16 md:mb-24" id="contact">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border border-accent/30 bg-accent/5 p-1"
      >
        <div className="bg-accent text-white p-2 font-black uppercase text-xs tracking-widest mb-1">
          {">"} ESTABLISH_COMMUNICATION_PROTOCOL
        </div>

        <div className="p-6 md:p-12 space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-6xl font-black text-accent uppercase terminal-glow">
              {devContent.contact.title}
            </h2>
            <p className="text-sm md:text-base opacity-60 max-w-2xl font-bold uppercase leading-tight">
              {devContent.contact.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {devContent.contact.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="border border-accent/30 p-4 font-black text-sm md:text-base hover:bg-accent hover:text-white transition-all text-center uppercase tracking-widest"
              >
                [{social.name}]
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-accent/10">
            <p className="text-[8px] md:text-[10px] opacity-30 uppercase tracking-[0.4em]">
              Status: listening for incoming packets...
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
