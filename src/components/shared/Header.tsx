"use client";
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

import { Logo } from './Logo';
import { PrintButton } from './PrintButton';

export function Header({ cvContent }: { cvContent?: string }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (pathname === '/') return null;

  const isDev = pathname.startsWith('/dev');
  const isTi = pathname.startsWith('/ti');
  const isCV = pathname.includes('/cv');

  const scrollToTop = (e: React.MouseEvent) => {
    if (pathname === '/dev' || pathname === '/ti') {
      if (!isCV) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { href: "/dev#about", label: "Sobre", scroll: true },
    { href: "/dev#projects", label: "Projetos", scroll: true },
    { href: "/dev#experience", label: "Experiência", scroll: true },
    { href: "/dev#contact", label: "Contato", scroll: true },
    { href: "/dev/cv", label: "Currículo", scroll: false },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] py-3 md:py-6 pointer-events-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-4">
          <Link 
            href={isDev ? "/dev" : (isTi ? "/ti" : "/")} 
            onClick={scrollToTop}
            className="retro-border bg-card p-1 retro-shadow-sm group flex items-center justify-center min-w-[42px] min-h-[42px] hover:bg-accent transition-all duration-200"
          >
            <Logo 
              className="w-7 h-7 md:w-9 md:h-9 text-foreground group-hover:text-white transition-all duration-200"
            />
          </Link>
          
          {isDev && isCV && (
            <div className="hidden sm:block">
              <PrintButton persona="DEV" content={cvContent} />
            </div>
          )}

          {isTi && (
            <div className="flex gap-2 md:gap-4 items-center overflow-hidden font-mono">
              <span className="text-border-custom/30 text-[10px] md:text-base">|</span>
              <Link href="/" className="flex items-center group hover:bg-accent transition-colors px-1">
                <span className="group-hover:text-white transition-colors text-[10px] sm:text-xs md:text-base whitespace-nowrap opacity-70 group-hover:opacity-100">
                  ~/home
                </span>
              </Link>
              <span className="text-border-custom/30 text-[10px] md:text-base">|</span>
              <span className="text-[9px] md:text-xs animate-pulse text-accent whitespace-nowrap flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{isCV ? "CV_SESSION_ACTIVE" : "SYSTEM_ONLINE"}</span>
              </span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 md:gap-4 items-center">
          {/* Desktop Nav */}
          {isDev && (
            <div className="hidden lg:flex retro-border bg-card p-1 retro-shadow-sm">
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
          )}

          {/* Mobile Menu Button (Only for Dev portfolio) */}
          {isDev && (
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden retro-border bg-card p-2 md:p-3 retro-shadow-sm font-black text-sm uppercase tracking-tighter"
            >
              {isMenuOpen ? "Fechar" : "Menu"}
            </button>
          )}

          <div className="retro-border bg-card p-1 sm:p-1.5 md:p-1 retro-shadow-sm flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isDev && isMenuOpen && (
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
