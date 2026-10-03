import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, letting later Tailwind utilities win. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Where the top bar's back button goes: one segment up, or the hub from a first-level
 * page. Derived from the path instead of history.back() so the button lands somewhere
 * predictable even when the page was opened from a short link or a search result.
 */
export function parentPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  return segments.length > 1 ? `/${segments.slice(0, -1).join("/")}` : "/";
}
