import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * daisyUI `badge` as the retro skin's chips. The base class brings the box model, the
 * theme's 2px border and square corners; variants carry the skin's chip styles.
 */
const VARIANTS = {
  /** Accent block chip (the ti experience period). */
  accent:
    "bg-accent text-accent-content px-4 py-2 font-black text-xs md:text-sm uppercase whitespace-nowrap",
  /** Skill chip: plain uppercase name on the page background. */
  chip: "bg-base-100 px-3 py-1 md:px-4 md:py-2 font-bold text-xs md:text-sm",
  /** Project tech tag: tighter, louder tracking. */
  tag: "bg-base-100 px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs font-black uppercase tracking-widest",
} as const;

interface RetroBadgeProps {
  variant: keyof typeof VARIANTS;
  className?: string;
  children: ReactNode;
}

export function RetroBadge({ variant, className, children }: RetroBadgeProps) {
  return (
    <span className={cn("badge h-auto gap-0 border-base-300", VARIANTS[variant], className)}>
      {children}
    </span>
  );
}
