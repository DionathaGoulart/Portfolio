import { Metadata } from "next";
import { seoDev } from "@/data/seo-config";
import DevPageClient from "@/components/dev/DevPageClient";

export const metadata: Metadata = {
  title: seoDev.title,
  description: seoDev.description,
  keywords: seoDev.keywords,
  openGraph: {
    title: seoDev.title,
    description: seoDev.description,
    images: [{ url: seoDev.ogImage }],
  },
  twitter: {
    title: seoDev.title,
    description: seoDev.description,
    images: [seoDev.ogImage],
  },
};

export default function DevPage() {
  return <DevPageClient />;
}
