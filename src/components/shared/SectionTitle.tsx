"use client";

interface SectionTitleProps {
  number?: string;
  title: string;
  variant: "terminal" | "retro";
  className?: string;
}

export function SectionTitle({ number, title, variant, className = "" }: SectionTitleProps) {
  if (variant === "terminal") {
    return (
      <h2 className={`text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-wider flex items-center gap-2 ${className}`}>
        {number && <span className="text-xs opacity-40">{number}.</span>} {title}
      </h2>
    );
  }

  return (
    <h2 className={`text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-12 md:mb-20 text-left italic underline decoration-accent decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8 uppercase ${className}`}>
      {title}
    </h2>
  );
}
