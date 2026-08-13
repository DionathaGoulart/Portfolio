import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Label bar of the HUD modules: `[ LABEL ]` on the left, a status string on the right. */
export function TermModuleHeader({
  label,
  right,
  className,
}: {
  label: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-accent/10 border-b border-accent/20 px-4 py-2 flex items-center justify-between text-[10px] font-mono tracking-wider text-accent font-bold",
        className
      )}
    >
      <span>[ {label} ]</span>
      {right !== undefined && <span>{right}</span>}
    </div>
  );
}
