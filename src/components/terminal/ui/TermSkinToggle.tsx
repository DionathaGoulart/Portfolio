"use client";
import { useSkin } from "@/components/shared/SkinProvider";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

/** `[SKIN:RETRO]` button of the terminal skin's header, sibling of TermModeSwitch. */
export function TermSkinToggle({ className }: { className?: string }) {
  const mounted = useMounted();
  const { setSkin } = useSkin();

  if (!mounted) return null;

  return (
    <button
      onClick={() => setSkin("retro")}
      className={cn(
        "font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-accent-content px-2 py-1 transition-all cursor-pointer border border-accent/20",
        className
      )}
      aria-label="Mudar para a skin retro"
    >
      [SKIN:RETRO]
    </button>
  );
}
