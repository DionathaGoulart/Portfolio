"use client";
import { SquareTerminal } from "lucide-react";
import { useSkin } from "@/components/shared/SkinProvider";
import { useMounted } from "@/hooks/useMounted";

/** Round button of the retro skin that switches the whole site to the terminal skin. */
export function RetroSkinToggle() {
  const mounted = useMounted();
  const { setSkin } = useSkin();

  if (!mounted) return null;

  return (
    <button
      onClick={() => setSkin("terminal")}
      className="p-2 rounded-full bg-base-content/5 hover:bg-base-content/10 transition-colors border border-base-300 cursor-pointer"
      aria-label="Mudar para a skin terminal"
      title="Skin terminal"
    >
      <SquareTerminal size={20} />
    </button>
  );
}
