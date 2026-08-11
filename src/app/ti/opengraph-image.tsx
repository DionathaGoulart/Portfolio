import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, jetBrainsMono } from "@/lib/og";
import { seoGlobal, seoTi } from "@/data/seo-config";

export const alt = seoTi.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const BG = "#f2efe7";
const FG = "#1a0a0a";
const ACCENT = "#dc143c";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: BG,
        color: FG,
        padding: 80,
      }}
    >
      <div style={{ fontSize: 26, letterSpacing: 6, color: ACCENT, fontWeight: 700 }}>
        root@infra-ops:~# cat /ti
      </div>
      <div style={{ fontSize: 78, fontWeight: 900, lineHeight: 1.1, marginTop: 24 }}>
        {seoTi.title.split(" | ")[0]}
      </div>
      <div style={{ fontSize: 30, marginTop: 28, opacity: 0.7, maxWidth: 900 }}>
        {seoTi.description}
      </div>
      <div style={{ display: "flex", marginTop: 40, fontSize: 24, color: ACCENT }}>
        {seoGlobal.author} — {seoGlobal.url.replace("https://", "")}
      </div>
    </div>,
    { ...size, fonts: jetBrainsMono() }
  );
}
