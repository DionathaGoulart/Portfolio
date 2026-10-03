"use client";
import { hubContent } from "@/data/hub-config";
import { useShellMode } from "@/context/ShellModeContext";
import { cn } from "@/lib/utils";

interface TermShellToggleProps {
  /** `bar` sits in a header next to the other toggles; `block` fills the mobile menu. */
  variant?: "bar" | "block";
  /** Runs after the mode flips, e.g. to close the menu the button was in. */
  onToggled?: () => void;
  className?: string;
}

/**
 * Flips the terminal skin between the graphic page and the interactive shell. Every
 * terminal page has one, so the shell is one click away from anywhere, not only /dev.
 */
export function TermShellToggle({ variant = "bar", onToggled, className }: TermShellToggleProps) {
  const { mode, toggleMode } = useShellMode();
  const { nav } = hubContent;
  const graphic = mode === "graphic";

  return (
    <button
      onClick={() => {
        toggleMode();
        onToggled?.();
      }}
      title={graphic ? nav.shellLong : nav.graphicLong}
      aria-label={graphic ? nav.shellLong : nav.graphicLong}
      className={cn(
        "group flex items-center border border-accent/30 font-black tracking-wider text-accent hover:bg-accent hover:text-accent-content transition-all cursor-pointer",
        variant === "bar"
          ? "gap-1.5 px-2 py-1 text-[9px] md:text-[10px]"
          : "w-full justify-center gap-3 px-4 py-3 text-sm",
        className
      )}
    >
      <span className="font-mono group-hover:text-accent-content">{graphic ? "▶_" : "⊞"}</span>
      <span className="group-hover:text-accent-content">
        {variant === "bar"
          ? graphic
            ? nav.shell
            : nav.graphic
          : graphic
            ? nav.shellLong
            : nav.graphicLong}
      </span>
    </button>
  );
}
