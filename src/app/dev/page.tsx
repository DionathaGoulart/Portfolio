import { Metadata } from "next";
import { seoGlobal, seoDev } from "@/data/seo-config";
import { devContent } from "@/data/dev-config";
import { SkinView } from "@/components/shared/SkinProvider";
import RetroPersonaPage from "@/components/retro/persona/RetroPersonaPage";
import TermPersonaPage from "@/components/terminal/sections/TermPersonaPage";

export const metadata: Metadata = {
  title: seoDev.title,
  description: seoDev.description,
  keywords: seoDev.keywords,
  alternates: { canonical: "/dev" },
  openGraph: {
    title: `${seoDev.title} | ${seoGlobal.author}`,
    description: seoDev.description,
    url: "/dev",
  },
  twitter: {
    title: `${seoDev.title} | ${seoGlobal.author}`,
    description: seoDev.description,
  },
};

export default function DevPage() {
  return (
    <SkinView
      retro={<RetroPersonaPage content={devContent} />}
      terminal={<TermPersonaPage content={devContent} />}
    />
  );
}
