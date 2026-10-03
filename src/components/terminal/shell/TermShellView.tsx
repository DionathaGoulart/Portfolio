"use client";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import type { PersonaContent } from "@/types/content";
import { useShellMode } from "@/context/ShellModeContext";

// The graphic view is the default, so the shell has no reason to sit in the initial
// bundle. It loads when the visitor actually switches modes.
const TerminalMode = dynamic(() => import("./TerminalMode"), {
  loading: () => <div className="h-[100dvh]" />,
});

interface TermShellViewProps {
  /** The page as it looks in graphic mode. */
  children: React.ReactNode;
  /**
   * What the shell talks about. Left out, the lazily loaded shell falls back to the
   * portfolio's content, so `help`, `whoami` and `cat` answer the same on every page
   * without dev-config reaching the hub's bundle. Only /dev passes it explicitly.
   */
  content?: PersonaContent;
}

/**
 * The graphic/shell swap of the terminal skin, around any page's body. The toggle that
 * flips it is TermShellToggle, in each page's header.
 */
export function TermShellView({ children, content }: TermShellViewProps) {
  const { mode, toggleMode } = useShellMode();

  return (
    <AnimatePresence mode="wait">
      {mode === "graphic" ? (
        <motion.div
          key="graphic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="shell"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TerminalMode content={content} onSwitchToGui={toggleMode} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
