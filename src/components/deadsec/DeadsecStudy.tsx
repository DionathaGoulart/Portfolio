"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LedEyes } from "./LedEyes";
import { PhotoLab } from "./PhotoLab";
import "./deadsec.css";

/*
 * DEADSEC — temporary visual study, not a skin. The direction of Watch Dogs 2's hacker
 * collective, element by element, so it can be judged before anything is built for real:
 * dithering, ASCII, pixel art and glitch art; a clean corporate UI defaced by a dark
 * underground one; spray tags; LED emoticon eyes; a playful, colourful tone.
 * Everything here is original (no game logos); "DG_SEC" and "OMNI_OS" are stand-ins.
 * Strings live in this file because the page is throwaway; a real skin moves them to config.
 */

// Original ASCII mark: a skull with X eyes, drawn in characters like the collective's logo.
const ASCII_MARK = String.raw`
    .-"""""""-.
   /           \
  |  \/     \/  |
  |  /\     /\  |
  |      ^      |
   \  |'"'"'|  /
    '-|_|_|_|-'
`;

const PIXEL_SKULL = [
  "...#####...",
  "..#######..",
  ".#########.",
  ".#.#.#.#.#.",
  ".##.###.##.",
  ".#.#.#.#.#.",
  ".#########.",
  "..###.###..",
  "...#####...",
  "...#.#.#...",
  "...#####...",
];

function PixelSkull({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 11 11" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {PIXEL_SKULL.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
          ) : null
        )
      )}
    </svg>
  );
}

/**
 * Spray-painted word with a few drips. `className` positions the tag (it lands on an
 * outer wrapper, so `absolute` works); the inner span carries the paint and the drips.
 */
function Tag({
  text,
  color,
  className,
  rotate = -8,
}: {
  text: string;
  color: string;
  className?: string;
  rotate?: number;
}) {
  return (
    <span className={`inline-block pointer-events-none ${className ?? ""}`}>
      <span
        className="ds-tagfont ds-spray relative inline-block leading-none"
        style={{ color, transform: `rotate(${rotate}deg)` }}
      >
        {text}
        <span className="ds-drip" style={{ left: "18%", top: "85%", height: "34px" }} />
        <span
          className="ds-drip"
          style={{ left: "52%", top: "88%", height: "22px", animationDelay: "0.6s" }}
        />
        <span
          className="ds-drip"
          style={{ left: "81%", top: "84%", height: "46px", animationDelay: "1.1s" }}
        />
      </span>
    </span>
  );
}

// Hooded figure of the recruitment video, as pixel art (16x14).
const HOOD = [
  "......####......",
  "....########....",
  "...##########...",
  "..############..",
  ".###........###.",
  ".##..........##.",
  "##............##",
  "##............##",
  "##............##",
  ".##..........##.",
  ".###........###.",
  "..############..",
  ".##############.",
  "################",
];

function PixelHood({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 14" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {HOOD.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
          ) : null
        )
      )}
    </svg>
  );
}

function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="ds-pixel text-2xl text-[var(--ds-yellow)]">[{id}]</span>
          <h2 className="ds-pixel text-3xl md:text-4xl uppercase tracking-wider">{title}</h2>
          <div className="flex-1 h-[2px] bg-[var(--ds-white)] opacity-20" />
        </div>
        {note && <p className="text-xs md:text-sm opacity-60 max-w-3xl">{note}</p>}
      </div>
      {children}
    </section>
  );
}

function Timecode() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return <>{`00:${pad(Math.floor(t / 60) % 60)}:${pad(t % 60)}`}</>;
}

// Network graph: nodes get "hacked" as the magenta links reach them.
const NODES = [
  { x: 60, y: 150, label: "você" },
  { x: 220, y: 60, label: "câmera" },
  { x: 230, y: 240, label: "semáforo" },
  { x: 400, y: 150, label: "servidor" },
  { x: 560, y: 70, label: "banco" },
  { x: 570, y: 230, label: "omni_os" },
];
const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
];

const PALETTE = [
  { name: "Void", v: "--ds-black", hex: "#070708" },
  { name: "Panel", v: "--ds-panel", hex: "#14141C" },
  { name: "Bone", v: "--ds-white", hex: "#F4F1EA" },
  { name: "Magenta", v: "--ds-magenta", hex: "#FF1F8E" },
  { name: "Cyan", v: "--ds-cyan", hex: "#19F7FF" },
  { name: "Yellow", v: "--ds-yellow", hex: "#FFF200" },
  { name: "Violet", v: "--ds-violet", hex: "#7B2CFF" },
  { name: "Alert", v: "--ds-red", hex: "#FF3131" },
];

