"use client";
import { motion } from "framer-motion";
import { parseCV, parseContactEntry, toBlocks, splitBold } from "@/lib/cv-parser";
import { WindowDots } from "@/components/retro/ui/WindowDots";

interface TiCVViewerProps {
  content: string;
}

function inline(text: string) {
  return splitBold(text).map((token, k) =>
    token.bold ? (
      <strong key={k} className="text-base-content font-black">
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
          <div key={i} className="mt-5 mb-1">
            <div className="font-black text-sm md:text-base uppercase tracking-tighter text-base-content">
              {block.title}
              {block.note && (
                <span className="text-accent ml-2 font-mono text-xs normal-case tracking-widest">
                  | {block.note}
                </span>
              )}
            </div>
          </div>
        );
      case "note":
        return (
          <div
            key={i}
            className="font-mono text-[10px] text-base-content/40 uppercase tracking-widest mb-2"
          >
            {block.text}
          </div>
        );
      case "bullets":
        return (
          <ul key={i} className="space-y-1.5 mb-3">
            {block.items.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-2 text-sm text-base-content/70 leading-relaxed"
              >
                <span className="text-accent font-black shrink-0 mt-0.5">›</span>
                <span>{inline(item)}</span>
              </li>
            ))}
          </ul>
        );
      case "paragraph":
        return (
          <p key={i} className="text-sm text-base-content/70 leading-relaxed mb-2">
            {inline(block.text)}
          </p>
        );
    }
  });
}

export default function TiCVViewer({ content }: TiCVViewerProps) {
  const { name, subtitle, contact, sections } = parseCV(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="retro-border bg-base-200 retro-shadow relative overflow-hidden"
    >
      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

      {/* Header */}
      <div className="border-b-2 border-base-300 bg-base-100 px-6 md:px-10 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-accent font-black">CURRICULUM_VITAE.EXE</span>
        </div>
        <WindowDots />
      </div>

      <div className="p-6 sm:p-8 md:p-12">
        {/* Name & Contact */}
        <div className="mb-10 pb-8 border-b border-base-300/20">
          <span className="font-mono text-accent text-[10px] uppercase tracking-widest font-bold mb-3 block">
            {">"} init_profile.sh
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase mb-2">
            {name}
          </h1>
          <p className="text-xs md:text-sm font-bold text-base-content/50 uppercase tracking-widest mb-6">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {contact.split("|").map((entry, i) => {
              const { label, href } = parseContactEntry(entry);
              return (
                <span
                  key={i}
                  className="retro-border bg-base-100 px-3 py-1.5 font-mono text-[10px] text-base-content/60 uppercase tracking-widest"
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

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="pb-8 border-b border-base-300/10 last:border-0 last:pb-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] text-accent font-black shrink-0">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <h2 className="font-black text-sm md:text-base uppercase tracking-tighter">
                  {section.heading}
                </h2>
                <div className="flex-1 h-px bg-base-300/20" />
              </div>
              {renderBody(section.body)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
