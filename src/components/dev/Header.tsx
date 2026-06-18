"use client";
import Link from "next/link";
import { ThemeToggle } from "../shared/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../shared/Logo";
import { PrintButton } from "../shared/PrintButton";
import { devContent } from "@/data/dev-config";
import { useNavigation } from "@/hooks/useNavigation";
import { useDevMode } from "@/context/DevModeContext";

export function Header({ cvContent }: { cvContent?: string }) {
  const { isMenuOpen, setIsMenuOpen, isCV, scrollToTop, navLinks } = useNavigation(devContent, "dev");
  const { mode, toggleMode } = useDevMode();

  return (
    <header className="fixed top-0 left-0 w-full z-[100] py-3 md:py-6 pointer-events-none">
      <div className="terminal-scanline" />
      <nav className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-4">
          <Link
            href="/dev"
            onClick={scrollToTop}
            className="font-mono font-bold text-accent hover:bg-accent hover:text-white px-2 py-1 transition-colors flex items-center gap-2 group"
          >
            <span className="flex items-center gap-1.5">
              <Logo className="w-4 h-4 text-accent group-hover:text-white" />
              <span className="hidden sm:inline">@SYSTEM:</span>
              <span className="sm:hidden">@SYS:</span>
              <span className="text-foreground group-hover:text-white">
                ~ $
              </span>
              <span className="terminal-cursor group-hover:bg-white" />
            </span>
          </Link>

          {isCV && (
            <div className="hidden sm:block">
              <PrintButton persona="DEV" content={cvContent} />
            </div>
          )}

          <div className="hidden lg:flex gap-2 md:gap-4 items-center overflow-hidden font-mono uppercase">
            <span className="text-border-custom/30 text-[10px] md:text-base">|</span>
            {isCV ? (
              <span className="text-[9px] md:text-xs animate-pulse text-accent whitespace-nowrap flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>CV_SESSION_ACTIVE</span>
              </span>
            ) : (
              <button
                onClick={toggleMode}
                title={mode === "graphic" ? "Entrar no modo terminal" : "Voltar ao modo gráfico"}
                className="group flex items-center gap-1.5 border border-accent/30 px-2 py-1 text-[9px] md:text-[10px] font-black tracking-wider hover:bg-accent hover:text-white transition-all"
              >
                {mode === "graphic" ? (
                  <>
                    <span className="font-mono text-accent group-hover:text-white">▶_</span>
                    <span className="text-accent group-hover:text-white">TERMINAL</span>
                  </>
                ) : (
                  <>
                    <span className="font-mono text-accent group-hover:text-white">⊞</span>
                    <span className="text-accent group-hover:text-white">GRAPHIC</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2 md:gap-4 items-center">
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div className="flex gap-6 font-mono text-sm uppercase mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-accent transition-colors relative group"
                >
                  <span className="opacity-40 group-hover:opacity-100 mr-1">
                    {">"}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden font-mono text-xs uppercase border border-accent/30 px-3 py-2 text-accent"
          >
            {isMenuOpen ? "[ X ]" : "[MENU]"}
          </button>

          <div className="hidden lg:flex items-center">
            <ThemeToggle isTerminal={true} />
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 w-full h-[100dvh] bg-background/95 backdrop-blur-md pointer-events-auto lg:hidden flex flex-col pt-16 pb-6 px-6 z-40"
          >
            <div className="flex flex-col gap-4 font-mono h-full overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-accent text-xl uppercase flex items-center gap-3 group border-b border-accent/20 pb-3"
                >
                  <span className="opacity-40 group-hover:opacity-100">
                    {">"}
                  </span>
                  {link.label}
                </Link>
              ))}

              <div className="mt-auto flex flex-col gap-3 pt-4">
                {!isCV && (
                  <button
                    onClick={() => { toggleMode(); setIsMenuOpen(false); }}
                    className="flex items-center justify-center gap-3 border border-accent/30 px-4 py-3 text-sm font-black tracking-wider text-accent hover:bg-accent hover:text-white transition-all w-full"
                  >
                    {mode === "graphic" ? (
                      <>
                        <span className="font-mono">▶_</span>
                        <span>IR PARA O TERMINAL</span>
                      </>
                    ) : (
                      <>
                        <span className="font-mono">⊞</span>
                        <span>IR PARA O GRÁFICO</span>
                      </>
                    )}
                  </button>
                )}
                <div className="flex justify-between items-center border border-accent/30 px-4 py-3 text-sm">
                  <span className="text-accent uppercase tracking-widest font-black">THEME</span>
                  <ThemeToggle isTerminal={true} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
