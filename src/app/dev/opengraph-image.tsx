import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, jetBrainsMono } from "@/lib/og";
import { seoGlobal, seoDev } from "@/data/seo-config";

export const alt = seoDev.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const BG = "#e4f0f6";
const FG = "#0f172a";
const ACCENT = "#0a0f1e";

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
        root@dg-os:~$ cat /dev
      </div>
      <div style={{ fontSize: 78, fontWeight: 900, lineHeight: 1.1, marginTop: 24 }}>
        {seoDev.title.split(" | ")[0]}
      </div>
      <div style={{ fontSize: 30, marginTop: 28, opacity: 0.7, maxWidth: 900 }}>
        {seoDev.description}
      </div>
      <div style={{ display: "flex", marginTop: 40, fontSize: 24, color: ACCENT }}>
        {seoGlobal.author} — {seoGlobal.url.replace("https://", "")}
      </div>
    </div>,
    { ...size, fonts: jetBrainsMono() }
  );
}
