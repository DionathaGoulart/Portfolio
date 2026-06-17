"use client";
import { motion } from "framer-motion";
import { devContent } from "@/data/config";

export default function About() {
  return (
    <section className="py-32" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="inline-block retro-border bg-accent px-6 py-2 text-white font-black text-xl retro-shadow-sm mb-4 uppercase">
            Sobre
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            Transformando ideias em <span className="text-accent underline decoration-8">Sistemas Reais.</span>
          </h2>
          <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-80">
            {devContent.about.text}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="retro-border bg-card p-8 retro-shadow-sm h-full">
            <h3 className="font-black text-2xl mb-8 border-b-2 border-border-custom pb-4 uppercase tracking-tighter italic">Stack_Principal</h3>
            <div className="flex flex-wrap gap-3">
              {devContent.about.stacks.map((stack) => (
                <div key={stack.name} className="retro-border bg-background px-4 py-2 font-bold text-sm">
                  {stack.name}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
