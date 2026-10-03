"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { hubContent } from "@/data/hub-config";
import { parentPath } from "@/lib/utils";
import { TermModeSwitch } from "./TermModeSwitch";
import { TermSkinToggle } from "./TermSkinToggle";
import { TermShellToggle } from "./TermShellToggle";

/**
 * Header of the terminal pages outside the portfolio (/projetos...): prompt back to the
 * hub, a back button one level up, and the skin, mode and shell toggles.
 *
 * It used to repeat the hub's sections as `cd` targets, which on /projetos meant offering
 * the page you were already on. The page's own filter does that job now.
 */
export function TermTopBar() {
  const pathname = usePathname();
  const { nav } = hubContent;

  return (
    <header className="fixed top-0 left-0 w-full z-[100] py-3 md:py-6 pointer-events-none bg-base-100/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
      <nav className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center gap-3 pointer-events-auto font-mono">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <Link
            href="/"
            className="font-bold text-accent hover:bg-accent hover:text-accent-content px-2 py-1 transition-colors flex items-center gap-1.5 group whitespace-nowrap"
          >
            <Logo className="w-4 h-4 text-accent group-hover:text-accent-content" />
            <span>~ $</span>
            <span className="terminal-cursor group-hover:bg-white" />
          </Link>

          <Link
            href={parentPath(pathname)}
            title={nav.backTitle}
            className="flex items-center gap-1.5 border border-accent/30 px-2 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-wider text-accent hover:bg-accent hover:text-accent-content transition-all whitespace-nowrap"
          >
            <span className="font-mono">cd ..</span>
            <span className="hidden sm:inline">{nav.back}</span>
          </Link>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <TermShellToggle />
          <TermSkinToggle />
          <TermModeSwitch />
        </div>
      </nav>
      <div className="sm:hidden flex justify-end gap-2 px-4 pt-2 pointer-events-auto">
        <TermShellToggle />
        <TermSkinToggle />
        <TermModeSwitch />
      </div>
    </header>
  );
}
