"use client";

/**
 * Painel de desenvolvimento — so monta quando NODE_ENV === "development"
 * (o guard fica no layout, este componente nunca chega no bundle de producao).
 *
 * Permite testar qualquer tema daisyUI (retro-* ou terminal-*) em qualquer rota, na hora,
 * sem reload e sem mexer na preferencia real do visitante. O override e so o atributo
 * `data-theme` do <html>: um MutationObserver reafirma o valor quando o SkinProvider o
 * reescreve (troca de rota ou de modo claro/escuro).
 *
 * "Resetar" devolve o tema que o SkinProvider resolveria para a rota atual.
 */

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useSkin } from "@/components/shared/SkinProvider";
import { resolveTheme, TERMINAL_DARK_THEMES, TERMINAL_LIGHT_THEMES } from "@/data/theme-config";

interface ThemeEntry {
  theme: string;
  name: string;
}

// One retro theme per route family (see RETRO_ROUTE_THEMES), so the panel can preview the
// accent a route actually renders with, not only the hub's.
const RETRO_ENTRIES: [base: string, name: string][] = [
  ["retro-hub", "Retro · hub"],
  ["retro-dev", "Retro · /dev"],
  ["retro-projetos", "Retro · /projetos"],
];

const retroEntries = (mode: "light" | "dark"): ThemeEntry[] =>
  RETRO_ENTRIES.map(([base, name]) => ({ theme: `${base}-${mode}`, name }));

const LIGHT_ENTRIES: ThemeEntry[] = [
  ...retroEntries("light"),
  ...TERMINAL_LIGHT_THEMES.map((t) => ({ theme: t.theme, name: t.name })),
];

const DARK_ENTRIES: ThemeEntry[] = [
  ...retroEntries("dark"),
  ...TERMINAL_DARK_THEMES.map((t) => ({ theme: t.theme, name: t.name })),
];

const LS_KEY = "dg-devtools-theme";
const CHANGE_EVENT = "dg-devtools-change";

type Overrides = { light: string | null; dark: string | null };

const EMPTY: Overrides = { light: null, dark: null };

/**
 * localStorage lido via useSyncExternalStore em vez de setState dentro de useEffect —
 * evita o render em cascata na hidratacao. `cachedRaw`/`cachedValue` garantem identidade
 * estavel do snapshot; sem isso o React entraria em loop de re-render.
 */
let cachedRaw: string | null = null;
let cachedValue: Overrides = EMPTY;

function readOverrides(): Overrides {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(LS_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as Partial<Overrides>) : null;
    cachedValue = parsed ? { light: parsed.light ?? null, dark: parsed.dark ?? null } : EMPTY;
  } catch {
    cachedValue = EMPTY;
  }
  return cachedValue;
}

