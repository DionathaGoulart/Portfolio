import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WindowDots } from "./WindowDots";

/**
 * The terminal skin's fake window: framed panel plus title bar. The three chromes are the
 * three bars the skin actually draws (daisyUI's mockup-window was evaluated and rejected:
 * its dots are a single-color ::before and its bar cannot hold the path + right slot row):
 *
 * - `heavy`: Hero / CV title bar — large dots, centered path, dash decorations.
 * - `bar`:   compact path bar of the section windows (Projects, Experience).
 * - `shell`: the live terminal's bar — full-strength accent, dots at full opacity.
 */
interface TermWindowProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  chrome: "heavy" | "bar" | "shell";
  title: ReactNode;
  /** Right slot of the bar. `heavy` ignores it and draws its dash decoration. */
  right?: ReactNode;
  /** Extra classes for the title element (per-surface opacity/tracking tweaks). */
  titleClassName?: string;
  /** Extra classes for the whole bar. */
  barClassName?: string;
  children: ReactNode;
}

export function TermWindow({
  chrome,
  title,
  right,
  titleClassName,
  barClassName,
  className,
  children,
  ...rest
}: TermWindowProps) {
  return (
    <div
      className={cn(
        "retro-border bg-base-200 retro-shadow overflow-hidden w-full flex flex-col",
        className
      )}
      {...rest}
    >
      {chrome === "heavy" && (
        <div
          className={cn(
            "bg-accent/10 border-b-2 border-accent flex justify-center sm:justify-between items-center px-6 py-3 shrink-0 min-w-0",
            barClassName
          )}
        >
          <WindowDots size="lg" className="hidden sm:flex gap-2.5 shrink-0" />
          <div
            className={cn("font-mono text-[10px] sm:text-xs font-black uppercase", titleClassName)}
          >
            {title}
          </div>
          <div className="hidden sm:flex gap-1.5 shrink-0">
            <div className="w-6 h-1 bg-accent/40" />
            <div className="w-6 h-1 bg-accent/20" />
          </div>
        </div>
      )}

      {chrome === "bar" && (
        <div
          className={cn(
            "bg-accent/5 border-b border-accent/10 px-4 py-2 flex justify-between items-center text-[10px] font-mono tracking-wider text-accent/50 min-w-0",
            barClassName
          )}
        >
          <WindowDots className="shrink-0 opacity-50" />
          <span className={cn("truncate mx-2", titleClassName)}>{title}</span>
          {right}
        </div>
      )}

      {chrome === "shell" && (
        <div
          className={cn(
            "bg-accent/10 border-b-2 border-accent/20 px-4 py-2 flex justify-between items-center text-[10px] font-mono tracking-wider text-accent font-black shrink-0 relative z-10",
            barClassName
          )}
        >
          <WindowDots />
          <span className={cn("truncate mx-2", titleClassName)}>{title}</span>
          {right}
        </div>
      )}

      {children}
    </div>
  );
}
