"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type DevMode = "graphic" | "terminal";

interface DevModeContextType {
  mode: DevMode;
  toggleMode: () => void;
}

const DevModeContext = createContext<DevModeContextType>({
  mode: "graphic",
  toggleMode: () => {},
});

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<DevMode>("graphic");
  const toggleMode = () => setMode((m) => (m === "graphic" ? "terminal" : "graphic"));
  return (
    <DevModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </DevModeContext.Provider>
  );
}

export function useDevMode() {
  return useContext(DevModeContext);
}
