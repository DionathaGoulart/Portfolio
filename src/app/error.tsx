"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-8">
      <div className="retro-border bg-base-200 retro-shadow px-8 py-10 md:px-16 md:py-14 max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
          HTTP 500 · UNHANDLED_EXCEPTION
        </p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
          Erro
        </h1>
        <p className="mt-6 font-bold uppercase tracking-tight opacity-70">
          Algo quebrou ao renderizar esta rota.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest opacity-40">
            digest: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="mt-8 retro-border bg-accent text-accent-content px-8 py-3 font-black uppercase text-sm hover:bg-base-content transition-colors cursor-pointer"
        >
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
