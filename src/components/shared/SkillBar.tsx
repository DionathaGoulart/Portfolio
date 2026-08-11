"use client";
import { motion } from "framer-motion";

/**
 * The retro skin renders a plain chip with no progress indicator, so it has no use for
 * `level` or `delay`. Splitting the props by variant makes passing them a compile error
 * instead of a value that silently disappears.
 */
type SkillBarProps =
  | { variant: "terminal"; name: string; level: number; delay?: number }
  | { variant: "retro"; name: string };

export function SkillBar(props: SkillBarProps) {
  if (props.variant === "terminal") {
    const { name, level, delay = 0 } = props;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="group"
      >
        <div className="flex justify-between mb-2 text-xs md:text-sm font-bold tracking-widest uppercase">
          <span>{name}</span>
          <span className="text-accent">{level}%</span>
        </div>
        <div className="h-2 border border-accent/20 w-full overflow-hidden p-0.5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            className="h-full bg-accent shadow-[0_0_15px_var(--color-accent)]"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="retro-border bg-base-100 px-3 py-1 md:px-4 md:py-2 font-bold text-xs md:text-sm">
      {props.name.toUpperCase()}
    </div>
  );
}
