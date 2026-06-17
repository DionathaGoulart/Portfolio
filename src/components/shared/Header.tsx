"use client";
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;

  const isDev = pathname.startsWith('/dev');

  const scrollToTop = (e: React.MouseEvent) => {
    if (pathname === '/dev' || pathname === '/ti') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] py-4 md:py-6 pointer-events-none">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center pointer-events-auto">
        <Link 
          href={isDev ? "/dev" : "/ti"} 
          onClick={scrollToTop}
          className="retro-border bg-card p-3 retro-shadow-sm group"
        >
          <span className="font-black text-2xl tracking-tighter group-hover:text-accent transition-colors">DG.</span>
        </Link>
        
        <div className="flex gap-4 items-center">
          {isDev && (
            <div className="hidden lg:flex retro-border bg-card p-1 retro-shadow-sm">
              <a href="#about" className="px-4 py-2 hover:bg-accent hover:text-white transition-all font-bold text-sm uppercase tracking-tighter">Sobre</a>
              <a href="#projects" className="px-4 py-2 hover:bg-accent hover:text-white transition-all font-bold text-sm uppercase tracking-tighter">Projetos</a>
              <a href="#experience" className="px-4 py-2 hover:bg-accent hover:text-white transition-all font-bold text-sm uppercase tracking-tighter">Experiência</a>
              <a href="#contact" className="px-4 py-2 hover:bg-accent hover:text-white transition-all font-bold text-sm uppercase tracking-tighter">Contato</a>
            </div>
          )}

          <div className="retro-border bg-card p-1 retro-shadow-sm flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
