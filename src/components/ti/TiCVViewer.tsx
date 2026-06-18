"use client";
import { motion } from "framer-motion";

interface TiCVViewerProps {
  content: string;
}

function parseCV(md: string) {
  const lines = md.split("\n");
  const sections: { heading: string; body: string[] }[] = [];
  let name = "";
  let subtitle = "";
  let contact = "";
  let currentSection: { heading: string; body: string[] } | null = null;
  let headerDone = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!headerDone) {
      if (trimmed.startsWith("# ")) { name = trimmed.replace("# ", ""); continue; }
      if (trimmed.startsWith("**") && !subtitle) { subtitle = trimmed.replace(/\*\*/g, ""); continue; }
      if (!subtitle && trimmed === "") continue;
      if (subtitle && !contact && trimmed && !trimmed.startsWith("##") && !trimmed.startsWith("[")) { contact = trimmed; continue; }
      if (trimmed.startsWith("[") || trimmed === "---") continue;
      if (trimmed.startsWith("## ")) headerDone = true;
    }

    if (trimmed.startsWith("## ")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { heading: trimmed.replace(/^##\s+/, "").replace(/^[^\w\s]+\s*/, ""), body: [] };
    } else if (trimmed.startsWith("### ")) {
      currentSection?.body.push(`__H3__${trimmed.replace(/^###\s+/, "")}`);
    } else if (currentSection) {
      currentSection.body.push(trimmed);
    }
  }
  if (currentSection) sections.push(currentSection);
  return { name, subtitle, contact, sections };
}

function renderBody(lines: string[]) {
  const result: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line || line === "---") { i++; continue; }

    if (line.startsWith("__H3__")) {
      const text = line.replace("__H3__", "");
      const parts = text.split("|");
      result.push(
        <div key={i} className="mt-5 mb-1">
          <div className="font-black text-sm md:text-base uppercase tracking-tighter text-foreground">
            {parts[0]?.replace(/\*\*/g, "").trim()}
            {parts[1] && (
              <span className="text-accent ml-2 font-mono text-xs normal-case tracking-widest">
                | {parts[1].replace(/\*\*/g, "").trim()}
              </span>
            )}
          </div>
        </div>
      );
      i++; continue;
    }

    if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      result.push(
        <div key={i} className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest mb-2">
          {line.replace(/\*/g, "")}
        </div>
      );
      i++; continue;
    }

    if (line.startsWith("- ")) {
      const bulletLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        bulletLines.push(lines[i].replace(/^- /, ""));
        i++;
      }
      result.push(
        <ul key={`ul-${i}`} className="space-y-1.5 mb-3">
          {bulletLines.map((b, j) => {
            const parts = b.split(/(\*\*[^*]+\*\*)/g);
            return (
              <li key={j} className="flex items-start gap-2 text-sm text-foreground/70 leading-relaxed">
                <span className="text-accent font-black shrink-0 mt-0.5">›</span>
                <span>
                  {parts.map((p, k) =>
                    p.startsWith("**") ? (
                      <strong key={k} className="text-foreground font-black">{p.replace(/\*\*/g, "")}</strong>
                    ) : p
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      );
      continue;
    }

    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    result.push(
      <p key={i} className="text-sm text-foreground/70 leading-relaxed mb-2">
        {parts.map((p, k) =>
          p.startsWith("**") ? (
            <strong key={k} className="text-foreground font-black">{p.replace(/\*\*/g, "")}</strong>
          ) : p
        )}
      </p>
    );
    i++;
  }
  return result;
}

export default function TiCVViewer({ content }: TiCVViewerProps) {
  const { name, subtitle, contact, sections } = parseCV(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="retro-border bg-card retro-shadow relative overflow-hidden"
    >
      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

      {/* Header */}
      <div className="border-b-2 border-border-custom bg-background px-6 md:px-10 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-accent font-black">CURRICULUM_VITAE.EXE</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <div className="w-2.5 h-2.5 rounded-full bg-border-custom" />
          <div className="w-2.5 h-2.5 rounded-full bg-border-custom" />
        </div>
      </div>

      <div className="p-6 sm:p-8 md:p-12">
        {/* Name & Contact */}
        <div className="mb-10 pb-8 border-b border-border-custom/20">
          <span className="font-mono text-accent text-[10px] uppercase tracking-widest font-bold mb-3 block">
            {">"} init_profile.sh
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase mb-2">
            {name}
          </h1>
          <p className="text-xs md:text-sm font-bold text-foreground/50 uppercase tracking-widest mb-6">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {contact.split("|").map((c, i) => (
              <span
                key={i}
                className="retro-border bg-background px-3 py-1.5 font-mono text-[10px] text-foreground/60 uppercase tracking-widest"
              >
                {c.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="pb-8 border-b border-border-custom/10 last:border-0 last:pb-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] text-accent font-black shrink-0">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <h2 className="font-black text-sm md:text-base uppercase tracking-tighter">
                  {section.heading}
                </h2>
                <div className="flex-1 h-px bg-border-custom/20" />
              </div>
              {renderBody(section.body)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
