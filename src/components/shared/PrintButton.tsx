"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Persona } from "@/types/content";
import type { Skin } from "@/data/theme-config";

interface MarkdownRenderer {
  ReactMarkdown: typeof import("react-markdown").default;
  remarkGfm: typeof import("remark-gfm").default;
}

/**
 * react-markdown and remark-gfm are only ever needed to build the PDF, but importing them
 * at module scope put ~150KB of markdown machinery in both CV routes' initial bundle for
 * every visitor, most of whom never download anything.
 *
 * They now load on the first click. The print DOM cannot be handed to html2pdf until React
 * has actually committed it, so the click loads the renderer and bumps a request counter,
 * and the effect below — which runs after that commit — produces the file. The markup fed
 * to html2pdf is unchanged, so the PDF is identical to the statically imported version.
 */
interface PrintButtonProps {
  /** Picks the PDF file name. */
  persona: Persona;
  /** Picks the button's look; the PDF itself is the same in both skins. */
  skin: Skin;
  content?: string;
}

export function PrintButton({ persona, skin, content }: PrintButtonProps) {
  const isShell = skin === "terminal";
  const hiddenRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [markdown, setMarkdown] = useState<MarkdownRenderer | null>(null);
  const [saveRequest, setSaveRequest] = useState(0);
  const lastSaved = useRef(0);

  const handleDownload = async () => {
    if (!content || isGenerating) return;

    setIsGenerating(true);
    try {
      if (!markdown) {
        const [reactMarkdown, gfm] = await Promise.all([
          import("react-markdown"),
          import("remark-gfm"),
        ]);
        setMarkdown({ ReactMarkdown: reactMarkdown.default, remarkGfm: gfm.default });
      }
      setSaveRequest((n) => n + 1);
    } catch (error) {
      console.error("Erro ao carregar o renderizador do PDF:", error);
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!saveRequest || saveRequest === lastSaved.current) return;
    if (!markdown || !hiddenRef.current) return;

    lastSaved.current = saveRequest;
    let cancelled = false;

    (async () => {
      try {
        const html2pdf = (await import("html2pdf.js")).default;
        if (cancelled || !hiddenRef.current) return;

        await html2pdf()
          .set({
            margin: [15, 15] as [number, number],
            filename: `cv-${persona}-dionatha-goulart.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .from(hiddenRef.current)
          .save();
      } catch (error) {
        console.error("Erro ao gerar PDF:", error);
      } finally {
        if (!cancelled) setIsGenerating(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [saveRequest, markdown, persona]);

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={cn(
          "uppercase transition-all duration-200 disabled:opacity-50 cursor-pointer flex items-center gap-2 group",
          isShell
            ? "border border-accent/30 bg-accent/5 px-3 py-1.5 md:px-4 md:py-2 text-accent hover:bg-accent hover:text-accent-content text-[10px] md:text-xs font-mono"
            : "retro-border bg-base-200 px-4 py-2 retro-shadow-sm font-bold text-sm hover:bg-accent hover:text-accent-content"
        )}
      >
        {isGenerating ? (
          <span className="animate-pulse">{isShell ? "_EXECUTING..." : "Gerando..."}</span>
        ) : (
          <>
            {isShell ? (
              <>
                <span className="opacity-40 group-hover:opacity-100">{">"}</span>
                <span>DOWNLOAD_CV.SH</span>
              </>
            ) : (
              <span>Baixar Currículo</span>
            )}
          </>
        )}
      </button>

      {/*
        Hidden element for PDF generation. Off-screen positioning alone still exposed a
        second copy of the whole CV — headings included — to screen readers and the tab
        order, which is why both CV routes reported two h1s.
      */}
      {markdown && (
        <div aria-hidden="true" inert style={{ position: "absolute", left: "-9999px", top: 0 }}>
          <div
            ref={hiddenRef}
            /* A4 is 210x297mm and html2pdf applies its 15mm margins on top of the source,
               so a full-width element pushed ~30mm of every line off the page. Sizing the
               source to the printable area keeps the text inside it. */
            className="p-10 bg-white text-black font-sans leading-normal w-[180mm]"
            style={{ minHeight: "267mm" }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                .pdf-content { font-family: Arial, sans-serif; color: #1a1a1a; }
                .pdf-content h1 { font-size: 28pt; font-weight: 800; margin-bottom: 4pt; color: #000; letter-spacing: -0.02em; }
                .pdf-content h2 { font-size: 16pt; font-weight: 700; margin-top: 20pt; margin-bottom: 10pt; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 4pt; text-transform: uppercase; letter-spacing: 0.05em; }
                .pdf-content h3 { font-size: 12pt; font-weight: 700; margin-top: 12pt; margin-bottom: 2pt; color: #111; }
                .pdf-content p { font-size: 10.5pt; margin-bottom: 6pt; color: #374151; }
                .pdf-content ul { margin-bottom: 10pt; padding-left: 15pt; }
                .pdf-content li { font-size: 10.5pt; margin-bottom: 3pt; color: #374151; list-style-type: disc; }
                .pdf-content a { color: #2563eb; text-decoration: none; }
                .pdf-content hr { border: 0; border-top: 1px solid #e5e7eb; margin: 15pt 0; }
            `,
              }}
            />
            <div className="pdf-content">
              <markdown.ReactMarkdown remarkPlugins={[markdown.remarkGfm]}>
                {content || ""}
              </markdown.ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