function subscribeOverrides(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function writeOverrides(next: Overrides) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  } catch {
    // Storage bloqueado — o override so nao sobrevive ao reload.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

const subscribeNever = () => () => {};

function stampTheme(theme: string) {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") !== theme) root.setAttribute("data-theme", theme);
}

/** Chrome fixo do painel — nao usa os tokens do site, senao mudaria junto com o teste. */
const UI = {
  panel: "#0b0b0c",
  line: "#2a2a2e",
  text: "#e8e8ea",
  dim: "#8a8a92",
  hot: "#fbee23",
};

export function DevTools() {
  const [open, setOpen] = useState(false);

  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  );
  const overrides = useSyncExternalStore(subscribeOverrides, readOverrides, () => EMPTY);

  const { resolvedTheme, theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { skin, lightPalette, darkPalette } = useSkin();

  const isDark = resolvedTheme === "dark";
  const mode: "light" | "dark" = isDark ? "dark" : "light";
  const active = overrides[mode];
  const realTheme = resolveTheme(skin, isDark, lightPalette, darkPalette, pathname);

  useEffect(() => {
    if (!mounted || !resolvedTheme) return;
    if (!active) {
      stampTheme(realTheme);
      return;
    }
    stampTheme(active);
    const observer = new MutationObserver(() => stampTheme(active));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [active, mounted, resolvedTheme, realTheme]);

  const pick = useCallback(
    (id: string) => {
      // clicar no tema ja ativo desliga o override
      writeOverrides({ ...overrides, [mode]: overrides[mode] === id ? null : id });
    },
    [overrides, mode]
  );

  const reset = useCallback(() => writeOverrides(EMPTY), []);

  // Ctrl+Shift+D abre/fecha
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!mounted) return null;

  const list = isDark ? DARK_ENTRIES : LIGHT_ENTRIES;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        title="DevTools (Ctrl+Shift+D)"
        style={{
          position: "fixed",
          left: 16,
          bottom: 16,
          zIndex: 9999,
          background: UI.panel,
          color: UI.hot,
          border: `1px solid ${UI.line}`,
          borderRadius: 6,
          padding: "6px 10px",
          font: "700 10px/1 ui-monospace, monospace",
          letterSpacing: "0.12em",
          cursor: "pointer",
        }}
      >
        DEV{active ? " ●" : ""}
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        bottom: 16,
        zIndex: 9999,
        width: 260,
        background: UI.panel,
        border: `1px solid ${UI.line}`,
        borderRadius: 8,
        color: UI.text,
        font: "12px/1.4 ui-monospace, monospace",
        boxShadow: "0 10px 40px rgba(0,0,0,.5)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 10px",
          borderBottom: `1px solid ${UI.line}`,
        }}
      >
        <span style={{ color: UI.hot, fontWeight: 700, letterSpacing: "0.12em", fontSize: 10 }}>
          DEVTOOLS
        </span>
        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          style={{
            background: "none",
            border: "none",
            color: UI.dim,
            cursor: "pointer",
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {/* Contexto */}
      <div
        style={{
          padding: "8px 10px",
          borderBottom: `1px solid ${UI.line}`,
          color: UI.dim,
          fontSize: 10,
        }}
      >
        <div>
          rota: <span style={{ color: UI.text }}>{pathname}</span>
        </div>
        <div>
          tema real: <span style={{ color: UI.text }}>{realTheme}</span>
        </div>
        <div>
          override: <span style={{ color: active ? UI.hot : UI.dim }}>{active ?? "nenhum"}</span>
        </div>
      </div>

      {/* Modo */}
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: "8px 10px",
          borderBottom: `1px solid ${UI.line}`,
        }}
      >
        {(["light", "dark", "system"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setTheme(m)}
            style={{
              flex: 1,
              padding: "5px 0",
              background: theme === m ? UI.hot : "transparent",
              color: theme === m ? "#000" : UI.dim,
              border: `1px solid ${theme === m ? UI.hot : UI.line}`,
              borderRadius: 4,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Temas */}
      <div style={{ padding: "8px 10px", maxHeight: 300, overflowY: "auto" }}>
        <div style={{ color: UI.dim, fontSize: 9, letterSpacing: "0.12em", marginBottom: 6 }}>
          TEMAS — {mode.toUpperCase()}
        </div>
        {list.map((t) => {
          const selected = active === t.theme;
          return (
            <button
              key={t.theme}
              onClick={() => pick(t.theme)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "6px 6px",
                marginBottom: 3,
                background: selected ? "#1a1a1d" : "transparent",
                border: `1px solid ${selected ? UI.hot : "transparent"}`,
                borderRadius: 4,
                color: UI.text,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {/* data-theme no swatch: o daisyUI resolve os tokens do tema so dentro dele */}
              <span data-theme={t.theme} style={{ display: "flex", flexShrink: 0 }}>
                {["--color-base-100", "--color-accent", "--color-base-content"].map((v, i) => (
                  <span
                    key={v}
                    style={{
                      width: 12,
                      height: 18,
                      background: `var(${v})`,
                      border: `1px solid ${UI.line}`,
                      marginLeft: i ? -1 : 0,
                    }}
                  />
                ))}
              </span>
              <span style={{ flex: 1, fontSize: 11 }}>{t.name}</span>
              <span style={{ color: UI.dim, fontSize: 9 }}>
                {t.theme.replace(/^terminal-/, "")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reset */}
      <div style={{ padding: "8px 10px", borderTop: `1px solid ${UI.line}` }}>
        <button
          onClick={reset}
          style={{
            width: "100%",
            padding: "6px 0",
            background: "transparent",
            border: `1px solid ${UI.line}`,
            borderRadius: 4,
            color: UI.dim,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Resetar para o tema real
        </button>
      </div>
    </div>
  );
}
