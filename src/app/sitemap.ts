import { MetadataRoute } from "next";
import { seoGlobal } from "@/data/seo-config";

/**
 * Per-route dates. Stamping `new Date()` on every entry told crawlers the whole site
 * changed each time the sitemap was generated, which is not information.
 */
const ROUTES = [
  { path: "", lastModified: new Date("2026-08-11") },
  { path: "/dev", lastModified: new Date("2026-08-11") },
  { path: "/ti", lastModified: new Date("2026-08-11") },
  { path: "/dev/cv", lastModified: new Date("2026-08-11") },
  { path: "/ti/cv", lastModified: new Date("2026-08-11") },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoGlobal.url;

  return ROUTES.map(({ path, lastModified }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
