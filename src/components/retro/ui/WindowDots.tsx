import { cn } from "@/lib/utils";

/** Retro skin: one accent circle followed by two border-colored ones. */
const TONES = ["bg-accent", "bg-base-300", "bg-base-300"] as const;

const SIZES = {
  sm: "w-2.5 h-2.5",
  responsive: "w-2.5 h-2.5 md:w-3 md:h-3",
  lg: "w-3.5 h-3.5",
} as const;

interface WindowDotsProps {
  size?: keyof typeof SIZES;
  className?: string;
}

/** The three circles of a fake window title bar. */
export function WindowDots({ size = "sm", className }: WindowDotsProps) {
  return (
    <div aria-hidden="true" className={cn("flex gap-1.5", className)}>
      {TONES.map((color, i) => (
        <span key={i} className={cn(SIZES[size], "rounded-full", color)} />
      ))}
    </div>
  );
}
