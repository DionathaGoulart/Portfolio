import { Metadata } from "next";
import { Permanent_Marker, Rubik_Glitch, Silkscreen, VT323 } from "next/font/google";
import { DeadsecStudy } from "@/components/deadsec/DeadsecStudy";

// Temporary visual study: kept out of search results and the sitemap.
export const metadata: Metadata = {
  title: "Deadsec — estudo visual",
  robots: { index: false, follow: false },
};

// Fonts of the study only; they load on this route and nowhere else.
const glitch = Rubik_Glitch({ weight: "400", subsets: ["latin"], variable: "--font-ds-glitch" });
const pixel = VT323({ weight: "400", subsets: ["latin"], variable: "--font-ds-pixel" });
const tag = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-ds-tag" });
const eightBit = Silkscreen({ weight: "400", subsets: ["latin"], variable: "--font-ds-8bit" });

export default function DeadsecPage() {
  return (
    <div className={`${glitch.variable} ${pixel.variable} ${tag.variable} ${eightBit.variable}`}>
      <DeadsecStudy />
    </div>
  );
}
