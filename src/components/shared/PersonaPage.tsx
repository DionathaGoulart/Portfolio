"use client";
import { ReactNode } from "react";
import { PortfolioContent } from "@/types/content";

interface PersonaPageProps {
  content: PortfolioContent;
  children: ReactNode;
  footerContent?: ReactNode;
  className?: string;
}

export function PersonaPage({ content, children, footerContent, className = "" }: PersonaPageProps) {
  return (
    <div className={`selection:bg-accent selection:text-white ${className}`}>
      <main className="max-w-7xl mx-auto px-6 md:px-10 pb-20 pt-28 md:pt-32">
        {children}

        {footerContent || (
          <footer className="py-12 border-t-2 border-border-custom font-black uppercase tracking-widest opacity-40 text-sm">
            {content.name} // {new Date().getFullYear()}
          </footer>
        )}
      </main>
    </div>
  );
}
