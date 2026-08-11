import { Metadata } from "next";
import { seoGlobal, seoDev } from "@/data/seo-config";
import DevPageClient from "@/components/dev/DevPageClient";

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
  return <DevPageClient />;
}
