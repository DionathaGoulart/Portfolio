import { cn } from "@/lib/utils";

const VARIANTS = {
  /** Solid accent CTA of the retro skin. */
  retro:
    "retro-border bg-accent text-accent-content px-8 py-3.5 md:py-4 font-black text-sm md:text-base uppercase text-center hover:bg-base-content transition-colors",
  /** Outlined counterpart of `retro`. */
  "retro-outline":
    "retro-border border-2 border-accent bg-transparent text-base-content px-8 py-3.5 md:py-4 font-black text-sm md:text-base uppercase text-center hover:bg-accent hover:text-accent-content transition-colors",
  /** Compact monospace button of the terminal skin. */
  terminal:
    "retro-border border-accent/30 bg-accent/5 text-accent px-4 py-2.5 font-mono text-xs font-bold tracking-wider uppercase hover:bg-accent hover:text-accent-content transition-colors",
} as const;

type ButtonVariant = keyof typeof VARIANTS;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "terminal", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}

/** Same visuals for anchor-shaped actions (external project links, CV downloads). */
export function buttonClasses(variant: ButtonVariant = "terminal", className?: string) {
  return cn("cursor-pointer inline-flex items-center justify-center", VARIANTS[variant], className);
}
