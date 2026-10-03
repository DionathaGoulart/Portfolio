import { Metadata } from "next";
import { seoGlobal, seoProjects } from "@/data/seo-config";
import { SkinView } from "@/components/shared/SkinProvider";
import { RetroProjectsPage } from "@/components/retro/projects/RetroProjectsPage";
import { TermProjectsPage } from "@/components/terminal/projects/TermProjectsPage";

export const metadata: Metadata = {
  title: seoProjects.title,
  description: seoProjects.description,
  keywords: seoProjects.keywords,
  alternates: { canonical: "/projetos" },
  openGraph: {
    title: `${seoProjects.title} | ${seoGlobal.author}`,
    description: seoProjects.description,
    url: "/projetos",
  },
  twitter: {
    title: `${seoProjects.title} | ${seoGlobal.author}`,
    description: seoProjects.description,
  },
};

export default function ProjectsPage() {
  return <SkinView retro={<RetroProjectsPage />} terminal={<TermProjectsPage />} />;
}
