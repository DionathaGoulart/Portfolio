import { RetroThemeToggle } from "@/components/retro/ui/RetroThemeToggle";
import { ProfileCard } from "@/components/retro/hub/ProfileCard";
import { PersonaSwitcher } from "@/components/retro/hub/PersonaSwitcher";
import { HubFooter } from "@/components/retro/hub/HubFooter";

export default function HubPage() {
  return (
    <main className="selection:bg-accent selection:text-accent-content min-h-screen flex flex-col justify-center py-12 px-4 md:px-6 overflow-x-hidden relative">
      {/* Background Terminal Scanline (Hybrid) */}
      <div className="terminal-scanline opacity-10" />

      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex gap-4 items-center">
        <div className="hidden md:flex flex-col items-end font-mono text-[8px] opacity-40 uppercase tracking-widest">
          <span>Session: active</span>
          <span>Access: full_root</span>
        </div>
        <RetroThemeToggle />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <ProfileCard />
        <PersonaSwitcher />
      </div>

      <HubFooter />
    </main>
  );
}
