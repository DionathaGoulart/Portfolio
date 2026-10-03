import { MetadataRoute } from "next";
import { seoGlobal } from "@/data/seo-config";
import { projectsContent } from "@/data/projects-config";

/**
 * Per-route dates. Stamping `new Date()` on every entry told crawlers the whole site
 * changed each time the sitemap was generated, which is not information. Project pages
 * use their own `updated` date.
 */
const ROUTES = [
  { path: "", lastModified: new Date("2026-09-19") },
  { path: "/dev", lastModified: new Date("2026-09-19") },
  { path: "/dev/cv", lastModified: new Date("2026-08-11") },
  { path: "/projetos", lastModified: new Date("2026-09-19") },
  ...projectsContent.projects.map((p) => ({
    path: `/projetos/${p.slug}`,
    lastModified: new Date(p.updated),
  })),
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
