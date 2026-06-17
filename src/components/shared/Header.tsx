"use client";
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] p-4 md:p-6 pointer-events-none">
      <nav className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        <Link href="/" className="retro-border bg-card p-3 retro-shadow-sm group">
          <span className="font-black text-2xl tracking-tighter group-hover:text-accent transition-colors">DG.</span>
        </Link>
        
        <div className="flex gap-4">
          <div className="hidden md:flex retro-border bg-card p-1 retro-shadow-sm">
            <Link href="/dev" className="px-4 py-2 hover:bg-accent hover:text-white transition-all font-bold">Dev</Link>
            <Link href="/ti" className="px-4 py-2 hover:bg-[#10b981] hover:text-white transition-all font-bold">IT Ops</Link>
          </div>
          <div className="retro-border bg-card p-1 retro-shadow-sm flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
