import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

interface LogoWatermarkProps {
  /** `fill` stretches the logo across the panel; `badge` centers a fixed 20rem square. */
  variant?: "fill" | "badge";
  className?: string;
}

/** Barely-visible rotated logo sitting behind panel content. */
export function LogoWatermark({ variant = "fill", className }: LogoWatermarkProps) {
  if (variant === "badge") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.03] pointer-events-none",
          className
        )}
      >
        <Logo className="w-full h-full" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden text-accent select-none",
        className
      )}
    >
      <Logo className="w-[150%] h-[150%] md:w-[120%] md:h-[120%] object-cover -rotate-12" />
    </div>
  );
}
