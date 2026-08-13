import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * daisyUI `badge` dressed as the terminal skin's three chip styles. The base class
 * supplies the box model and reads its corners from the theme (--radius-selector: 0);
 * the variants override its size and colors down to the skin's tiny monospace chips.
 */
const VARIANTS = {
  /** Project tech tags: outlined accent chip. */
  tag: "border-accent/20 text-accent bg-accent/5 px-2 py-0.5 font-bold",
  /** Title-bar state pills (AUTO_PLAY, LIVE): soft accent fill, slightly rounded. */
  pill: "border-transparent bg-accent/10 text-accent/50 px-1 py-0.5 rounded font-normal",
  /** Inverted chip on accent surfaces (DG_ROOT_ACCESS). */
  solid: "border-transparent bg-white text-accent px-2 py-0.5 font-black",
} as const;

interface TermBadgeProps {
  variant: keyof typeof VARIANTS;
  className?: string;
  children: ReactNode;
}

export function TermBadge({ variant, className, children }: TermBadgeProps) {
  return (
    <span className={cn("badge h-auto text-[9px] gap-0", VARIANTS[variant], className)}>
      {children}
    </span>
  );
}
