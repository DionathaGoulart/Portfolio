/** Small formatters shared by the dev skin's graphic sections and its terminal mode. */

const BAR_BLOCKS = 20;

/** Renders a percentage as `████▒▒▒▒`, the skill meter of both the About grid and `cat skills`. */
export function asciiBar(level: number, blocks = BAR_BLOCKS): string {
  const active = Math.floor((level / 100) * blocks);
  return "█".repeat(active) + "▒".repeat(blocks - active);
}

/** Skill name as a fake system file, e.g. "React / Next.js" -> `react_next.js.sys`. */
export function skillFilename(name: string): string {
  return `${name.toLowerCase().replace(/[\s/]+/g, "_")}.sys`;
}

/** Stable pseudo commit hash for an experience entry, so `cat experience` looks like a git log. */
export function fakeCommitHash(seed: string): string {
  return (
    seed
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .substring(0, 8) + "db39"
  );
}
