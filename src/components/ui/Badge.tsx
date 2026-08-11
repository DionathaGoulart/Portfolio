import { cn } from "@/lib/utils";

const VARIANTS = {
  /** Outlined accent chip of the terminal skin. */
  terminal: "border border-accent/20 bg-accent/5 text-accent",
  /** Solid accent tag of the retro skin. */
  retro: "bg-accent text-accent-content",
  /** Low-contrast tag on a base surface. */
  muted: "border border-base-300/20 bg-base-200 text-base-content/70",
} as const;

interface BadgeProps {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
}

export function Badge({ children, variant = "terminal", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
