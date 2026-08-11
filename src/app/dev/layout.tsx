import { DevModeProvider } from "@/context/DevModeContext";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return <DevModeProvider>{children}</DevModeProvider>;
}
