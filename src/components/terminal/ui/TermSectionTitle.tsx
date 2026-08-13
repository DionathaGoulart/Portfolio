"use client";

interface TermSectionTitleProps {
  number?: string;
  title: string;
  className?: string;
}

export function TermSectionTitle({ number, title, className = "" }: TermSectionTitleProps) {
  return (
    <h2
      className={`text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-wider flex items-center gap-2 ${className}`}
    >
      {number && <span className="text-xs opacity-40">{number}.</span>} {title}
    </h2>
  );
}
