import { cn } from "@/lib/utils";

interface RetroTooltipProps {
  label: string;
  className?: string;
}

/**
 * Label that fades in above its container on hover.
 *
 * Must be placed inside an element carrying `group` and `relative`. This is not daisyUI's
 * `tooltip` component: that one brings its own surface and arrow, which would change the
 * flat accent block this design uses.
 */
export function RetroTooltip({ label, className }: RetroTooltipProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -top-10 left-1/2 -translate-x-1/2 bg-accent text-accent-content text-[10px] font-black px-2 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap retro-border",
        className
      )}
    >
      {label}
    </span>
  );
}
