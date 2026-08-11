import { cn } from "@/lib/utils";

/** Decorative strings of the ti skin's status footer. */
const TI_ENCRYPTION = "ENC: AES-256-GCM";
const TI_COORDINATES = "LAT: -29.9961 / LONG: -51.0858";
const TI_BUILD = "DG_OS_V1.0";

type FooterProps =
  /** Plain credit line, used by the retro skin and the dev CV page. */
  | { variant: "retro"; name: string; className?: string }
  /** Terminal skin: build pill on the left, author id on the right. */
  | { variant: "terminal"; name: string; className?: string }
  /** Ti skin status bar: build, encryption and coordinates. */
  | { variant: "ti"; className?: string };

export function Footer(props: FooterProps) {
  const year = new Date().getFullYear();

  if (props.variant === "terminal") {
    return (
      <footer
        className={cn(
          "mt-20 py-8 border-t-2 border-accent/20 font-mono flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-accent/60 uppercase tracking-widest",
          props.className
        )}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-accent/40 rounded-full animate-pulse" />
          SYS_BUILD {"//"} {year}
        </div>
        <div className="text-center md:text-right">
          <span className="opacity-50">AUTHOR_ID: </span>
          <span className="font-black text-accent">{props.name.replace(/_/g, ".")}</span>
        </div>
      </footer>
    );
  }

  if (props.variant === "ti") {
    return (
      <footer
        className={cn(
          "pt-12 md:pt-16 border-t border-base-300/10 text-[8px] md:text-[10px] opacity-30 flex flex-wrap justify-between gap-4 uppercase tracking-[0.2em]",
          props.className
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

  return (
    <footer
      className={cn(
        "py-12 border-t-2 border-base-300 font-black uppercase tracking-widest opacity-40 text-sm",
        props.className
      )}
    >
      {props.name} {"//"} {year}
    </footer>
  );
}
