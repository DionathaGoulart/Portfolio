import { cn } from "@/lib/utils";

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

/** Keyboard hint, e.g. the [↑] [↓] [ENTER] legend of the project browser. */
export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd className={cn("kbd kbd-xs font-mono border-accent/30 bg-accent/5 text-accent", className)}>
      {children}
    </kbd>
  );
}
