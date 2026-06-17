"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function PrintButton({ persona }: { persona: "DEV" | "TI" }) {
  const isDev = persona === "DEV";
  
  return (
    <button 
      onClick={() => window.print()} 
      className={cn(
        "text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg",
        isDev 
          ? "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20" 
          : "bg-green-600 hover:bg-green-500 shadow-green-900/20"
      )}
    >
      Baixar PDF
    </button>
  );
}
