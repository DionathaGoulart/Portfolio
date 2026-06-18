"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { tiContent } from "@/data/ti-config";
import { Header } from "@/components/shared/Header";
import { TypingText } from "@/components/shared/TypingText";

export default function TiPageClient() {
  const terminalRef = useRef(null);
  const sections = tiContent.sections;

  return (
    <main className="selection:bg-accent selection:text-white font-mono overflow-x-hidden">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20 pt-28 md:pt-32">
        {/* Hero / Terminal Intro */}
        {sections.hero.enabled && (
          <section className="space-y-6 md:space-y-8 mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <p className="opacity-40 tracking-tighter text-xs md:text-sm">$ WHOAMI --ROLE</p>
              <div className="relative">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black opacity-0 pointer-events-none select-none uppercase leading-tight">
                  {tiContent.role}
                </h1>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-accent leading-tight uppercase terminal-glow absolute top-0 left-0">
                  <TypingText text={tiContent.role} speed={70} />
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
                STATUS: ACTIVE<br />
                SOURCE: DG_OS
              </div>
              
              <div className="leading-relaxed text-base md:text-lg relative z-10 flex gap-2">
                <span className="text-accent font-bold">{">"}</span>
                <p>{tiContent.hero.description}</p>
              </div>
            </motion.div>
          </section>
        )}

        {/* Expertise Matrix / About */}
        {sections.about.enabled && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:mb-24" id="about">
            <div>
              <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-wider flex items-center gap-2">
                <span className="text-xs opacity-40">01.</span> core_expertise
              </h2>
              <div className="space-y-6">
                {tiContent.skills.map((skill, i) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="flex justify-between mb-2 text-xs md:text-sm font-bold tracking-widest uppercase">
                      <span>{skill.name}</span>
                      <span className="text-accent">{skill.level}%</span>
                    </div>
                    <div className="h-2 border border-accent/20 w-full overflow-hidden p-0.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        className="h-full bg-accent shadow-[0_0_15px_var(--accent)]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-wider flex items-center gap-2" id="experience">
                <span className="text-xs opacity-40">02.</span> operational_history
              </h2>
              <div className="space-y-8">
                {tiContent.experience.map((exp, i) => (
                  <motion.div 
                    key={exp.company}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-l-2 border-accent/30 pl-4 md:pl-6 relative group"
                  >
                    <div className="absolute -left-[6px] top-2 w-2.5 h-2.5 bg-accent shadow-[0_0_10px_var(--accent)]" />
                    <span className="text-[10px] md:text-xs opacity-40 mb-1 block font-bold tracking-widest uppercase">[{exp.period}]</span>
                    <h3 className="text-base md:text-lg font-black text-accent uppercase group-hover:terminal-glow transition-all">{exp.role}</h3>
                    <p className="text-xs md:text-sm opacity-70 mb-2 font-bold uppercase tracking-tighter">{exp.company}</p>
                    <p className="text-xs md:text-sm opacity-60 leading-relaxed border-t border-accent/10 pt-2">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TI Projects */}
        {sections.projects.enabled && (
          <section className="mb-16 md:mb-24" id="projects">
            <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-wider flex items-center gap-2">
              <span className="text-xs opacity-40">03.</span> projects_repo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tiContent.projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 border border-accent/20 bg-accent/5 hover:border-accent/50 transition-colors group"
                >
                  <h3 className="text-xl font-black text-accent mb-2 uppercase">{project.title}</h3>
                  <p className="text-sm opacity-70 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] border border-accent/20 px-2 py-0.5 text-accent opacity-60 group-hover:opacity-100 transition-opacity">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {sections.contact.enabled && (
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
                    {tiContent.contact.title}
                  </h2>
                  <p className="text-sm md:text-base opacity-60 max-w-2xl font-bold uppercase leading-tight">
                    {tiContent.contact.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {tiContent.contact.socials.map((social) => (
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
        )}

        {/* Footer / System Status */}
        <footer className="pt-12 md:pt-16 border-t border-border-custom/10 text-[8px] md:text-[10px] opacity-30 flex flex-wrap justify-between gap-4 uppercase tracking-[0.2em]">
          <span>© 2026 DG_OS_V1.0</span>
          <span className="hidden sm:inline">ENC: AES-256-GCM</span>
          <span>LAT: -29.9961 / LONG: -51.0858</span>
        </footer>
      </div>
    </main>
  );
}
