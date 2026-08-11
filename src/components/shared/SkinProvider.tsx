"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  DEFAULT_DARK_PALETTE,
  DEFAULT_LIGHT_PALETTE,
  PALETTE_STORAGE_KEY,
  resolveTheme,
  skinForPathname,
  type Skin,
} from "@/data/theme-config";

interface SkinContextValue {
  skin: Skin;
  lightPalette: string;
  darkPalette: string;
  setLightPalette: (palette: string) => void;
  setDarkPalette: (palette: string) => void;
}

const SkinContext = createContext<SkinContextValue | null>(null);

interface StoredPalettes {
  lp: string;
  dp: string;
}

const FALLBACK_PALETTES: StoredPalettes = {
  lp: DEFAULT_LIGHT_PALETTE,
  dp: DEFAULT_DARK_PALETTE,
};

function readStoredPalettes(): StoredPalettes {
  if (typeof window === "undefined") return FALLBACK_PALETTES;
  try {
    const raw = window.localStorage.getItem(PALETTE_STORAGE_KEY);
    if (!raw) return FALLBACK_PALETTES;
    const saved = JSON.parse(raw) as Partial<StoredPalettes>;
    return {
      lp: saved.lp ?? FALLBACK_PALETTES.lp,
      dp: saved.dp ?? FALLBACK_PALETTES.dp,
    };
  } catch {
    return FALLBACK_PALETTES;
  }
}

/**
 * Keeps `data-theme` / `data-skin` on <html> in sync with route, mode and palette.
 *
 * The first value is stamped before paint by THEME_INIT_SCRIPT; this provider only takes
 * over once next-themes has resolved the mode, so it never overwrites a correct dark theme
 * with a light one during hydration.
 */
export function SkinProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [palettes, setPalettes] = useState<StoredPalettes>(readStoredPalettes);

  const skin = skinForPathname(pathname);

  useEffect(() => {
    if (!resolvedTheme) return;
    const root = document.documentElement;
    root.setAttribute(
      "data-theme",
      resolveTheme(pathname, resolvedTheme === "dark", palettes.lp, palettes.dp)
    );
    root.setAttribute("data-skin", skin);
  }, [pathname, resolvedTheme, palettes, skin]);

  const persist = useCallback((next: StoredPalettes) => {
    setPalettes(next);
    try {
      window.localStorage.setItem(PALETTE_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private mode or blocked storage — the choice just will not survive a reload.
    }
  }, []);

  const setLightPalette = useCallback(
    (palette: string) => persist({ lp: palette, dp: palettes.dp }),
    [persist, palettes.dp]
  );

  const setDarkPalette = useCallback(
    (palette: string) => persist({ lp: palettes.lp, dp: palette }),
    [persist, palettes.lp]
  );

  return (
    <SkinContext.Provider
      value={{
        skin,
        lightPalette: palettes.lp,
        darkPalette: palettes.dp,
        setLightPalette,
        setDarkPalette,
      }}
    >
      {children}
    </SkinContext.Provider>
  );
}

export function useSkin(): SkinContextValue {
  const ctx = useContext(SkinContext);
  if (!ctx) throw new Error("useSkin must be used inside <SkinProvider>");
  return ctx;
}
