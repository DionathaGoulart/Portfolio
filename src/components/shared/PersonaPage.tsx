"use client";
import { ReactNode } from "react";
import { PortfolioContent } from "@/types/content";
import { Footer } from "./Footer";

interface PersonaPageProps {
  content: PortfolioContent;
  children: ReactNode;
  footerContent?: ReactNode;
  className?: string;
}

export function PersonaPage({
  content,
  children,
  footerContent,
  className = "",
}: PersonaPageProps) {
  return (
    <div className={`selection:bg-accent selection:text-accent-content ${className}`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-20 pt-20 md:pt-24">
        {children}

        {footerContent || <Footer variant="retro" name={content.name} />}
      </main>
    </div>
  );
}
