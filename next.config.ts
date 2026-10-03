import fs from "fs";
import path from "path";
import type { NextConfig } from "next";
import { projectsContent } from "./src/data/projects-config";

/**
 * Every project gets a short link, dionatha.com.br/<slug> -> /projetos/<slug>. Those slugs
 * share the root with the site's own routes and public files, so a project named like one
 * of them (`dev`, `projetos`, `robots.txt`...) would shadow it. The build fails instead.
 */
function shortLinkRedirects() {
  const stripExt = (name: string) => name.replace(/\.[^.]+$/, "");
  const reserved = new Set([
    "_next",
    "api",
    "ti",
    ...fs.readdirSync(path.join(process.cwd(), "src/app")).map(stripExt),
    ...fs.readdirSync(path.join(process.cwd(), "public")).map(stripExt),
  ]);

  return projectsContent.projects.map(({ slug }) => {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(`projects-config: slug "${slug}" must be lowercase letters, digits, dashes`);
    }
    if (reserved.has(slug)) {
      throw new Error(`projects-config: slug "${slug}" collides with the route or file /${slug}`);
    }
    return { source: `/${slug}`, destination: `/projetos/${slug}`, permanent: false };
  });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Origins liberados para os assets de dev (HMR) quando o site e aberto pelo IP da LAN.
  // Vem do .env.local (fora do git) porque o IP muda por maquina/rede; sem isso o chunk
  // do hmr-client e bloqueado e o navegador entra em loop de full reload.
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",").map((o) => o.trim()) ?? [],
  async redirects() {
    return [
      // The IT persona was retired; keep its old links landing somewhere useful.
      { source: "/ti", destination: "/", permanent: true },
      { source: "/ti/cv", destination: "/dev/cv", permanent: true },
      ...shortLinkRedirects(),
    ];
  },
};

export default nextConfig;
