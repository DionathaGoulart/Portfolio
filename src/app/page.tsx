"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { TypingText } from '@/components/shared/TypingText';
import { Logo } from '@/components/shared/Logo';
import Image from 'next/image';
import { hubContent } from '@/data/hub-config';

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const GmailIcon = ({ size = 20 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z"/>
  </svg>
);

const iconMap = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  whatsapp: WhatsAppIcon,
  gmail: GmailIcon,
};

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
