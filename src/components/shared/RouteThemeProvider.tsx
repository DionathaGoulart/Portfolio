"use client";
import { usePathname } from "next/navigation";
import { themeConfig } from "@/data/dev-config";

export function RouteThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Encontra o tema baseado na rota, ou usa o default
  const themeClass = themeConfig.routes[pathname as keyof typeof themeConfig.routes] || themeConfig.default;

  return (
    <div className={`${themeClass} min-h-screen bg-background text-foreground transition-colors duration-500`}>
      {children}
    </div>
  );
}
