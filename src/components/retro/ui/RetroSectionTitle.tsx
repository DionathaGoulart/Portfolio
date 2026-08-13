"use client";

interface RetroSectionTitleProps {
  title: string;
  className?: string;
}

export function RetroSectionTitle({ title, className = "" }: RetroSectionTitleProps) {
  return (
    <h2
      className={`text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-12 md:mb-20 text-left italic underline decoration-accent decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8 uppercase ${className}`}
    >
      {title}
    </h2>
  );
}
