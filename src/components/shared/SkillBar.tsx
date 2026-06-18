"use client";
import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  variant: "terminal" | "retro";
  delay?: number;
}

export function SkillBar({ name, level, variant, delay = 0 }: SkillBarProps) {
  if (variant === "terminal") {
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
            className="h-full bg-accent shadow-[0_0_15px_var(--accent)]"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="retro-border bg-background px-3 py-1 md:px-4 md:py-2 font-bold text-xs md:text-sm">
      {name.toUpperCase()}
    </div>
  );
}
