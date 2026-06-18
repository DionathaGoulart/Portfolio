"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type PaletteId = "p1" | "p2" | "p3" | "p4" | "d1" | "d2" | "d3" | "d4" | "d5";

export interface ThemeCustom {
  lightPalette: Extract<PaletteId, "p1" | "p2" | "p3" | "p4">;
  darkPalette: Extract<PaletteId, "d1" | "d2" | "d3" | "d4" | "d5">;
}

// Palette metadata for display
export const LIGHT_PALETTES: { id: string; name: string; bg: string; acc: string; fg: string }[] = [
  { id: "p1", name: "Crimson Chalk",  bg: "#f2efe7", acc: "#dc143c", fg: "#1a0a0a" },
  { id: "p2", name: "Abyss Frost",    bg: "#e4f0f6", acc: "#0a0f1e", fg: "#0f172a" },
  { id: "p3", name: "Forest Mist",    bg: "#eef4ee", acc: "#2d6a2d", fg: "#1a2e1a" },
  { id: "p4", name: "Sand Dusk",      bg: "#f5f0e8", acc: "#b56a30", fg: "#2a1a0a" },
];

export const DARK_PALETTES: { id: string; name: string; bg: string; acc: string; fg: string }[] = [
  { id: "d1", name: "Noir Rose",      bg: "#121212", acc: "#e8729a", fg: "#f2efe7" },
  { id: "d2", name: "Vault Gold",     bg: "#111111", acc: "#c8a96e", fg: "#e0e0e0" },
  { id: "d3", name: "Midnight Ember", bg: "#0d1117", acc: "#ff6b45", fg: "#e0ffe0" },
  { id: "d4", name: "Cyber Teal",     bg: "#0a0f14", acc: "#00e5ff", fg: "#e0f4ff" },
  { id: "d5", name: "Velvet Purple",  bg: "#0e0a14", acc: "#b47aff", fg: "#ede0ff" },
];

interface ThemeCustomCtx {
  lightPalette: string;
  darkPalette: string;
  setLightPalette: (id: string) => void;
  setDarkPalette: (id: string) => void;
}

const ThemeCustomContext = createContext<ThemeCustomCtx>({
  lightPalette: "p2",
  darkPalette: "d2",
  setLightPalette: () => {},
  setDarkPalette: () => {},
});


const PALETTE_VARS: Record<string, { bg: string; fg: string; acc: string; card: string; border: string; shadow: string }> = {
  p1: { bg: "#f2efe7", fg: "#1a0a0a", acc: "#dc143c", card: "#ffffff",  border: "#1a0a0a", shadow: "#1a0a0a" },
  p2: { bg: "#e4f0f6", fg: "#0f172a", acc: "#0a0f1e", card: "#e4f0f6",  border: "#0f172a", shadow: "#0a0f1e" },
  p3: { bg: "#eef4ee", fg: "#1a2e1a", acc: "#2d6a2d", card: "#f5faf5",  border: "#1a2e1a", shadow: "#2d6a2d" },
  p4: { bg: "#f5f0e8", fg: "#2a1a0a", acc: "#b56a30", card: "#fffcf5",  border: "#2a1a0a", shadow: "#b56a30" },
  d1: { bg: "#121212", fg: "#f2efe7", acc: "#e8729a", card: "#1a1a1a",  border: "#f2efe7", shadow: "#e8729a" },
  d2: { bg: "#111111", fg: "#e0e0e0", acc: "#c8a96e", card: "#111111",  border: "#c8a96e", shadow: "#c8a96e" },
  d3: { bg: "#0d1117", fg: "#e0ffe0", acc: "#ff6b45", card: "#121a12",  border: "#ff6b45", shadow: "#ff6b45" },
  d4: { bg: "#0a0f14", fg: "#e0f4ff", acc: "#00e5ff", card: "#0f1820",  border: "#00e5ff", shadow: "#00e5ff" },
  d5: { bg: "#0e0a14", fg: "#ede0ff", acc: "#b47aff", card: "#160f20",  border: "#b47aff", shadow: "#b47aff" },
};

function setPaletteVars(id: string) {
  const p = PALETTE_VARS[id];
  if (!p) return;
  // Target the element that has the theme class (set by RouteThemeProvider),
  // because its inline vars take precedence over :root in the CSS cascade.
  const themeEl =
    document.querySelector<HTMLElement>("[class*='theme-']") ??
    document.documentElement;
  themeEl.style.setProperty("--background", p.bg);
  themeEl.style.setProperty("--foreground", p.fg);
  themeEl.style.setProperty("--accent", p.acc);
  themeEl.style.setProperty("--card-bg", p.card);
  themeEl.style.setProperty("--border", p.border);
  themeEl.style.setProperty("--shadow", p.shadow);
}

function clearPaletteVars() {
  const themeEl =
    document.querySelector<HTMLElement>("[class*='theme-']") ??
    document.documentElement;
  themeEl.style.removeProperty("--background");
  themeEl.style.removeProperty("--foreground");
  themeEl.style.removeProperty("--accent");
  themeEl.style.removeProperty("--card-bg");
  themeEl.style.removeProperty("--border");
  themeEl.style.removeProperty("--shadow");
}

const LS_KEY = "dg-theme-custom";

export function ThemeCustomProvider({ children }: { children: ReactNode }) {
  const [lightPalette, setLightPaletteState] = useState("p2");
  const [darkPalette, setDarkPaletteState] = useState("d2");

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const { lp, dp } = JSON.parse(saved);
        if (lp) setLightPaletteState(lp);
        if (dp) setDarkPaletteState(dp);
      }
    } catch {}
  }, []);



  // Watch dark mode changes (next-themes adds/removes 'dark' on <html>)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setPaletteVars(isDark ? darkPalette : lightPalette);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    // Apply immediately on mount
    const isDark = document.documentElement.classList.contains("dark");
    setPaletteVars(isDark ? darkPalette : lightPalette);
    return () => {
      observer.disconnect();
      clearPaletteVars();
    };
  }, [lightPalette, darkPalette]);

  const setLightPalette = (id: string) => {
    setLightPaletteState(id);
    try { localStorage.setItem(LS_KEY, JSON.stringify({ lp: id, dp: darkPalette })); } catch {}
  };
  const setDarkPalette = (id: string) => {
    setDarkPaletteState(id);
    try { localStorage.setItem(LS_KEY, JSON.stringify({ lp: lightPalette, dp: id })); } catch {}
  };

  return (
    <ThemeCustomContext.Provider value={{ lightPalette, darkPalette, setLightPalette, setDarkPalette }}>
      {children}
    </ThemeCustomContext.Provider>
  );
}

export function useThemeCustom() {
  return useContext(ThemeCustomContext);
}
