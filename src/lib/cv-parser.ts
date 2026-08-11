/**
 * Parses the CV markdown in src/data into a structure both persona viewers render.
 *
 * The two viewers used to carry byte-identical copies of this logic plus their own
 * near-identical block walkers. Parsing lives here; each viewer only maps blocks to JSX.
 */

export interface CvSection {
  heading: string;
  body: string[];
}

export interface ParsedCv {
  name: string;
  subtitle: string;
  contact: string;
  sections: CvSection[];
}

/** Marker the parser puts on `### ` lines so the block walker can tell them apart. */
const H3_MARKER = "__H3__";

export function parseCV(md: string): ParsedCv {
  const lines = md.split("\n");
  const sections: CvSection[] = [];
  let name = "";
  let subtitle = "";
  let contact = "";
  let currentSection: CvSection | null = null;
  let headerDone = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!headerDone) {
      if (trimmed.startsWith("# ")) {
        name = trimmed.replace("# ", "");
        continue;
      }
      if (trimmed.startsWith("**") && !subtitle) {
        subtitle = trimmed.replace(/\*\*/g, "");
        continue;
      }
      if (!subtitle && trimmed === "") continue;
      if (
        subtitle &&
        !contact &&
        trimmed &&
        !trimmed.startsWith("##") &&
        !trimmed.startsWith("[")
      ) {
        contact = trimmed;
        continue;
      }
      if (trimmed.startsWith("[") || trimmed === "---") continue;
      if (trimmed.startsWith("## ")) headerDone = true;
    }

    if (trimmed.startsWith("## ")) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        heading: trimmed.replace(/^##\s+/, "").replace(/^[^\w\s]+\s*/, ""),
        body: [],
      };
    } else if (trimmed.startsWith("### ")) {
      currentSection?.body.push(`${H3_MARKER}${trimmed.replace(/^###\s+/, "")}`);
    } else if (currentSection) {
      currentSection.body.push(trimmed);
    }
  }

  if (currentSection) sections.push(currentSection);
  return { name, subtitle, contact, sections };
}

export type CvBlock =
  /** `### Role | Company` — `note` is the part after the pipe, when present. */
  | { kind: "heading"; title: string; note?: string }
  /** A whole line wrapped in single asterisks, used for the period line. */
  | { kind: "note"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "paragraph"; text: string };

/** Splits a section body into renderable blocks. Presentation is left to the caller. */
export function toBlocks(lines: string[]): CvBlock[] {
  const blocks: CvBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line || line === "---") {
      i++;
      continue;
    }

    if (line.startsWith(H3_MARKER)) {
      const [title = "", note] = line.replace(H3_MARKER, "").split("|");
      blocks.push({
        kind: "heading",
        title: stripBoldMarkers(title),
        ...(note ? { note: stripBoldMarkers(note) } : {}),
      });
      i++;
      continue;
    }

    if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      blocks.push({ kind: "note", text: line.replace(/\*/g, "") });
      i++;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      let bullet = lines[i];
      while (bullet !== undefined && bullet.startsWith("- ")) {
        items.push(bullet.replace(/^- /, ""));
        i++;
        bullet = lines[i];
      }
      blocks.push({ kind: "bullets", items });
      continue;
    }

    blocks.push({ kind: "paragraph", text: line });
    i++;
  }

  return blocks;
}

export interface ContactEntry {
  label: string;
  href?: string;
}

/**
 * One `|`-separated piece of the contact line. The e-mail is written as a markdown link,
 * and the viewers print these as plain chips — so `[a@b.com](mailto:a@b.com)` was being
 * shown verbatim on both CV pages.
 */
export function parseContactEntry(entry: string): ContactEntry {
  const trimmed = entry.trim();
  const link = trimmed.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  return link ? { label: link[1] ?? trimmed, href: link[2] } : { label: trimmed };
}

export interface InlineToken {
  bold: boolean;
  text: string;
}

/** Turns `plain **bold** plain` into tokens so viewers can style the bold runs themselves. */
export function splitBold(text: string): InlineToken[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter((part) => part !== "")
    .map((part) =>
      part.startsWith("**")
        ? { bold: true, text: part.replace(/\*\*/g, "") }
        : { bold: false, text: part }
    );
}

function stripBoldMarkers(text: string): string {
  return text.replace(/\*\*/g, "").trim();
}
