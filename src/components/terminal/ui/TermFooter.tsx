import { cn } from "@/lib/utils";

/** Terminal skin footer: build pill on the left, author id on the right. */
export function TermFooter({ name, className }: { name: string; className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "mt-20 py-8 border-t-2 border-accent/20 font-mono flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-accent/60 uppercase tracking-widest",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-accent/40 rounded-full animate-pulse" />
        SYS_BUILD {"//"} {year}
      </div>
      <div className="text-center md:text-right">
        <span className="opacity-50">AUTHOR_ID: </span>
        <span className="font-black text-accent">{name.replace(/_/g, ".")}</span>
      </div>
    </footer>
  );
}
