"use client";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

/**
 * The `[MODE:DARK]` / `[MODE:LIGHT]` toggle of the terminal skin's header, on daisyUI's
 * `swap` (class-controlled): both labels occupy the same grid cell, so the button keeps
 * one width across modes instead of shifting the header when the text changes.
 */
export function TermModeSwitch() {
  const mounted = useMounted();
  const { setTheme, resolvedTheme } = useTheme();

  if (!mounted) return null;
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "swap font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-accent-content px-2 py-1 transition-all cursor-pointer border border-accent/20",
        isDark && "swap-active"
      )}
      aria-label="Toggle theme"
    >
      <span className="swap-on">[MODE:DARK]</span>
      <span className="swap-off">[MODE:LIGHT]</span>
    </button>
  );
}
