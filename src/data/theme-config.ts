/**
 * Single source of truth for which daisyUI theme a route renders under.
 *
 * Two skins:
 *  - `terminal` -> /dev and /dev/cv          (shell / CRT aesthetic, visitor-selectable palette)
 *  - `retro`    -> /, /ti and /ti/cv         (neobrutalist, fixed palette per route family)
 *
 * The swatch values (bg/acc/fg) are display-only (previews for the terminal `theme`
 * command) and reference the palette variables in src/styles/palettes.css — the same
 * single source of color the themes are built from, so they can never drift.
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
    bg: "var(--palette-cream)",
    acc: "var(--palette-crimson)",
    fg: "var(--palette-ink)",
  },
  {
    palette: "p2",
    theme: "terminal-frost",
    name: "Abyss Frost",
    bg: "var(--palette-frost-bg)",
    acc: "var(--palette-abyss)",
    fg: "var(--palette-frost-ink)",
  },
  {
    palette: "p3",
    theme: "terminal-forest",
    name: "Forest Mist",
    bg: "var(--palette-forest-bg)",
    acc: "var(--palette-forest-green)",
    fg: "var(--palette-forest-ink)",
  },
  {
    palette: "p4",
    theme: "terminal-amber",
    name: "Sand Dusk",
    bg: "var(--palette-sand-bg)",
    acc: "var(--palette-copper)",
    fg: "var(--palette-sand-ink)",
  },
];

export const TERMINAL_DARK_THEMES: TerminalThemeOption[] = [
  {
    palette: "d1",
    theme: "terminal-rose",
    name: "Noir Rose",
    bg: "var(--palette-noir)",
    acc: "var(--palette-rose)",
    fg: "var(--palette-cream)",
  },
  {
    palette: "d2",
    theme: "terminal-gold",
    name: "Vault Gold",
    bg: "var(--palette-graphite)",
    acc: "var(--palette-gold)",
    fg: "var(--palette-silver)",
  },
  {
    palette: "d3",
    theme: "terminal-ember",
    name: "Midnight Ember",
    bg: "var(--palette-midnight)",
    acc: "var(--palette-ember)",
    fg: "var(--palette-mint)",
  },
  {
    palette: "d4",
    theme: "terminal-cyan",
    name: "Cyber Teal",
    bg: "var(--palette-cyan-bg)",
    acc: "var(--palette-cyan)",
    fg: "var(--palette-cyan-mist)",
  },
  {
    palette: "d5",
    theme: "terminal-violet",
    name: "Velvet Purple",
    bg: "var(--palette-violet-bg)",
    acc: "var(--palette-violet)",
    fg: "var(--palette-violet-mist)",
  },
  {
    palette: "d6",
    theme: "terminal-matrix",
    name: "Neon Matrix",
    bg: "var(--palette-black)",
    acc: "var(--palette-matrix-green)",
    fg: "var(--palette-matrix-mist)",
  },
];

/** Matches the pre-daisyUI defaults of `.theme-dev`, so /dev keeps the look it shipped with. */
export const DEFAULT_LIGHT_PALETTE = "p2";
export const DEFAULT_DARK_PALETTE = "d2";

/** localStorage key holding `{ lp, dp }`. Format predates daisyUI and is kept for saved preferences. */
export const PALETTE_STORAGE_KEY = "dg-theme-custom";
/** localStorage key next-themes writes the light/dark/system choice to. */
export const MODE_STORAGE_KEY = "theme";

/**
 * Browser chrome color. A meta tag cannot read a CSS variable, so these two literals are
 * the one place a color is repeated — keep them equal to --palette-cream and
 * --palette-noir in src/styles/palettes.css.
 */
export const THEME_COLOR_LIGHT = "#f2efe7";
export const THEME_COLOR_DARK = "#121212";

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
