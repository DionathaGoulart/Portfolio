"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
 * The DedSec image treatments run live on the real photo, in a canvas:
 * - dither: 4x4 ordered (Bayer) dithering to three levels: void, magenta, cyan highlights
 * - ascii:  luminance mapped onto a character ramp
 * - pixel:  downsampled colour blocks
 * Transparent pixels (the photo is a cut-out) count as background.
 */

type Mode = "dither" | "ascii" | "pixel";

const MODES: { id: Mode; label: string }[] = [
  { id: "dither", label: "Dithering" },
  { id: "ascii", label: "ASCII" },
  { id: "pixel", label: "Pixel art" },
];

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const RAMP = " .:-=+*#%@";

// Read once from the palette so the canvas matches the CSS.
const INK = { magenta: [255, 31, 142], cyan: [25, 247, 255], bg: [7, 7, 8] } as const;

function sample(img: HTMLImageElement, width: number) {
  const height = Math.round((img.height / img.width) * width);
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, width, height);
  return { data: ctx.getImageData(0, 0, width, height).data, width, height };
}

function luminance(d: Uint8ClampedArray, i: number) {
  const a = d[i + 3]! / 255;
  const l = (0.299 * d[i]! + 0.587 * d[i + 1]! + 0.114 * d[i + 2]!) / 255;
  // Lift the shadows (the photo is dark), then boost contrast: the treatments read punchy.
  const lifted = Math.pow(l, 0.6);
  return Math.min(1, Math.max(0, (lifted - 0.5) * 1.4 + 0.5)) * a;
}

export function PhotoLab({ src }: { src: string }) {
  const [mode, setMode] = useState<Mode>("dither");
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [ascii, setAscii] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = src;
  }, [src]);

  useEffect(() => {
    if (!img) return;

    if (mode === "ascii") {
      const cols = 110;
      // Characters are ~2x taller than wide, so sample half as many rows.
      const { data, width, height } = sample(img, cols);
      const lines: string[] = [];
      for (let y = 0; y < height; y += 2) {
        let line = "";
        for (let x = 0; x < width; x++) {
          const l = luminance(data, (y * width + x) * 4);
          line += RAMP[Math.min(RAMP.length - 1, Math.floor(l * RAMP.length))];
        }
        lines.push(line.trimEnd());
      }
      // Deferred like the image load above, so this is not a synchronous set in the effect.
      queueMicrotask(() => setAscii(lines.join("\n")));
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = mode === "dither" ? 180 : 44;
    const { data, height } = sample(img, width);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    const out = ctx.createImageData(width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        let rgb: readonly number[];
        if (mode === "dither") {
          const threshold = (BAYER[y % 4]![x % 4]! + 0.5) / 16;
          // Two steps (void -> magenta -> cyan), each dithered against the same matrix.
          const v = luminance(data, i) * 2;
          const base = Math.floor(v);
          const level = Math.min(2, base + (v - base > threshold ? 1 : 0));
          rgb = level === 0 ? INK.bg : level === 1 ? INK.magenta : INK.cyan;
        } else {
          const a = data[i + 3]! / 255;
          // Posterize to 4 levels per channel for a limited-palette feel.
          const q = (v: number) => Math.round((v / 255) * 3) * 85;
          rgb = a < 0.5 ? INK.bg : [q(data[i]!), q(data[i + 1]!), q(data[i + 2]!)];
        }
        out.data[i] = rgb[0]!;
        out.data[i + 1] = rgb[1]!;
        out.data[i + 2] = rgb[2]!;
        out.data[i + 3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
  }, [img, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3" role="tablist" aria-label="Tratamento da foto">
        {MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => setMode(m.id)}
            className={cn("ds-btn", mode === m.id ? "ds-btn-solid" : "ds-btn-outline")}
          >
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      <div
        className="ds-panel ds-panel-glow aspect-square max-w-md overflow-hidden flex items-center justify-center"
        style={{ background: "var(--ds-black)" }}
      >
        {mode === "ascii" ? (
          <pre
            aria-label="Foto em ASCII"
            className="text-[5.2px] sm:text-[6.8px] leading-[1.2] text-[var(--ds-cyan)] font-mono whitespace-pre select-none"
          >
            {ascii}
          </pre>
        ) : (
          <canvas
            ref={canvasRef}
            aria-label={mode === "dither" ? "Foto em dithering" : "Foto em pixel art"}
            className="w-full h-full object-contain ds-pixelated"
          />
        )}
      </div>
    </div>
  );
}
