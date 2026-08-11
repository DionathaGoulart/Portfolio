"use client";
import { motion } from "framer-motion";
import { parseCV, parseContactEntry, toBlocks, splitBold } from "@/lib/cv-parser";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { WindowDots } from "@/components/ui/WindowDots";

interface DevCVViewerProps {
  content: string;
}

function inline(text: string) {
  return splitBold(text).map((token, k) =>
    token.bold ? (
      <strong key={k} className="text-accent font-black">
        {token.text}
      </strong>
    ) : (
      token.text
    )
  );
}

function renderBody(lines: string[]) {
  return toBlocks(lines).map((block, i) => {
    switch (block.kind) {
      case "heading":
        return (
          <div key={i} className="mt-5 mb-0.5 font-mono">
            <div className="text-sm font-black uppercase tracking-tighter text-base-content">
              <span className="text-accent mr-2">$</span>
              {block.title}
              {block.note && (
                <span className="text-accent/60 ml-2 text-xs normal-case tracking-widest font-normal">
                  {"// "}
                  {block.note}
                </span>
              )}
            </div>
          </div>
        );
      case "note":
        return (
          <div
            key={i}
            className="font-mono text-[10px] text-accent/50 uppercase tracking-widest mb-2 pl-4"
          >
            # {block.text}
          </div>
        );
      case "bullets":
        return (
          <ul key={i} className="space-y-1.5 mb-3 font-mono">
            {block.items.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-2 text-xs text-base-content/70 leading-relaxed pl-2"
              >
                <span className="text-accent font-black shrink-0 mt-0.5">›</span>
                <span>{inline(item)}</span>
              </li>
            ))}
          </ul>
        );
      case "paragraph":
        return (
          <p key={i} className="text-xs text-base-content/70 leading-relaxed mb-2 font-mono pl-2">
            {inline(block.text)}
          </p>
        );
    }
  });
}

export default function DevCVViewer({ content }: DevCVViewerProps) {
  const { name, subtitle, contact, sections } = parseCV(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="retro-border bg-base-200 retro-shadow overflow-hidden"
    >
      {/* Terminal Header Bar */}
      <div className="bg-accent/10 border-b-2 border-accent flex justify-center sm:justify-between items-center px-6 py-3 shrink-0">
        <WindowDots size="lg" className="hidden sm:flex gap-2.5 shrink-0" />
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
          <LogoWatermark variant="badge" />

          <div className="relative z-10 space-y-6">
            {/* Header block */}
            <div className="font-mono space-y-1 pb-6 border-b border-accent/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-accent font-bold text-sm">dionatha@linux:~$</span>
                <span className="text-base-content/60 text-sm">cat cv.md</span>
              </div>
              <div className="pl-6 border-l-2 border-accent/20">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase text-base-content">
                  {name}
                </h1>
                <p className="text-[10px] md:text-xs text-accent/70 uppercase tracking-widest font-bold mt-1 mb-3">
                  {"// "}
                  {subtitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {contact.split("|").map((entry, i) => {
                    const { label, href } = parseContactEntry(entry);
                    return (
                      <span
                        key={i}
                        className="border border-accent/20 bg-accent/5 px-2 py-0.5 text-[10px] text-base-content/50 uppercase tracking-widest"
                      >
                        {href ? (
                          <a href={href} className="hover:text-accent transition-colors">
                            {label}
                          </a>
                        ) : (
                          label
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sections */}
            {sections.map((section, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-accent font-bold text-sm">dionatha@linux:~$</span>
                  <span className="text-base-content/60 text-sm">
                    cat {section.heading.toLowerCase().replace(/\s+/g, "_")}.md
                  </span>
                </div>
                <div className="pl-6 border-l-2 border-accent/10">{renderBody(section.body)}</div>
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
      <div className="bg-accent text-accent-content px-4 py-1.5 flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.3em]">
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
