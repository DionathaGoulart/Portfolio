"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { hubContent } from "@/data/hub-config";
import { parentPath } from "@/lib/utils";
import { RetroSkinToggle } from "./RetroSkinToggle";
import { RetroThemeToggle } from "./RetroThemeToggle";

/**
 * Header of the retro pages outside the portfolio (/projetos...): logo back to the hub, a
 * back button one level up, skin and theme toggles.
 *
 * It used to repeat the hub's sections as nav, which on /projetos meant offering the page
 * you were already on. The page's own filter does that job now.
 */
export function RetroTopBar() {
  const pathname = usePathname();
  const { nav } = hubContent;

  return (
    <header className="fixed top-0 left-0 w-full z-[100] py-3 md:py-6 pointer-events-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/"
            aria-label="Início"
            className="retro-border bg-base-200 p-1 retro-shadow-sm group flex items-center justify-center min-w-[42px] min-h-[42px] hover:bg-accent transition-all duration-200"
          >
            <Logo className="w-7 h-7 md:w-9 md:h-9 text-base-content group-hover:text-accent-content transition-all duration-200" />
          </Link>

          <Link
            href={parentPath(pathname)}
            title={nav.backTitle}
            className="retro-border bg-base-200 retro-shadow-sm flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 font-bold text-xs md:text-sm uppercase tracking-tighter hover:bg-accent hover:text-accent-content transition-all"
          >
            <ArrowLeft size={14} />
            {nav.back}
          </Link>
        </div>

        <div className="retro-border bg-base-200 p-1 sm:p-1.5 md:p-1 retro-shadow-sm flex items-center gap-1">
          <RetroSkinToggle />
          <RetroThemeToggle />
        </div>
      </nav>
    </header>
  );
}
