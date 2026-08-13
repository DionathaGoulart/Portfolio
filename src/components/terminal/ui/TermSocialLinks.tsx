"use client";
import Link from "next/link";
import { iconFor } from "@/components/shared/Icons";
import { SocialLink } from "@/types/content";
import { cn } from "@/lib/utils";

interface TermSocialLinksProps {
  socials: (SocialLink & { type?: string })[];
  className?: string;
}

/** Social links as compact monospace pills, terminal skin. */
export function TermSocialLinks({ socials, className = "" }: TermSocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {socials.map((social) => {
        const Icon = iconFor(social);
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
      })}
    </div>
  );
}
