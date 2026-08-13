import { cn } from "@/lib/utils";

/** Decorative strings of the ti surface's status footer. */
const TI_ENCRYPTION = "ENC: AES-256-GCM";
const TI_COORDINATES = "LAT: -29.9961 / LONG: -51.0858";
const TI_BUILD = "DG_OS_V1.0";

/** Status bar of the ti surface: build, encryption and coordinates. */
export function RetroStatusFooter({ className }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "pt-12 md:pt-16 border-t border-base-300/10 text-[8px] md:text-[10px] opacity-30 flex flex-wrap justify-between gap-4 uppercase tracking-[0.2em]",
        className
      )}
    >
      <span>
        © {year} {TI_BUILD}
      </span>
      <span className="hidden sm:inline">{TI_ENCRYPTION}</span>
      <span>{TI_COORDINATES}</span>
    </footer>
  );
}
