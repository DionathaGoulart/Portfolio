import { cn } from "@/lib/utils";

interface PanelProps {
  children: React.ReactNode;
  /** `md` is the 6px offset shadow, `sm` the 3px one, `none` leaves it flat. */
  shadow?: "md" | "sm" | "none";
  /** Adds the lift-on-hover treatment used by the interactive cards. */
  hoverLift?: boolean;
  className?: string;
}

/** Bordered surface of the retro skin: base-200 fill, hard border, offset shadow. */
export function Panel({ children, shadow = "sm", hoverLift = false, className }: PanelProps) {
  return (
    <div
      className={cn(
        "retro-border bg-base-200",
        shadow === "md" && "retro-shadow",
        shadow === "sm" && "retro-shadow-sm",
        hoverLift && "transition-all hover:-translate-y-1 active:translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
