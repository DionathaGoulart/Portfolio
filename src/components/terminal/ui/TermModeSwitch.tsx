"use client";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

/** The `[MODE:DARK]` / `[MODE:LIGHT]` toggle of the terminal skin's header. */
export function TermModeSwitch() {
  const mounted = useMounted();
  const { setTheme, resolvedTheme } = useTheme();

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-accent-content px-2 py-1 transition-all cursor-pointer border border-accent/20"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? "[MODE:DARK]" : "[MODE:LIGHT]"}
    </button>
  );
}
