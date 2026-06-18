"use client";
import Link from "next/link";
import { ThemeToggle } from "../shared/ThemeToggle";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../shared/Logo";
import { PrintButton } from "../shared/PrintButton";
import { tiContent } from "@/data/ti-config";

export function Header({ cvContent }: { cvContent?: string }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isCV = pathname.includes("/cv");

  const scrollToTop = (e: React.MouseEvent) => {
    if (!isCV) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    {
      id: "about",
      href: "/ti#about",
      label: "Sobre",
      scroll: true,
      enabled: tiContent.sections.about.enabled,
    },
    {
      id: "projects",
      href: "/ti#projects",
      label: "Projetos",
      scroll: true,
      enabled: tiContent.sections.projects.enabled,
    },
    {
      id: "experience",
      href: "/ti#experience",
      label: "Experiência",
      scroll: true,
      enabled: tiContent.sections.experience.enabled,
    },
    {
      id: "contact",
      href: "/ti#contact",
      label: "Contato",
      scroll: true,
      enabled: tiContent.sections.contact.enabled,
    },
    {
      id: "cv",
      href: "/ti/cv",
      label: "Currículo",
      scroll: false,
      enabled: true,
    },
  ].filter((link) => link.enabled);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] py-3 md:py-6 pointer-events-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-4">
          <Link
            href="/ti"
            onClick={scrollToTop}
            className="retro-border bg-card p-1 retro-shadow-sm group flex items-center justify-center min-w-[42px] min-h-[42px] hover:bg-accent transition-all duration-200"
          >
            <Logo className="w-7 h-7 md:w-9 md:h-9 text-foreground group-hover:text-white transition-all duration-200" />
          </Link>

          {isCV && (
            <div className="hidden sm:block">
              <PrintButton persona="TI" content={cvContent} />
            </div>
          )}
        </div>

        <div className="flex gap-2 md:gap-4 items-center">
          <div className="hidden lg:flex items-center">
            <div className="retro-border bg-card p-1 retro-shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 hover:bg-accent hover:text-white transition-all font-bold text-sm uppercase tracking-tighter"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden retro-border bg-card p-2 md:p-3 retro-shadow-sm font-black text-sm uppercase tracking-tighter"
          >
            {isMenuOpen ? "Fechar" : "Menu"}
          </button>

          <div className="retro-border bg-card p-1 sm:p-1.5 md:p-1 retro-shadow-sm flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full px-4 pt-2 pointer-events-auto lg:hidden"
          >
            <div className="retro-border bg-card p-4 retro-shadow-sm flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="retro-border bg-background p-4 font-black text-base uppercase tracking-widest hover:bg-accent hover:text-white transition-all text-center"
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
