import { cn } from "@/lib/utils";
import { WindowDots } from "./WindowDots";

interface TerminalWindowProps {
  /** Path shown centered in the title bar, e.g. `root@dg-os: ~/workspace`. */
  path?: string;
  /** Right-hand slot of the title bar (status pill, mode indicator). */
  status?: React.ReactNode;
  dotSize?: "sm" | "md" | "lg";
  /** Hide the dots below `sm`, matching the hero and CV headers. */
  hideDotsOnMobile?: boolean;
  children: React.ReactNode;
  className?: string;
  barClassName?: string;
}

/**
 * Fake terminal chrome: window dots, a centered path bar and an optional status slot.
 *
 * daisyUI's `mockup-window` was evaluated first but it renders its own rounded surface and
 * has no slot for the centered path bar this design puts in the title row.
 */
export function TerminalWindow({
  path,
  status,
  dotSize = "sm",
  hideDotsOnMobile = false,
  children,
  className,
  barClassName,
}: TerminalWindowProps) {
  return (
    <div className={cn("retro-border bg-base-200 overflow-hidden relative", className)}>
      <div
        className={cn(
          "bg-accent/5 border-b border-accent/10 px-4 py-2 flex justify-between items-center text-[10px] font-mono tracking-wider text-accent/50 font-black min-w-0",
          barClassName
        )}
      >
        <WindowDots
          size={dotSize}
          className={cn("shrink-0", hideDotsOnMobile && "hidden sm:flex")}
        />
        {path && <span className="truncate mx-2 flex-1 text-center font-normal">{path}</span>}
        {status}
      </div>
      {children}
    </div>
  );
}
