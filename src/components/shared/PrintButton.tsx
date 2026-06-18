"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRef, useState } from "react";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function PrintButton({
  persona,
  content,
}: {
  persona: "DEV" | "TI";
  content?: string;
}) {
  const isTi = persona === "TI";
  const hiddenRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!content || !hiddenRef.current) return;

    setIsGenerating(true);
    try {
      // @ts-ignore - html2pdf doesn't have official types easily available
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: [15, 15] as [number, number],
        filename: isTi
          ? "cv-ti-dionatha-goulart.pdf"
          : "cv-dev-dionatha-goulart.pdf",
        image: { type: "jpeg", quality: 0.98 } as const,
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" } as const,
      };

      await html2pdf().set(opt).from(hiddenRef.current).save();
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={cn(
          "uppercase font-mono transition-all duration-200 disabled:opacity-50 cursor-pointer",
          "border border-accent/30 bg-accent/5 px-3 py-1.5 md:px-4 md:py-2 text-accent hover:bg-accent hover:text-white text-[10px] md:text-xs flex items-center gap-2 group",
        )}
      >
        {isGenerating ? (
          <span className="animate-pulse">_EXECUTING...</span>
        ) : (
          <>
            <span className="opacity-40 group-hover:opacity-100">{">"}</span>
            <span>
              {persona === "DEV" ? "DOWNLOAD_CV.SH" : "[GET_CV.BIN]"}
            </span>
          </>
        )}
      </button>

      {/* Hidden element for PDF generation - Styled Traditionally */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div
          ref={hiddenRef}
          className="p-10 bg-white text-black font-sans leading-normal w-[210mm]"
          style={{ minHeight: "297mm" }}
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
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || ""}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}
