import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const SHADOWS = {
  md: "retro-shadow",
  sm: "retro-shadow-sm",
  /** For surfaces whose shadow is responsive/hover-driven — pass it via className. */
  none: "",
} as const;

/**
 * daisyUI `card` framed the retro way: card-border reads the theme's --border (2px on
 * every retro theme, equal to --frame-border) recolored to base-300, plus the skin's
 * hard offset shadow. Corners come square from the theme (--radius-box: 0).
 */
interface RetroCardProps extends ComponentPropsWithoutRef<"div"> {
  shadow?: keyof typeof SHADOWS;
}

export function RetroCard({ shadow = "md", className, ...rest }: RetroCardProps) {
  return (
    <div
      className={cn("card card-border border-base-300 bg-base-200", SHADOWS[shadow], className)}
      {...rest}
    />
  );
}
