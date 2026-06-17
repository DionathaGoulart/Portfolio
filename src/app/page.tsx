"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/shared/Header';

export default function HubPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-accent selection:text-white pt-24 pb-12 px-6">
      <Header />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Brand & Intro */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-6 space-y-8"
        >
          <div className="retro-border bg-accent p-6 retro-shadow inline-block">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              DIONATHA <br /> GOULART
            </h1>
          </div>
          <div className="retro-border bg-card p-8 retro-shadow-sm space-y-4">
            <h2 className="text-2xl md:text-3xl font-black italic">Sistemas de Ponta a Ponta.</h2>
            <p className="text-lg md:text-xl font-bold opacity-70">
              Especialista em Engenharia de Software e Operações de TI. Escolha um caminho para explorar minha expertise técnica.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Persona Switcher */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-6 grid gap-8"
        >
          <Link href="/dev" className="group">
            <div className="retro-border bg-card p-10 retro-shadow-sm group-hover:retro-shadow group-hover:bg-accent group-hover:text-white transition-all transform group-hover:-rotate-2">
              <div className="flex justify-between items-center mb-6">
                <span className="text-5xl">🚀</span>
                <span className="font-mono text-sm font-black opacity-40 group-hover:opacity-100">01_SOFTWARE_ENG</span>
              </div>
              <h3 className="text-4xl font-black tracking-tighter mb-2 italic underline decoration-4 underline-offset-4">DEV PORTFOLIO</h3>
              <p className="text-lg font-bold opacity-70 group-hover:opacity-100">SaaS, Next.js, Fullstack, UX Premium</p>
            </div>
          </Link>

          <Link href="/ti" className="group">
            <div className="retro-border bg-card p-10 retro-shadow-sm group-hover:retro-shadow group-hover:bg-[#10b981] group-hover:text-white transition-all transform group-hover:rotate-2">
              <div className="flex justify-between items-center mb-6">
                <span className="text-5xl">⚙️</span>
                <span className="font-mono text-sm font-black opacity-40 group-hover:opacity-100">02_IT_OPERATIONS</span>
              </div>
              <h3 className="text-4xl font-black tracking-tighter mb-2 italic underline decoration-4 underline-offset-4">OPS PORTFOLIO</h3>
              <p className="text-lg font-bold opacity-70 group-hover:opacity-100">Infra, Redes, Automação, Suporte N2</p>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Footer Decoration */}
      <div className="max-w-6xl mx-auto mt-20 flex flex-wrap gap-8 justify-center">
        {['LinkedIn', 'GitHub', 'Email'].map((social) => (
          <Link 
            key={social}
            href={social === 'Email' ? 'mailto:dionatha.work@gmail.com' : `https://${social.toLowerCase()}.com/in/dionathagoulart`}
            className="retro-border bg-background px-6 py-3 font-black text-sm uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all"
          >
            {social}
          </Link>
        ))}
      </div>
    </main>
  );
}