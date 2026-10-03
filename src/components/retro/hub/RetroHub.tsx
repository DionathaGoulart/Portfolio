import { RetroThemeToggle } from "@/components/retro/ui/RetroThemeToggle";
import { RetroSkinToggle } from "@/components/retro/ui/RetroSkinToggle";
import { ProfileCard } from "./ProfileCard";
import { HubCards } from "./HubCards";
import { HubFooter } from "./HubFooter";

/** The hub (/) in the retro skin: profile on the left, route cards on the right. */
export function RetroHub() {
  return (
    <main className="selection:bg-accent selection:text-accent-content min-h-screen flex flex-col justify-center py-12 px-4 md:px-6 overflow-x-hidden relative">
      {/* Background Terminal Scanline (Hybrid) */}
      <div className="terminal-scanline opacity-10" />

      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex gap-2 items-center">
        <RetroSkinToggle />
        <RetroThemeToggle />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <ProfileCard />
        <HubCards />
      </div>

      <HubFooter />
    </main>
  );
}
