"use client";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

// `resolvedTheme` is only meaningful after hydration, so the toggle stays unrendered
// on the server pass. useSyncExternalStore gives that flag without a setState-in-effect.
const neverChanges = () => () => {};

export function ThemeToggle({ isTerminal }: { isTerminal?: boolean }) {
  const mounted = useSyncExternalStore(
    neverChanges,
    () => true,
    () => false
  );
  const { setTheme, resolvedTheme } = useTheme();

  if (!mounted) return null;

  if (isTerminal) {
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

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-base-content/5 hover:bg-base-content/10 transition-colors border border-base-300 cursor-pointer"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
