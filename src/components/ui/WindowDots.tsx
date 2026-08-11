import { cn } from "@/lib/utils";

const TONES = {
  /** Terminal skin: the accent fading out across the three circles. */
  terminal: ["bg-accent", "bg-accent/40", "bg-accent/20"],
  /** Retro skin: one accent circle followed by two border-colored ones. */
  retro: ["bg-accent", "bg-base-300", "bg-base-300"],
} as const;

const SIZES = {
  sm: "w-2.5 h-2.5",
  responsive: "w-2.5 h-2.5 md:w-3 md:h-3",
  lg: "w-3.5 h-3.5",
} as const;

interface WindowDotsProps {
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  className?: string;
}

/** The three circles of a fake window title bar. */
export function WindowDots({ tone = "terminal", size = "sm", className }: WindowDotsProps) {
  return (
    <div aria-hidden="true" className={cn("flex gap-1.5", className)}>
      {TONES[tone].map((color, i) => (
        <span key={i} className={cn(SIZES[size], "rounded-full", color)} />
      ))}
    </div>
  );
}
