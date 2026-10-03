"use client";
import Link from "next/link";
import { RetroThemeToggle } from "../ui/RetroThemeToggle";
import { RetroSkinToggle } from "../ui/RetroSkinToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/shared/Logo";
import { PrintButton } from "@/components/shared/PrintButton";
import type { PersonaContent } from "@/types/content";
import { useNavigation } from "@/hooks/useNavigation";

export function Header({ content, cvContent }: { content: PersonaContent; cvContent?: string }) {
  const { isMenuOpen, setIsMenuOpen, isCV, scrollToTop, navLinks } = useNavigation(
    content,
    "retro"
  );

  return (
    <header className="fixed top-0 left-0 w-full z-[100] py-3 md:py-6 pointer-events-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-4">
          <Link
            href={`/${content.persona}`}
            onClick={scrollToTop}
            className="retro-border bg-base-200 p-1 retro-shadow-sm group flex items-center justify-center min-w-[42px] min-h-[42px] hover:bg-accent transition-all duration-200"
          >
            <Logo className="w-7 h-7 md:w-9 md:h-9 text-base-content group-hover:text-accent-content transition-all duration-200" />
          </Link>

          {isCV && (
            <div className="hidden sm:block">
              <PrintButton persona={content.persona} skin="retro" content={cvContent} />
            </div>
          )}
        </div>

        <div className="flex gap-2 md:gap-4 items-center">
          <div className="hidden lg:flex items-center">
            <div className="retro-border bg-base-200 p-1 retro-shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 hover:bg-accent hover:text-accent-content transition-all font-bold text-sm uppercase tracking-tighter"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="persona-mobile-menu"
            className="lg:hidden retro-border bg-base-200 p-2 md:p-3 retro-shadow-sm font-black text-sm uppercase tracking-tighter"
          >
            {isMenuOpen ? "Fechar" : "Menu"}
          </button>

          <div className="retro-border bg-base-200 p-1 sm:p-1.5 md:p-1 retro-shadow-sm flex items-center gap-1">
            <RetroSkinToggle />
            <RetroThemeToggle />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="persona-mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full px-4 pt-2 pointer-events-auto lg:hidden"
          >
            <div className="retro-border bg-base-200 p-4 retro-shadow-sm flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="retro-border bg-base-100 p-4 font-black text-base uppercase tracking-widest hover:bg-accent hover:text-accent-content transition-all text-center"
                >
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
