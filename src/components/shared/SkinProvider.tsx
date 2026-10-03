"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import {
  DEFAULT_DARK_PALETTE,
  DEFAULT_LIGHT_PALETTE,
  DEFAULT_SKIN,
  isSkin,
  PALETTE_STORAGE_KEY,
  resolveTheme,
  SKIN_STORAGE_KEY,
  type Skin,
} from "@/data/theme-config";

interface SkinContextValue {
  /** The skin to render. `DEFAULT_SKIN` on the server and during hydration. */
  skin: Skin;
  setSkin: (skin: Skin) => void;
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

/*
 * The skin lives in localStorage and is read through useSyncExternalStore: the server
 * snapshot is `null` ("not known yet"), so hydration renders the default skin exactly like
 * the server HTML did, and the stored skin takes over right after. THEME_INIT_SCRIPT has
 * already stamped the right `data-skin` before paint, and globals.css hides the view that
 * does not match it, so a terminal visitor never sees the retro page flash by.
 */
const SKIN_CHANGE_EVENT = "dg-skin-change";

function readStoredSkin(): Skin {
  try {
    const saved = window.localStorage.getItem(SKIN_STORAGE_KEY);
    return isSkin(saved) ? saved : DEFAULT_SKIN;
  } catch {
    return DEFAULT_SKIN;
  }
}

function subscribeSkin(onChange: () => void) {
  window.addEventListener(SKIN_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(SKIN_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const serverSkin = () => null;

function writeSkin(skin: Skin) {
  try {
    window.localStorage.setItem(SKIN_STORAGE_KEY, skin);
  } catch {
    // Private mode or blocked storage — the choice just will not survive a reload.
  }
  window.dispatchEvent(new Event(SKIN_CHANGE_EVENT));
}

/**
 * Owns the visitor's skin and terminal palettes, and keeps `data-theme` / `data-skin` on
 * <html> in sync with them and the light/dark mode.
 *
 * The first value is stamped before paint by THEME_INIT_SCRIPT; this provider only takes
 * over once both next-themes and the stored skin are known, so it never overwrites a
 * correct theme with a default one during hydration.
 */
export function SkinProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  // The retro skin has one accent per route, so the theme has to follow client-side
  // navigation too — THEME_INIT_SCRIPT only covers the first paint.
  const pathname = usePathname();
  const [palettes, setPalettes] = useState<StoredPalettes>(readStoredPalettes);
  const storedSkin = useSyncExternalStore(subscribeSkin, readStoredSkin, serverSkin);

  const skin = storedSkin ?? DEFAULT_SKIN;

  useEffect(() => {
    if (!resolvedTheme || !storedSkin) return;
    const root = document.documentElement;
    root.setAttribute(
      "data-theme",
      resolveTheme(storedSkin, resolvedTheme === "dark", palettes.lp, palettes.dp, pathname)
    );
    root.setAttribute("data-skin", storedSkin);
  }, [resolvedTheme, palettes, storedSkin, pathname]);

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
        setSkin: writeSkin,
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

/**
 * Renders the view of the active skin. Both views are passed in by the page; only one is
 * mounted. The wrapper carries `data-skin-view` so globals.css can keep it invisible until
 * `data-skin` on <html> agrees with it (see the note above SKIN_CHANGE_EVENT).
 */
export function SkinView({ retro, terminal }: { retro: ReactNode; terminal: ReactNode }) {
  const { skin } = useSkin();
  return (
    <div data-skin-view={skin} className="contents">
      {skin === "terminal" ? terminal : retro}
    </div>
  );
}
