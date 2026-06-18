"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { TypingText } from '@/components/shared/TypingText';
import { Logo } from '@/components/shared/Logo';
import Image from 'next/image';
import { hubContent } from '@/data/hub-config';

import { iconMap } from '@/components/shared/Icons';

export default function HubPage() {
  return (
    <main className="selection:bg-accent selection:text-white min-h-screen flex flex-col justify-center py-12 px-4 md:px-6 overflow-x-hidden relative">
      {/* Background Terminal Scanline (Hybrid) */}
      <div className="terminal-scanline opacity-10" />

      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex gap-4 items-center">
        <div className="hidden md:flex flex-col items-end font-mono text-[8px] opacity-40 uppercase tracking-widest">
          <span>Session: active</span>
          <span>Access: full_root</span>
        </div>
        <ThemeToggle />
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Brand & Intro */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="flex flex-col md:flex-row gap-6 md:items-end">
            {/* Profile Photo Container with Logo Background */}
            <div className="relative group shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 retro-border bg-card overflow-hidden retro-shadow-sm group-hover:retro-shadow transition-all relative flex items-center justify-center">
                {/* Logo Background */}
                <div className="absolute inset-0 flex items-center justify-center p-4 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
                  <Logo className="w-full h-full text-accent" />
                </div>

                {/* Profile Image (Cut-out) */}
                <Image 
                  src={hubContent.profileImage} 
                  alt={hubContent.name} 
                  fill 
                  className="object-cover z-10 grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
                
                {/* Terminal overlay on photo */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex flex-col justify-end p-2 font-mono text-[8px] text-white z-20">
                  <span className="bg-accent px-1 w-fit">SYNC_COMPLETE</span>
                </div>
              </div>
              {/* Decorative corner */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-accent" />
            </div>

            <div className="retro-border bg-accent p-6 md:p-8 retro-shadow inline-block flex-1">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic whitespace-pre-line">
                {hubContent.name.replace(' ', ' \n ')}
              </h1>
            </div>
          </div>
          
          <div className="retro-border bg-card p-6 md:p-8 retro-shadow-sm space-y-4 relative overflow-hidden">
            {/* Terminal hint */}
            <div className="absolute top-0 right-0 p-2 font-mono text-[10px] opacity-10 select-none uppercase">
              // system_manifest_v2.0
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic text-accent flex items-center gap-2">
              <span className="text-xl opacity-40 font-mono not-italic">{">"}</span>
              <TypingText text={hubContent.typingText} speed={70} />
            </h2>
            <p className="text-lg sm:text-xl font-bold opacity-70 leading-tight max-w-2xl uppercase tracking-tighter">
              {hubContent.description}
            </p>
          </div>
        </motion.div>

        {/* Right Side: Persona Switcher */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 grid gap-6 md:gap-8"
        >
          {Object.entries(hubContent.sections).map(([key, section]) => (
            <Link key={key} href={section.href} className="group">
              <div 
                className="retro-border bg-card p-1 retro-shadow-sm group-hover:retro-shadow transition-all transform group-hover:-translate-y-2 relative overflow-hidden group-hover:text-white"
                style={{ '--hub-hover-bg': section.hoverColor } as React.CSSProperties}
              >
                {/* Terminal Title Bar */}
                <div className="bg-accent text-white px-3 py-1.5 flex justify-between items-center mb-1 group-hover:bg-white transition-colors">
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:text-[var(--hub-hover-bg)]">
                    <Logo className="w-3 h-3 text-white group-hover:text-[var(--hub-hover-bg)]" />
                    {section.subtitle}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full border border-white group-hover:border-[var(--hub-hover-bg)]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-[var(--hub-hover-bg)]" />
                  </div>
                </div>

                <div className="p-5 sm:p-7 space-y-4 font-mono group-hover:bg-[var(--hub-hover-bg)] transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-bold group-hover:text-white">{key === 'dev' ? '$' : '>'}</span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase italic leading-none mb-1">
                        {section.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold opacity-60 uppercase leading-tight group-hover:opacity-100">
                        {section.tags}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-accent/10 group-hover:border-white/20 flex justify-between items-center opacity-40 group-hover:opacity-100">
                    <span className="text-[9px] uppercase tracking-widest bg-accent/10 group-hover:bg-white/20 px-2 py-0.5 rounded text-accent group-hover:text-white">{section.status}</span>
                    <span className="text-xs font-black">{section.action}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Footer Decoration */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-24 w-full flex flex-col md:flex-row justify-between items-center gap-8 border-t-2 border-border-custom/10 pt-12 relative z-10">
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
          {hubContent.socials.map((social) => {
            const Icon = iconMap[social.type as keyof typeof iconMap];
            return (
              <Link 
                key={social.name}
                href={social.url}
                className="retro-border bg-card p-3 sm:p-4 hover:bg-accent hover:text-white transition-all relative group retro-shadow-sm hover:retro-shadow-sm hover:-translate-y-1 active:translate-y-0 text-foreground"
                title={social.name}
              >
                <Icon size={20} />
                
                {/* Tooltip style label */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap retro-border">
                  {social.name}
                </span>
              </Link>
            );
          })}
        </div>
        
        <div className="font-mono text-[10px] opacity-30 uppercase tracking-[0.2em] text-center md:text-right text-foreground">
          {hubContent.footer.core} // {hubContent.footer.build}<br />
          {hubContent.footer.root}
        </div>
      </div>
    </main>
  );
}
