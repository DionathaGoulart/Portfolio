import Link from "next/link";

export const metadata = {
  title: "404 — Rota não encontrada",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-8">
      <div className="retro-border bg-base-200 retro-shadow px-8 py-10 md:px-16 md:py-14 max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
          HTTP 404 · NOT_FOUND
        </p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
          404
        </h1>
        <p className="mt-6 font-bold uppercase tracking-tight opacity-70">
          Essa rota não existe neste sistema.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 retro-border bg-accent text-accent-content px-8 py-3 font-black uppercase text-sm hover:bg-base-content transition-colors"
        >
          Voltar ao hub
        </Link>
      </div>
    </main>
  );
}
