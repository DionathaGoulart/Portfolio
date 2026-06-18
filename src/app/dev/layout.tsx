import { DevModeProvider } from "@/context/DevModeContext";
import { ThemeCustomProvider } from "@/context/ThemeCustomContext";

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeCustomProvider>
      <DevModeProvider>
        {children}
      </DevModeProvider>
    </ThemeCustomProvider>
  );
}
