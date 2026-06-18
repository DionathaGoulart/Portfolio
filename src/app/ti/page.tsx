import { Metadata } from "next";
import { seoTi } from "@/data/seo-config";
import TiPageClient from "@/components/ti/TiPageClient";

export const metadata: Metadata = {
  title: seoTi.title,
  description: seoTi.description,
  keywords: seoTi.keywords,
  openGraph: {
    title: seoTi.title,
    description: seoTi.description,
    images: [{ url: seoTi.ogImage }],
  },
  twitter: {
    title: seoTi.title,
    description: seoTi.description,
    images: [seoTi.ogImage],
  },
};

export default function TiPage() {
  return <TiPageClient />;
}
