"use client";
import { motion } from "framer-motion";
import { Logo } from "@/components/shared/Logo";
import { devContent } from "@/data/dev-config";

interface DevCVViewerProps {
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
        <div key={i} className="mt-5 mb-0.5 font-mono">
          <div className="text-sm font-black uppercase tracking-tighter text-foreground">
            <span className="text-accent mr-2">$</span>
            {parts[0]?.replace(/\*\*/g, "").trim()}
            {parts[1] && (
              <span className="text-accent/60 ml-2 text-xs normal-case tracking-widest font-normal">
                // {parts[1].replace(/\*\*/g, "").trim()}
              </span>
            )}
          </div>
        </div>
      );
      i++; continue;
    }

    if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      result.push(
        <div key={i} className="font-mono text-[10px] text-accent/50 uppercase tracking-widest mb-2 pl-4">
          # {line.replace(/\*/g, "")}
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
        <ul key={`ul-${i}`} className="space-y-1.5 mb-3 font-mono">
          {bulletLines.map((b, j) => {
            const parts = b.split(/(\*\*[^*]+\*\*)/g);
            return (
              <li key={j} className="flex items-start gap-2 text-xs text-foreground/70 leading-relaxed pl-2">
                <span className="text-accent font-black shrink-0 mt-0.5">›</span>
                <span>
                  {parts.map((p, k) =>
                    p.startsWith("**") ? (
                      <strong key={k} className="text-accent font-black">{p.replace(/\*\*/g, "")}</strong>
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
      <p key={i} className="text-xs text-foreground/70 leading-relaxed mb-2 font-mono pl-2">
        {parts.map((p, k) =>
          p.startsWith("**") ? (
            <strong key={k} className="text-accent font-black">{p.replace(/\*\*/g, "")}</strong>
          ) : p
        )}
      </p>
    );
    i++;
  }
  return result;
}

export default function DevCVViewer({ content }: DevCVViewerProps) {
  const { name, subtitle, contact, sections } = parseCV(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="retro-border bg-card retro-shadow overflow-hidden"
    >
      {/* Terminal Header Bar */}
      <div className="bg-accent/10 border-b-2 border-accent flex justify-center sm:justify-between items-center px-6 py-3 shrink-0">
        <div className="hidden sm:flex gap-2.5 shrink-0">
          <div className="w-3.5 h-3.5 rounded-full bg-accent" />
          <div className="w-3.5 h-3.5 rounded-full bg-accent/40" />
          <div className="w-3.5 h-3.5 rounded-full bg-accent/20" />
        </div>
        <div className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent/60">
          root@dg-os: ~/workspace/curriculum-vitae
        </div>
        <div className="hidden sm:flex gap-1.5 shrink-0">
          <div className="w-6 h-1 bg-accent/40" />
          <div className="w-6 h-1 bg-accent/20" />
        </div>
      </div>

      {/* CV Content */}
      <div>
        <div className="p-6 sm:p-8 md:p-10 relative overflow-hidden">
          {/* Watermark logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.03] pointer-events-none">
            <Logo className="w-full h-full text-accent" />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Header block */}
            <div className="font-mono space-y-1 pb-6 border-b border-accent/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-accent font-bold text-sm">dionatha@linux:~$</span>
                <span className="text-foreground/60 text-sm">cat cv.md</span>
              </div>
              <div className="pl-6 border-l-2 border-accent/20">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase text-foreground">
                  {name}
                </h1>
                <p className="text-[10px] md:text-xs text-accent/70 uppercase tracking-widest font-bold mt-1 mb-3">
                  // {subtitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {contact.split("|").map((c, i) => (
                    <span key={i} className="border border-accent/20 bg-accent/5 px-2 py-0.5 text-[10px] text-foreground/50 uppercase tracking-widest">
                      {c.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sections */}
            {sections.map((section, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-accent font-bold text-sm">dionatha@linux:~$</span>
                  <span className="text-foreground/60 text-sm">cat {section.heading.toLowerCase().replace(/\s+/g, "_")}.md</span>
                </div>
                <div className="pl-6 border-l-2 border-accent/10">
                  {renderBody(section.body)}
                </div>
              </div>
            ))}

            {/* Blinking cursor */}
            <div className="flex items-center gap-3 font-mono pt-2">
              <span className="text-accent font-bold text-sm">dionatha@linux:~$</span>
              <span className="w-2.5 h-5 bg-accent animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-accent text-white px-4 py-1.5 flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.3em]">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            Connected: SSH/LOCAL
          </span>
          <span className="hidden sm:inline opacity-60">● 127.0.0.1</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="opacity-60 hidden md:inline">CV_MODE: READ_ONLY</span>
          <span className="bg-white text-accent px-2 font-black py-0.5">DG_ROOT_ACCESS</span>
        </div>
      </div>
    </motion.div>
  );
}
