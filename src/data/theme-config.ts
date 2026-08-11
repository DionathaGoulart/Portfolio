/**
 * Single source of truth for which daisyUI theme a route renders under.
 *
 * Two skins:
 *  - `terminal` -> /dev and /dev/cv          (shell / CRT aesthetic, visitor-selectable palette)
 *  - `retro`    -> /, /ti and /ti/cv         (neobrutalist, fixed palette per route family)
 *
 * The hex values here are display-only (swatch previews for the terminal `theme` command).
 * The colors that actually paint the app live in the `@plugin "daisyui/theme"` blocks in
 * globals.css — these must stay in sync with the `--color-base-100/-content/accent` of the
 * matching theme.
 */

export type Skin = "terminal" | "retro";

export interface TerminalThemeOption {
  /** Palette id persisted in localStorage. Kept from the pre-daisyUI scheme so saved preferences survive. */
  palette: string;
  /** daisyUI theme name, i.e. the `data-theme` value. */
  theme: string;
  /** Display name shown by the terminal `theme` wizard. */
  name: string;
  bg: string;
  acc: string;
  fg: string;
}

export const TERMINAL_LIGHT_THEMES: TerminalThemeOption[] = [
  {
    palette: "p1",
    theme: "terminal-crimson",
    name: "Crimson Chalk",
    bg: "#f2efe7",
    acc: "#dc143c",
    fg: "#1a0a0a",
  },
  {
    palette: "p2",
    theme: "terminal-frost",
    name: "Abyss Frost",
    bg: "#e4f0f6",
    acc: "#0a0f1e",
    fg: "#0f172a",
  },
  {
    palette: "p3",
    theme: "terminal-forest",
    name: "Forest Mist",
    bg: "#eef4ee",
    acc: "#2d6a2d",
    fg: "#1a2e1a",
  },
  {
    palette: "p4",
    theme: "terminal-amber",
    name: "Sand Dusk",
    bg: "#f5f0e8",
    acc: "#b56a30",
    fg: "#2a1a0a",
  },
];

export const TERMINAL_DARK_THEMES: TerminalThemeOption[] = [
  {
    palette: "d1",
    theme: "terminal-rose",
    name: "Noir Rose",
    bg: "#121212",
    acc: "#e8729a",
    fg: "#f2efe7",
  },
  {
    palette: "d2",
    theme: "terminal-gold",
    name: "Vault Gold",
    bg: "#111111",
    acc: "#c8a96e",
    fg: "#e0e0e0",
  },
  {
    palette: "d3",
    theme: "terminal-ember",
    name: "Midnight Ember",
    bg: "#0d1117",
    acc: "#ff6b45",
    fg: "#e0ffe0",
  },
  {
    palette: "d4",
    theme: "terminal-cyan",
    name: "Cyber Teal",
    bg: "#0a0f14",
    acc: "#00e5ff",
    fg: "#e0f4ff",
  },
  {
    palette: "d5",
    theme: "terminal-violet",
    name: "Velvet Purple",
    bg: "#0e0a14",
    acc: "#b47aff",
    fg: "#ede0ff",
  },
];

/** Matches the pre-daisyUI defaults of `.theme-dev`, so /dev keeps the look it shipped with. */
export const DEFAULT_LIGHT_PALETTE = "p2";
export const DEFAULT_DARK_PALETTE = "d2";

/** localStorage key holding `{ lp, dp }`. Format predates daisyUI and is kept for saved preferences. */
export const PALETTE_STORAGE_KEY = "dg-theme-custom";
/** localStorage key next-themes writes the light/dark/system choice to. */
export const MODE_STORAGE_KEY = "theme";

export function skinForPathname(pathname: string): Skin {
  return pathname === "/dev" || pathname.startsWith("/dev/") ? "terminal" : "retro";
}

function isTiRoute(pathname: string): boolean {
  return pathname === "/ti" || pathname.startsWith("/ti/");
}

export function themeForPalette(palette: string, isDark: boolean): string {
  const catalog = isDark ? TERMINAL_DARK_THEMES : TERMINAL_LIGHT_THEMES;
  const fallback = isDark ? DEFAULT_DARK_PALETTE : DEFAULT_LIGHT_PALETTE;
  const match =
    catalog.find((t) => t.palette === palette) ?? catalog.find((t) => t.palette === fallback);
  return match?.theme ?? "retro-hub-light";
}

export function resolveTheme(
  pathname: string,
  isDark: boolean,
  lightPalette: string,
  darkPalette: string
): string {
  if (skinForPathname(pathname) === "terminal") {
    return themeForPalette(isDark ? darkPalette : lightPalette, isDark);
  }
  const family = isTiRoute(pathname) ? "retro-ti" : "retro-hub";
  return `${family}-${isDark ? "dark" : "light"}`;
}

/**
 * Inline script that stamps `data-theme` / `data-skin` on <html> before first paint.
 *
 * Without it the server would render the light theme and React would swap it after
 * hydration, flashing every dark-mode visitor. next-themes solves the same problem the
 * same way for its `dark` class; this covers the palette dimension too, which the old
 * ThemeCustomContext applied in an effect and therefore always flashed.
 */
export const THEME_INIT_SCRIPT = `(function(){try{
var d=document.documentElement,p=location.pathname;
var t=p==="/dev"||p.indexOf("/dev/")===0;
var m=localStorage.getItem(${JSON.stringify(MODE_STORAGE_KEY)})||"system";
var k=m==="dark"||(m==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
var lp=${JSON.stringify(DEFAULT_LIGHT_PALETTE)},dp=${JSON.stringify(DEFAULT_DARK_PALETTE)};
try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(PALETTE_STORAGE_KEY)})||"{}");if(s.lp)lp=s.lp;if(s.dp)dp=s.dp;}catch(e){}
var L=${JSON.stringify(Object.fromEntries(TERMINAL_LIGHT_THEMES.map((o) => [o.palette, o.theme])))};
var D=${JSON.stringify(Object.fromEntries(TERMINAL_DARK_THEMES.map((o) => [o.palette, o.theme])))};
var n;
if(t){n=k?(D[dp]||${JSON.stringify(themeForPalette(DEFAULT_DARK_PALETTE, true))}):(L[lp]||${JSON.stringify(themeForPalette(DEFAULT_LIGHT_PALETTE, false))});}
else{n=(p==="/ti"||p.indexOf("/ti/")===0?"retro-ti-":"retro-hub-")+(k?"dark":"light");}
d.setAttribute("data-theme",n);
d.setAttribute("data-skin",t?"terminal":"retro");
}catch(e){}})();`;
