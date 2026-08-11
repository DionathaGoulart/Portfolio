import fs from "fs";
import path from "path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

function readFont(file: string) {
  return fs.readFileSync(path.join(process.cwd(), "public/fonts", file));
}

/**
 * ImageResponse renders in an isolated Satori environment with no access to next/font,
 * so the card would otherwise fall back to a system sans-serif and clash with the site.
 */
export function jetBrainsMono() {
  return [
    {
      name: "JetBrains Mono",
      data: readFont("JetBrainsMono-Regular.ttf"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "JetBrains Mono",
      data: readFont("JetBrainsMono-Bold.ttf"),
      weight: 700 as const,
      style: "normal" as const,
    },
    {
      name: "JetBrains Mono",
      data: readFont("JetBrainsMono-ExtraBold.ttf"),
      weight: 800 as const,
      style: "normal" as const,
    },
  ];
}
