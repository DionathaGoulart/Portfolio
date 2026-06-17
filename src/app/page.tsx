"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export default function HubPage() {
  return (
    <main className="selection:bg-accent selection:text-white pt-24 pb-12 px-4 md:px-6 overflow-x-hidden">
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Side: Brand & Intro */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-6 space-y-6 md:space-y-8"
        >
          <div className="retro-border bg-accent p-4 md:p-6 retro-shadow inline-block w-full sm:w-auto">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              DIONATHA <br /> GOULART
            </h1>
          </div>
          <div className="retro-border bg-card p-6 md:p-8 retro-shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black italic">Sistemas de Ponta a Ponta.</h2>
            <p className="text-base sm:text-lg md:text-xl font-bold opacity-70">
              Especialista em Engenharia de Software e Operações de TI. Escolha um caminho para explorar minha expertise técnica.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Persona Switcher */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-6 grid gap-6 md:gap-8"
        >
          <Link href="/dev" className="group">
            <div className="retro-border bg-card p-6 sm:p-10 retro-shadow-sm group-hover:retro-shadow transition-all transform group-hover:-rotate-2 group-hover:bg-[var(--hub-dev-hover)] group-hover:text-white">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <span className="text-4xl sm:text-5xl">🚀</span>
                <span className="font-mono text-[10px] sm:text-sm font-black opacity-40 group-hover:opacity-100">01_SOFTWARE_ENG</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tighter mb-2 italic underline decoration-4 underline-offset-4">DEV PORTFOLIO</h3>
              <p className="text-base sm:text-lg font-bold opacity-70 group-hover:opacity-100">SaaS, Next.js, Fullstack, UX Premium</p>
            </div>
          </Link>

          <Link href="/ti" className="group">
            <div className="retro-border bg-card p-6 sm:p-10 retro-shadow-sm group-hover:retro-shadow transition-all transform group-hover:rotate-2 group-hover:bg-[var(--hub-ti-hover)] group-hover:text-white">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <span className="text-4xl sm:text-5xl">⚙️</span>
                <span className="font-mono text-[10px] sm:text-sm font-black opacity-40 group-hover:opacity-100">02_IT_OPERATIONS</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tighter mb-2 italic underline decoration-4 underline-offset-4">OPS PORTFOLIO</h3>
              <p className="text-base sm:text-lg font-bold opacity-70 group-hover:opacity-100">Infra, Redes, Automação, Suporte N2</p>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Footer Decoration */}
      <div className="max-w-6xl mx-auto mt-12 md:mt-20 flex flex-wrap gap-4 sm:gap-8 justify-center">
        {['LinkedIn', 'GitHub', 'Email'].map((social) => (
          <Link 
            key={social}
            href={social === 'Email' ? 'mailto:dionatha.work@gmail.com' : `https://${social.toLowerCase()}.com/in/dionathagoulart`}
            className="retro-border bg-background px-4 py-2 sm:px-6 sm:py-3 font-black text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all"
          >
            {social}
          </Link>
        ))}
      </div>
    </main>
  );
}
