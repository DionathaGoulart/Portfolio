"use client";
import Link from "next/link";
import { iconMap } from "./Icons";
import { Tooltip } from "@/components/ui/Tooltip";
import { SocialLink } from "@/types/content";
import { cn } from "@/lib/utils";

type SocialEntry = SocialLink & { type?: string };

interface SocialLinksProps {
  socials: SocialEntry[];
  /** `hub` is the grid on the landing page; the other two follow their skins. */
  variant: "terminal" | "retro" | "hub";
  /** hub only: smaller padding and icon, used in the page footer row. */
  compact?: boolean;
  className?: string;
}

/**
 * Sole renderer for social links across the three surfaces.
 *
 * The icon is keyed off `type` when the config provides one and falls back to the display
 * name, which is why the dev config's "Email" entry had to become "Gmail" — there is no
 * `email` icon, and the lookup silently fell through to GitHub.
 */
export function SocialLinks({
  socials,
  variant,
  compact = false,
  className = "",
}: SocialLinksProps) {
  return (
    <div
      className={cn(
        variant === "hub" ? "grid grid-cols-2 gap-3 sm:gap-4" : "flex flex-wrap gap-4",
        className
      )}
    >
      {socials.map((social) => {
        const key = (social.type ?? social.name).toLowerCase() as keyof typeof iconMap;
        const Icon = iconMap[key] ?? iconMap.github;

        if (variant === "terminal") {
          return (
            <Link
              key={social.name}
              href={social.url}
              className="flex items-center gap-2 border border-accent/20 bg-accent/5 px-4 py-2 hover:bg-accent hover:text-accent-content transition-all group font-mono text-xs uppercase"
            >
              <Icon size={16} />
              <span>{social.name}</span>
            </Link>
          );
        }

        if (variant === "hub") {
          return (
            <Link
              key={social.name}
              href={social.url}
              aria-label={social.name}
              title={social.name}
              className={cn(
                "retro-border bg-base-200 flex items-center justify-center hover:bg-accent hover:text-accent-content transition-all relative group retro-shadow-sm hover:retro-shadow-sm hover:-translate-y-1 active:translate-y-0 text-base-content",
                compact ? "p-3 sm:p-4" : "p-4 sm:p-5"
              )}
            >
              <Icon size={compact ? 20 : 24} />
              {compact && <Tooltip label={social.name} />}
            </Link>
          );
        }

        return (
          <Link
            key={social.name}
            href={social.url}
            aria-label={social.name}
            className="retro-border bg-base-200 p-4 hover:bg-accent hover:text-accent-content transition-all relative group retro-shadow-sm hover:retro-shadow-sm hover:-translate-y-1 active:translate-y-0 text-base-content"
          >
            <Icon size={24} />
            <Tooltip label={social.name} />
          </Link>
        );
      })}
    </div>
  );
}
