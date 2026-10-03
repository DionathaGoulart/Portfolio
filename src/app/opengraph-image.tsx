import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, jetBrainsMono } from "@/lib/og";
import { seoGlobal, seoHub } from "@/data/seo-config";

export const alt = seoHub.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// retro-hub-light
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
        border: `16px solid ${FG}`,
      }}
    >
      <div
        style={{
          fontSize: 26,
          letterSpacing: 8,
          textTransform: "uppercase",
          color: ACCENT,
          fontWeight: 800,
        }}
      >
        {seoGlobal.url.replace("https://", "")}
      </div>
      <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 1.05, marginTop: 24 }}>
        {seoGlobal.author}
      </div>
      <div style={{ display: "flex", marginTop: 32 }}>
        <div style={{ background: ACCENT, color: BG, padding: "12px 24px", fontSize: 30 }}>
          Desenvolvedor Fullstack
        </div>
      </div>
    </div>,
    { ...size, fonts: jetBrainsMono() }
  );
}
