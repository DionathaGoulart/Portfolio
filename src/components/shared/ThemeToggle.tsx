"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ isTerminal }: { isTerminal?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (isTerminal) {
    return (
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-white px-2 py-1 transition-all cursor-pointer border border-accent/20"
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? "[MODE:DARK]" : "[MODE:LIGHT]"}
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors border border-border-custom cursor-pointer"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
