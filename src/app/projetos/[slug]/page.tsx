import { Metadata } from "next";
import { notFound } from "next/navigation";
import { seoGlobal } from "@/data/seo-config";
import { findProject, projectsContent } from "@/data/projects-config";
import { SkinView } from "@/components/shared/SkinProvider";
import { RetroProjectPage } from "@/components/retro/projects/RetroProjectPage";
import { TermProjectPage } from "@/components/terminal/projects/TermProjectPage";

type Params = { slug: string };

// Every project page is prerendered; an unknown slug is a 404, not a runtime render.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projectsContent.projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = findProject((await params).slug);
  if (!project) return {};
  const url = `/projetos/${project.slug}`;
  return {
    title: project.title,
    description: project.tagline,
    keywords: project.tags,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | ${seoGlobal.author}`,
      description: project.tagline,
      url,
      ...(project.image ? { images: [project.image] } : {}),
    },
    twitter: {
      title: `${project.title} | ${seoGlobal.author}`,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  return (
    <SkinView
      retro={<RetroProjectPage project={project} />}
      terminal={<TermProjectPage project={project} />}
    />
  );
}
