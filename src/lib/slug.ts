import type { Project } from "@/types/content";

/**
 * Project title -> url/command-safe slug.
 *
 * The terminal and the graphic project list used to slug titles differently — the terminal
 * mapped every non-alphanumeric character to a dash, so "Containner®" became "containner-"
 * and that trailing dash leaked into the `cat` command. This strips accents and symbols
 * instead, so both surfaces address a project by the same name.
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // combining accent marks
    .replace(/[^a-z0-9\s-]/g, "") // symbols such as ®
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Slug plus the extension the terminal file listing shows, e.g. `detcheler.ts`. */
export function projectFilename(project: Project): string {
  return `${slugify(project.title)}${project.fileExtension ?? ".tsx"}`;
}