const PATCHES = [
  { text: "DG_SEC", bg: "--ds-magenta", fg: "--ds-black", rot: -6 },
  { text: "open source", bg: "--ds-yellow", fg: "--ds-black", rot: 4 },
  { text: "no ctrl", bg: "--ds-cyan", fg: "--ds-black", rot: -3 },
  { text: "hack the planet", bg: "--ds-violet", fg: "--ds-white", rot: 6 },
];
const PINS = [
  { text: ":)", bg: "--ds-yellow", rot: -12 },
  { text: "</>", bg: "--ds-cyan", rot: 8 },
  { text: "X_X", bg: "--ds-magenta", rot: -4 },
  { text: "<3", bg: "--ds-red", rot: 10 },
  { text: "404", bg: "--ds-white", rot: -8 },
];

export function DeadsecStudy() {
  return (
    <div className="deadsec">
      {/* Rough edge for spray paint, referenced by .ds-spray */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="ds-spray-rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="4" />
        </filter>
      </svg>
      <div className="ds-scanlines" />
      <div className="ds-noise" />
      <div className="ds-vhs-bar" />

      <div className="relative z-10 bg-[var(--ds-yellow)] text-[var(--ds-black)] px-4 py-2 flex flex-wrap justify-between gap-2 text-xs font-black uppercase tracking-widest">
        <span>
          Estudo visual temporário — estética DedSec (Watch Dogs 2). Vira skin ou é apagado.
        </span>
        <Link href="/" className="underline hover:no-underline">
          ← voltar ao site
        </Link>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-24 space-y-24 md:space-y-32">
        {/* 01 — hero */}
        <Section
          id="01"
          title="Composição de hero"
          note="Tudo junto: marca em ASCII, nome com glitch, olhos de LED e uma pichação por cima — o tom é de coletivo hacker brincalhão, não de distopia sombria."
        >
          <div className="ds-grid-bg ds-panel ds-panel-glow ds-cut p-6 sm:p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-10 items-center overflow-hidden relative">
            <div className="md:col-span-7 space-y-6 relative z-10">
              <p className="ds-pixel text-xl md:text-2xl text-[var(--ds-cyan)]">
                &gt; transmissão recebida<span className="ds-blink">_</span>
              </p>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="ds-display text-5xl sm:text-7xl md:text-8xl leading-[0.9] uppercase"
              >
                <span className="ds-glitch" data-text="Dionatha">
                  Dionatha
                </span>
                <br />
                <span className="ds-glitch text-[var(--ds-magenta)]" data-text="Goulart">
                  Goulart
                </span>
              </motion.h1>
              <p className="text-base md:text-lg font-bold uppercase tracking-tight max-w-xl opacity-80">
                Desenvolvedor fullstack. Eu construo sistemas — e às vezes desmonto alguns pra ver
                como funcionam.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#" className="ds-btn ds-btn-solid">
                  <span>Ver projetos</span>
                </a>
                <a href="#" className="ds-btn ds-btn-outline">
                  <span>Portfólio</span>
                </a>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col items-center gap-8 relative z-10">
              <pre className="text-[var(--ds-white)] text-xs sm:text-sm leading-tight ds-rgb select-none">
                {ASCII_MARK}
              </pre>
              <LedEyes size="sm" showLabel={false} />
            </div>
            <Tag
              text="DG_SEC"
              color="var(--ds-yellow)"
              rotate={-10}
              className="absolute right-6 top-6 text-4xl md:text-6xl opacity-90"
            />
          </div>
        </Section>

        {/* 02 — the four techniques */}
        <Section
          id="02"
          title="As quatro técnicas"
          note="A arte da DedSec é construída com dithering, ASCII, pixel art e glitch. Cada bloco abaixo é uma delas isolada."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="ds-panel p-5 space-y-3">
              <div className="h-32 bg-[var(--ds-black)] relative overflow-hidden">
                <div className="absolute inset-0 ds-dither ds-dither-fade" />
                <div
                  className="absolute inset-0 ds-dither"
                  style={
                    {
                      "--ds-dot": "var(--ds-cyan)",
                      maskImage: "linear-gradient(to left, #000, transparent)",
                      WebkitMaskImage: "linear-gradient(to left, #000, transparent)",
                    } as React.CSSProperties
                  }
                />
              </div>
              <h3 className="ds-pixel text-2xl">Dithering</h3>
              <p className="text-xs opacity-60">
                Degradês feitos de pontos, como impressão barata.
              </p>
            </div>
            <div className="ds-panel p-5 space-y-3">
              <pre className="h-32 flex items-center justify-center text-[8px] leading-tight text-[var(--ds-magenta)] overflow-hidden">
                {ASCII_MARK}
              </pre>
              <h3 className="ds-pixel text-2xl">ASCII</h3>
              <p className="text-xs opacity-60">Imagens e logos desenhados com caracteres.</p>
            </div>
            <div className="ds-panel p-5 space-y-3">
              <div className="h-32 flex items-center justify-center">
                <PixelSkull className="h-24 w-24 text-[var(--ds-yellow)]" />
              </div>
              <h3 className="ds-pixel text-2xl">Pixel art</h3>
              <p className="text-xs opacity-60">Formas em grade dura, sem anti-aliasing.</p>
            </div>
            <div className="ds-panel p-5 space-y-3 ds-tear">
              <div className="h-32 flex items-center justify-center ds-duotone">
                <span className="ds-display text-4xl uppercase">
                  <span className="ds-glitch" data-text="GLITCH">
                    GLITCH
                  </span>
                </span>
              </div>
              <h3 className="ds-pixel text-2xl">Glitch</h3>
              <p className="text-xs opacity-60">Sinal corrompido. Passe o mouse no card.</p>
            </div>
          </div>
        </Section>

        {/* 03 — photo lab */}
        <Section
          id="03"
          title="Sua foto nos três tratamentos"
          note="Processada ao vivo no navegador: dithering ordenado em três níveis (fundo, magenta, ciano), conversão pra ASCII e pixel art com paleta reduzida. Serviria também para os prints dos projetos."
        >
          <PhotoLab src="/me.png" />
        </Section>

        {/* 04 — LED mask */}
        <Section
          id="04"
          title="Olhos de LED"
          note="Inspirado na máscara do Wrench: lâmpadas quadradas que mostram emoticons no lugar de expressão. Troca sozinho — clique para avançar."
        >
          <div className="ds-panel p-10 flex justify-center">
            <LedEyes size="lg" />
          </div>
        </Section>

        {/* 05 — corporate vs graffiti */}
        <Section
          id="05"
          title="Pichação sobre o corporativo"
          note="O coletivo picha a publicidade da cidade inteligente. O anúncio é limpo e confiante; a tag por cima é o comentário."
        >
          <div className="relative max-w-3xl">
            <div className="bg-[var(--ds-paper)] text-[#1b2a4a] p-8 md:p-12 rounded-sm font-sans">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#3b6fd8]">
                OMNI_OS · Smart City
              </p>
              <p className="mt-4 text-4xl md:text-6xl font-light tracking-tight leading-none">
                Sua vida,
                <br />
                <span className="font-semibold">otimizada.</span>
              </p>
              <p className="mt-6 text-sm max-w-sm opacity-70">
                Segurança, conforto e eficiência. Nós cuidamos dos seus dados para você não precisar
                pensar neles.
              </p>
              <div className="mt-8 inline-block rounded-full bg-[#3b6fd8] text-white px-6 py-2 text-sm font-semibold">
                Saiba mais
              </div>
            </div>
            <Tag
              text="MENTIRA"
              color="var(--ds-magenta)"
              rotate={-12}
              className="absolute left-4 md:left-10 top-1/3 text-6xl md:text-8xl"
            />
            <PixelSkull className="absolute right-6 bottom-6 w-20 h-20 md:w-28 md:h-28 text-[var(--ds-black)] opacity-90 rotate-6" />
            <Tag
              text="dg_sec"
              color="var(--ds-cyan)"
              rotate={6}
              className="absolute right-4 top-4 text-3xl md:text-4xl"
            />
          </div>
        </Section>

        {/* 06 — two UIs */}
        <Section
          id="06"
          title="Os dois mundos de interface"
          note="A direção de arte do jogo combina UI limpa e clara com visuais escuros de hacking. Aqui, lado a lado: o app do celular e o console do coletivo."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <div className="w-64 rounded-[2.2rem] border-[8px] border-[#1b1b22] bg-white text-[#1b2a4a] p-5 space-y-4 font-sans shadow-[0_20px_60px_rgba(25,247,255,0.15)]">
                <div className="flex justify-between text-[10px] font-semibold opacity-60">
                  <span>9:41</span>
                  <span>DG_OS</span>
                </div>
                <p className="text-xl font-semibold">Olá, visitante</p>
                {[
                  ["Portfólio", "#ff1f8e"],
                  ["Projetos", "#19c8d6"],
                  ["Contato", "#e5b800"],
                ].map(([app, c]) => (
                  <div
                    key={app}
                    className="flex items-center gap-3 rounded-2xl bg-[#f1f3f7] px-4 py-3"
                  >
                    <span className="w-8 h-8 rounded-xl" style={{ background: c }} />
                    <span className="text-sm font-semibold flex-1">{app}</span>
                    <span className="opacity-40">›</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ds-panel ds-panel-glow p-6 font-mono text-sm space-y-2">
              <p className="text-[var(--ds-cyan)]">
                dg_sec@underground:~${" "}
                <span className="text-[var(--ds-white)]">./infiltrar omni_os</span>
              </p>
              <p>
                <span className="text-[var(--ds-cyan)] font-black">[ok]</span> handshake com
                github.com/DionathaGoulart
              </p>
              <p>
                <span className="text-[var(--ds-cyan)] font-black">[ok]</span> 3 projetos públicos
                encontrados
              </p>
              <p>
                <span className="text-[var(--ds-yellow)] font-black">[..]</span> descriptografando
                portfolio.exe
              </p>
              <p>
                <span className="text-[var(--ds-magenta)] font-black">[!!]</span> habilidade
                excessiva detectada em react
              </p>
              <p className="ds-pixel text-xl text-[var(--ds-cyan)]">
                &gt; <span className="ds-blink">█</span>
              </p>
            </div>
          </div>
        </Section>

        {/* 07 — network hack */}
        <Section
          id="07"
          title="Rede sendo hackeada"
          note="A mecânica central do jogo vira elemento visual: dispositivos conectados, e o sinal magenta tomando cada nó."
        >
          <div className="ds-panel ds-grid-bg p-4 overflow-x-auto">
            <svg viewBox="0 0 640 300" className="w-full min-w-[520px] h-auto font-mono">
              {LINKS.map(([a, b], i) => {
                const A = NODES[a]!;
                const B = NODES[b]!;
                return (
                  <g key={i}>
                    <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#2a2a36" strokeWidth="2" />
                    <line
                      x1={A.x}
                      y1={A.y}
                      x2={B.x}
                      y2={B.y}
                      stroke="var(--ds-magenta)"
                      strokeWidth="3"
                      className="ds-link"
                      style={{ animationDelay: `${i * 0.35}s` }}
                    />
                  </g>
                );
              })}
              {NODES.map((n, i) => (
                <g key={n.label}>
                  <rect
                    x={n.x - 14}
                    y={n.y - 14}
                    width="28"
                    height="28"
                    stroke="var(--ds-white)"
                    strokeWidth="2"
                    className={i === 0 ? "" : "ds-node-pulse"}
                    style={{
                      fill: i === 0 ? "var(--ds-cyan)" : undefined,
                      animationDelay: `${i * 0.35}s`,
                    }}
                  />
                  <text
                    x={n.x}
                    y={n.y + 36}
                    textAnchor="middle"
                    fontSize="13"
                    fill="var(--ds-white)"
                    opacity="0.7"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Section>

        {/* 08 — recruitment video frame */}
        <Section
          id="08"
          title="Transmissão / vídeo de recrutamento"
          note="Os vídeos do coletivo: figura mascarada, gravação de VHS, legenda com voz distorcida. Aqui como quadro estático para hero ou página de contato."
        >
          <div className="relative aspect-video max-w-4xl bg-[var(--ds-ink)] border-2 border-[var(--ds-white)] overflow-hidden">
            <div className="absolute inset-0 ds-dither opacity-20" />
            <div className="absolute inset-0 ds-tracking pointer-events-none" />
            <div className="absolute top-3 left-4 ds-8bit text-[10px] md:text-sm text-[var(--ds-red)] flex items-center gap-2">
              <span className="ds-blink">●</span> REC
            </div>
            <div className="absolute top-3 right-4 ds-8bit text-[10px] md:text-sm text-[var(--ds-white)]/80">
              <Timecode />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <PixelHood className="absolute h-[78%] w-auto text-[#1f1f2a] ds-rgb" />
              <div className="relative scale-75 sm:scale-100 -translate-y-[6%]">
                <LedEyes size="md" showLabel={false} />
              </div>
            </div>
            <div className="absolute bottom-4 md:bottom-8 inset-x-0 flex justify-center px-4">
              <p className="bg-[var(--ds-black)]/80 px-3 py-1 text-xs md:text-base text-center text-[var(--ds-yellow)] font-bold">
                [VOZ DISTORCIDA] Eles guardam seus dados. Nós guardamos o código aberto.
              </p>
            </div>
          </div>
        </Section>

        {/* 09 — palette + type */}
        <Section id="09" title="Paleta e tipografia">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PALETTE.map((s) => (
              <div key={s.name} className="ds-panel p-2">
                <div className="h-16 md:h-20" style={{ background: `var(${s.v})` }} />
                <div className="pt-2 flex justify-between text-[11px] font-bold uppercase">
                  <span>{s.name}</span>
                  <span className="opacity-50">{s.hex}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["Display — Rubik Glitch (títulos)", "ds-display text-4xl uppercase", "Hack the hub"],
              [
                "Pixel — VT323 (HUD, prompts)",
                "ds-pixel text-4xl text-[var(--ds-cyan)]",
                "> access_granted",
              ],
              [
                "8-bit — Silkscreen (selos, contadores)",
                "ds-8bit text-2xl text-[var(--ds-yellow)]",
                "LEVEL 99",
              ],
              [
                "Tag — Permanent Marker (pichação)",
                "ds-tagfont text-4xl text-[var(--ds-magenta)]",
                "dg_sec",
              ],
            ].map(([label, cls, sample]) => (
              <div key={label} className="ds-panel p-5 space-y-2">
                <p className="text-[10px] uppercase tracking-widest opacity-50">{label}</p>
                <p className={cls}>{sample}</p>
              </div>
            ))}
          </div>
          <p className="text-xs opacity-60">
            Texto corrido continua em JetBrains Mono: o caos fica nos títulos e na decoração, nunca
            no conteúdo.
          </p>
        </Section>

        {/* 10 — patches, pins, buttons */}
        <Section
          id="10"
          title="Patches, bottons e botões"
          note="O colete cheio de patches e pins vira sistema de selos: tecnologias, status, conquistas."
        >
          <div className="ds-panel ds-grid-bg p-8 md:p-10 space-y-10">
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {PATCHES.map((p) => (
                <span
                  key={p.text}
                  className="ds-patch text-sm md:text-base"
                  style={{
                    background: `var(${p.bg})`,
                    color: `var(${p.fg})`,
                    transform: `rotate(${p.rot}deg)`,
                  }}
                >
                  {p.text}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-5 items-center justify-center">
              {PINS.map((p) => (
                <span
                  key={p.text}
                  className="ds-pin ds-8bit text-sm text-[var(--ds-black)]"
                  style={{ background: `var(${p.bg})`, transform: `rotate(${p.rot}deg)` }}
                >
                  {p.text}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-6 items-center justify-center">
              <button className="ds-btn ds-btn-solid">
                <span>Primário</span>
              </button>
              <button className="ds-btn ds-btn-outline">
                <span>Secundário</span>
              </button>
              <button className="ds-btn ds-btn-yellow">
                <span>Hover = tremer</span>
              </button>
            </div>
          </div>
        </Section>

        {/* 11 — ticker */}
        <Section id="11" title="Letreiro">
          <div className="overflow-hidden border-y-2 border-[var(--ds-white)] bg-[var(--ds-magenta)] text-[var(--ds-black)] py-2">
            <div className="ds-marquee ds-pixel text-2xl whitespace-nowrap">
              {Array.from({ length: 2 }).map((_, k) => (
                <span key={k} className="px-4">
                  {
                    " ✦ react ✦ next.js ✦ node.js ✦ typescript ✦ open source ✦ dg_sec ✦ react ✦ next.js ✦ node.js ✦ typescript ✦ open source ✦ dg_sec"
                  }
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs opacity-60">
            Toda a página está sob scanlines, ruído de filme e uma faixa de VHS. Tudo para com
            &quot;reduzir movimento&quot; do sistema.
          </p>
        </Section>
      </main>
    </div>
  );
}
