import { CodeXml, Download, Globe, MonitorPlay, Smartphone, type LucideIcon } from "lucide-react";
import type { ProjectLinkKind } from "@/types/content";

/** Icon of each project action button, the same in both skins. */
export const PROJECT_LINK_ICONS: Record<ProjectLinkKind, LucideIcon> = {
  demo: MonitorPlay,
  repo: CodeXml,
  download: Download,
  store: Smartphone,
  site: Globe,
};

/** Project description paragraphs (blank-line separated in the config). */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** External links open in a new tab; relative ones stay in the site. */
export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}
