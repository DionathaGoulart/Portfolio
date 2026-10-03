"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * The terminal skin's two views of a page: the graphic one, or the interactive shell.
 *
 * Provided at the root layout, because every terminal page offers the shell. The mode is
 * deliberately not persisted: a page is entered graphic and the visitor opens the shell
 * from there, so a link shared from the shell still lands on the page itself.
 */
type ShellMode = "graphic" | "shell";

interface ShellModeContextType {
  mode: ShellMode;
  toggleMode: () => void;
}

const ShellModeContext = createContext<ShellModeContextType | null>(null);

export function ShellModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ShellMode>("graphic");
  const pathname = usePathname();

  // Back to the graphic view whenever the route changes — adjusted during render instead of
  // in an effect, so the new page never paints as a shell for a frame. The provider used to
  // sit in the /dev layout and got this for free from remounting.
  const [modePathname, setModePathname] = useState(pathname);
  if (modePathname !== pathname) {
    setModePathname(pathname);
    setMode("graphic");
  }

  const toggleMode = () => setMode((m) => (m === "graphic" ? "shell" : "graphic"));
  return (
    <ShellModeContext.Provider value={{ mode, toggleMode }}>{children}</ShellModeContext.Provider>
  );
}

export function useShellMode(): ShellModeContextType {
  const ctx = useContext(ShellModeContext);
  if (!ctx) throw new Error("useShellMode must be used inside <ShellModeProvider>");
  return ctx;
}
