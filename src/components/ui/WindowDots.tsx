import { cn } from "@/lib/utils";

const DOT_SIZES = {
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-3.5 h-3.5",
} as const;

interface WindowDotsProps {
  size?: keyof typeof DOT_SIZES;
  className?: string;
}

/** The three fading circles of a fake window title bar. */
export function WindowDots({ size = "sm", className }: WindowDotsProps) {
  const dot = DOT_SIZES[size];
  return (
    <div className={cn("flex gap-1.5", className)}>
      <span className={cn(dot, "rounded-full bg-accent")} />
      <span className={cn(dot, "rounded-full bg-accent/40")} />
      <span className={cn(dot, "rounded-full bg-accent/20")} />
    </div>
  );
}
