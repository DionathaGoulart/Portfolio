"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/*
 * LED mask eyes in the spirit of Wrench's goggles: two grids of square bulbs that show
 * pixel emoticons instead of a face. Cycles on its own; a click jumps to the next one.
 */

type Pattern = string[]; // 7 rows of 7 chars, "#" = bulb on

interface Emotion {
  name: string;
  color: string;
  left: Pattern;
  right?: Pattern; // mirrored face when absent
}

const EMOTIONS: Emotion[] = [
  {
    name: "feliz",
    color: "var(--ds-cyan)",
    left: [".......", "...#...", "..#.#..", ".#...#.", "#.....#", ".......", "......."],
  },
  {
    name: "hackeado",
    color: "var(--ds-magenta)",
    left: ["#.....#", ".#...#.", "..#.#..", "...#...", "..#.#..", ".#...#.", "#.....#"],
  },
  {
    name: "amor",
    color: "var(--ds-red)",
    left: [".......", ".##.##.", "#######", "#######", ".#####.", "..###..", "...#..."],
  },
  {
    name: "bravo",
    color: "var(--ds-yellow)",
    left: ["#......", ".##....", "..###..", "...####", ".......", ".......", "......."],
    right: ["......#", "....##.", "..###..", "####...", ".......", ".......", "......."],
  },
  {
    name: "confuso",
    color: "var(--ds-violet)",
    left: ["..###..", ".#...#.", ".....#.", "...##..", "...#...", ".......", "...#..."],
  },
  {
    name: "atento",
    color: "var(--ds-white)",
    left: ["..###..", ".#...#.", "#..#..#", "#.###.#", "#..#..#", ".#...#.", "..###.."],
  },
];

function Eye({ pattern, color, bulb }: { pattern: Pattern; color: string; bulb: number }) {
  return (
    <div
      className="grid gap-[3px] p-2 bg-[var(--ds-black)] border-2 border-[#2a2a36]"
      style={
        {
          "--ds-led": color,
          gridTemplateColumns: `repeat(7, ${bulb}px)`,
        } as React.CSSProperties
      }
    >
      {pattern.flatMap((row, y) =>
        [...row].map((c, x) => (
          <span key={`${x}-${y}`} className={cn("ds-bulb", c === "#" && "on")} />
        ))
      )}
    </div>
  );
}

export function LedEyes({
  size = "md",
  showLabel = true,
}: {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % EMOTIONS.length), 2200);
    return () => clearInterval(t);
  }, []);

  const e = EMOTIONS[i % EMOTIONS.length]!;
  const right = e.right ?? e.left;
  const bulb = { sm: 6, md: 10, lg: 16 }[size];

  return (
    <button
      type="button"
      onClick={() => setI((n) => (n + 1) % EMOTIONS.length)}
      className="inline-flex flex-col items-center gap-3 cursor-pointer"
      aria-label={`Olhos de LED: ${e.name}. Clique para trocar.`}
    >
      <span className="flex gap-3 md:gap-4">
        <Eye pattern={e.left} color={e.color} bulb={bulb} />
        <Eye pattern={right} color={e.color} bulb={bulb} />
      </span>
      {showLabel && (
        <span className="ds-pixel text-lg uppercase" style={{ color: e.color }}>
          modo: {e.name}
        </span>
      )}
    </button>
  );
}
