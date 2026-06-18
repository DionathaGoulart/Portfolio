"use client";
import Link from "next/link";
import { ThemeToggle } from "../shared/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../shared/Logo";
import { PrintButton } from "../shared/PrintButton";
import { devContent } from "@/data/dev-config";
import { useNavigation } from "@/hooks/useNavigation";

export function Header({ cvContent }: { cvContent?: string }) {
  const { isMenuOpen, setIsMenuOpen, isCV, scrollToTop, navLinks } = useNavigation(devContent, "dev");

  return (
    <header className="fixed top-0 left-0 w-full z-[100] py-3 md:py-6 pointer-events-none">
      <div className="terminal-scanline" />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center pointer-events-auto">
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

          <div className="flex gap-2 md:gap-4 items-center overflow-hidden font-mono uppercase">
            <span className="text-border-custom/30 text-[10px] md:text-base">
              |
            </span>
            <span className="text-[9px] md:text-xs animate-pulse text-accent whitespace-nowrap flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{isCV ? "CV_SESSION_ACTIVE" : "SYS_ONLINE"}</span>
            </span>
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
            {isMenuOpen ? "[CLOSE]" : "[MENU]"}
          </button>

          <div className="flex items-center">
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
            className="absolute top-full left-0 w-full px-4 pt-2 pointer-events-auto lg:hidden"
          >
            <div className="border border-accent/50 bg-background/95 backdrop-blur p-6 flex flex-col gap-4 font-mono">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-accent text-lg uppercase flex items-center gap-3 group"
                >
                  <span className="opacity-40 group-hover:opacity-100">
                    {">"}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
