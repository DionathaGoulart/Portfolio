"use client";
import Link from "next/link";
import { iconMap } from "./Icons";
import { SocialLink } from "@/types/content";

interface SocialLinksProps {
  socials: SocialLink[];
  variant: "terminal" | "retro";
  className?: string;
}

export function SocialLinks({ socials, variant, className = "" }: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {socials.map((social) => {
        const type = social.name.toLowerCase() as keyof typeof iconMap;
        const Icon = iconMap[type] || iconMap.github; // Default to github if not found

        if (variant === "terminal") {
          return (
            <Link
              key={social.name}
              href={social.url}
              className="flex items-center gap-2 border border-accent/20 bg-accent/5 px-4 py-2 hover:bg-accent hover:text-white transition-all group font-mono text-xs uppercase"
            >
              <Icon size={16} />
              <span>{social.name}</span>
            </Link>
          );
        }

        return (
          <Link
            key={social.name}
            href={social.url}
            className="retro-border bg-card p-4 hover:bg-accent hover:text-white transition-all relative group retro-shadow-sm hover:retro-shadow-sm hover:-translate-y-1 active:translate-y-0 text-foreground"
            title={social.name}
          >
            <Icon size={24} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap retro-border">
              {social.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
