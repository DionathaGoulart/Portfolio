import { Metadata } from "next";
import { seoTi } from "@/data/seo-config";
import TiPageClient from "@/components/ti/TiPageClient";

export const metadata: Metadata = {
  title: seoTi.title,
  description: seoTi.description,
  keywords: seoTi.keywords,
  alternates: { canonical: "/ti" },
  openGraph: {
    title: seoTi.title,
    description: seoTi.description,
    url: "/ti",
  },
  twitter: {
    title: seoTi.title,
    description: seoTi.description,
  },
};

export default function TiPage() {
  return <TiPageClient />;
}
