import { motion } from "framer-motion";
import { tiContent } from "@/data/ti-config";
import Image from "next/image";
import { Logo } from "@/components/shared/Logo";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center py-12 md:py-20 relative overflow-x-hidden">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="retro-border bg-card p-6 sm:p-8 md:p-12 lg:p-16 retro-shadow relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-accent rotate-45 translate-x-8 -translate-y-8" />
          
          {/* Left: Text Content */}
          <div className="flex-1 order-2 lg:order-1 w-full z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
              <span className="font-mono text-accent font-bold uppercase tracking-widest mb-4 md:mb-6 block text-xs sm:text-base">
                {">"} {tiContent.role}
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black mb-6 leading-[1.1] md:leading-[1.05] tracking-tighter uppercase">
                {tiContent.hero.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl font-medium text-foreground/70 max-w-2xl mb-8 md:mb-10 leading-relaxed">
                {tiContent.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="retro-border bg-accent text-white px-8 py-3.5 md:py-4 font-black text-sm md:text-base hover:bg-foreground transition-colors uppercase text-center"
                >
                  {tiContent.ui?.heroProjectsButton || "Inicializar Projetos"}
                </a>
                <a
                  href="#contact"
                  className="retro-border border-2 border-accent bg-transparent text-foreground hover:bg-accent hover:text-white px-8 py-3.5 md:py-4 font-black text-sm md:text-base transition-colors uppercase text-center"
                >
                  {tiContent.ui?.heroContactButton || "Abrir Conexão"}
                </a>
              </div>
            </div>

            {/* Right: Radar/Avatar Profile */}
            <div className="order-1 lg:order-2 shrink-0 relative group w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              
              {/* Outer Decorative Ring */}
              <div className="absolute inset-0 border-2 border-dashed border-accent/20 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-4 border border-accent/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              
              {/* Spinning Logo Background */}
              <div className="absolute inset-8 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                <Logo className="w-full h-full text-accent animate-[spin_30s_linear_infinite]" />
              </div>

              {/* Center Image Container */}
              <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full border-4 border-accent/20 bg-card overflow-hidden z-10 group-hover:border-accent/60 transition-colors duration-500 shadow-[0_0_30px_rgba(var(--color-accent),0.1)] group-hover:shadow-[0_0_50px_rgba(var(--color-accent),0.2)]">
                <Image 
                  src="/me.png" 
                  alt={tiContent.name} 
                  fill 
                  className="object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                />
              </div>

              {/* Overlay Tags */}
              <div className="absolute top-4 right-4 z-20 retro-border bg-background px-2 py-1 text-[10px] font-mono text-accent shadow-sm translate-x-4">
                {tiContent.hero.badges?.[0] || "LVL: 99"}
              </div>
              <div className="absolute bottom-8 -left-4 z-20 retro-border bg-background px-2 py-1 text-[10px] font-mono text-accent shadow-sm -translate-x-2">
                {tiContent.hero.badges?.[1] || "OPS_READY"}
              </div>

            </div>
        </motion.div>
      </div>
    </section>
  );
}
