"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { iconFor } from "@/components/shared/Icons";
import { SocialLink } from "@/types/content";
import { cn } from "@/lib/utils";

interface RetroSocialLinksProps {
  socials: (SocialLink & { type?: string })[];
  /** `hub` is the landing grid, `grid` the ti contact block, `row` the plain icon row. */
  variant: "row" | "hub" | "grid";
  /** hub only: smaller padding and icon, used in the page footer row. */
  compact?: boolean;
  className?: string;
}

/** Social links across the retro surfaces (hub landing, ti page, icon rows). */
export function RetroSocialLinks({
  socials,
  variant,
  compact = false,
  className = "",
}: RetroSocialLinksProps) {
  return (
    <div
      className={cn(
        variant === "hub" && "grid grid-cols-2 gap-3 sm:gap-4",
        variant === "grid" && "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6",
        variant === "row" && "flex flex-wrap gap-4",
        className
      )}
    >
      {socials.map((social, i) => {
        const Icon = iconFor(social);

        if (variant === "grid") {
          return (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group retro-border bg-base-100 flex flex-col items-center justify-center gap-3 p-6 md:p-8 hover:bg-accent hover:text-accent-content transition-all duration-300 retro-shadow-sm hover:retro-shadow hover:-translate-y-1 active:translate-y-0"
              >
                <Icon size={28} />
                <span className="font-black text-xs uppercase tracking-widest text-center">
                  {social.name}
                </span>
              </Link>
            </motion.div>
          );
        }

        if (variant === "hub") {
          return (
            <Link
              key={social.name}
              href={social.url}
              aria-label={social.name}
              data-tip={compact ? social.name : undefined}
              className={cn(
                "retro-border bg-base-200 flex items-center justify-center hover:bg-accent hover:text-accent-content transition-all relative group retro-shadow-sm hover:retro-shadow-sm hover:-translate-y-1 active:translate-y-0 text-base-content",
                compact ? "p-3 sm:p-4 tooltip tooltip-retro" : "p-4 sm:p-5"
              )}
            >
              <Icon size={compact ? 20 : 24} />
            </Link>
          );
        }

        return (
          <Link
            key={social.name}
            href={social.url}
            aria-label={social.name}
            data-tip={social.name}
            className="tooltip tooltip-retro retro-border bg-base-200 p-4 hover:bg-accent hover:text-accent-content transition-all relative group retro-shadow-sm hover:retro-shadow-sm hover:-translate-y-1 active:translate-y-0 text-base-content"
          >
            <Icon size={24} />
          </Link>
        );
      })}
    </div>
  );
}
