import { cn } from "@/lib/utils";

/**
 * Plain credit line, skin-neutral (only base tokens). Keeping this credit visible
 * with its link is a clause of the project's MIT license — do not remove it.
 */
export function CreditFooter({ name, className }: { name: string; className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "py-12 border-t-2 border-base-300 font-black uppercase tracking-widest opacity-40 text-sm",
        className
      )}
    >
      {name} {"//"} {year}
    </footer>
  );
}
