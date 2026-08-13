"use client";
import { ReactNode } from "react";

interface PersonaPageProps {
  children: ReactNode;
  /** Each skin passes its own footer — this shell knows nothing about skins. */
  footerContent: ReactNode;
  className?: string;
}

export function PersonaPage({ children, footerContent, className = "" }: PersonaPageProps) {
  return (
    <div className={`selection:bg-accent selection:text-accent-content ${className}`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-20 pt-20 md:pt-24">
        {children}

        {footerContent}
      </main>
    </div>
  );
}
