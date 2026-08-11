import { cn } from "@/lib/utils";

interface StatusDotProps {
  /** Set false for a static dot. */
  pulse?: boolean;
  className?: string;
}

/** Small pulsing dot used next to live-status labels. */
export function StatusDot({ pulse = true, className }: StatusDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("w-2 h-2 rounded-full bg-accent/40", pulse && "animate-pulse", className)}
    />
  );
}
