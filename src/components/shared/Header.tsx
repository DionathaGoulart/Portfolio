"use client";
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (pathname === '/') return null;

  const isDev = pathname.startsWith('/dev');
  const isTi = pathname.startsWith('/ti');

  const scrollToTop = (e: React.MouseEvent) => {
    if (pathname === '/dev' || pathname === '/ti') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: "#about", label: "Sobre" },
    { href: "#projects", label: "Projetos" },
    { href: "#experience", label: "Experiência" },
    { href: "#contact", label: "Contato" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] py-4 md:py-6 pointer-events-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center pointer-events-auto">
        <Link 
          href={isDev ? "/dev" : (isTi ? "/ti" : "/")} 
          onClick={scrollToTop}
          className="retro-border bg-card p-2 md:p-3 retro-shadow-sm group"
        >
          <span className="font-black text-xl md:text-2xl tracking-tighter group-hover:text-accent transition-colors">DG.</span>
        </Link>
        
        <div className="flex gap-2 md:gap-4 items-center">
          {/* Desktop Nav */}
          {isDev && (
            <div className="hidden lg:flex retro-border bg-card p-1 retro-shadow-sm">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="px-4 py-2 hover:bg-accent hover:text-white transition-all font-bold text-sm uppercase tracking-tighter"
                >
                  {link.label}
                </a>
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
                <a 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="retro-border bg-background p-4 font-black text-base uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
