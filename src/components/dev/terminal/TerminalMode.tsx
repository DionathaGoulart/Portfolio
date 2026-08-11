"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";
import { Logo } from "@/components/shared/Logo";
import { useSkin } from "@/components/shared/SkinProvider";
import { TERMINAL_LIGHT_THEMES, TERMINAL_DARK_THEMES } from "@/data/theme-config";
import { asciiBar, skillFilename, fakeCommitHash } from "@/lib/terminal";
import { slugify } from "@/lib/slug";

import { ALL_COMMANDS, HELP_TEXT, MAX_OUTPUT_LINES, type OutputLine } from "./constants";

export default function TerminalMode({ onSwitchToGui }: { onSwitchToGui: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  // Per-instance line ids. This used to be a module-scope counter, so it leaked across
  // mounts and every StrictMode double-render advanced it.
  const lineId = useRef(100);
  const uid = () => lineId.current++;
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const { lightPalette, darkPalette, setLightPalette, setDarkPalette } = useSkin();
  // wizard state: null = normal mode | "light" | "dark"
  const [wizardStep, setWizardStep] = useState<null | "light" | "dark">(null);
  const [output, setOutput] = useState<OutputLine[]>([
    {
      id: uid(),
      type: "info",
      content: (
        <span>
          Bem-vindo ao <span className="text-accent font-black">DG-OS v1.0</span> — Terminal
          interativo do portfólio. <br />
          Digite <span className="text-accent font-black">help</span> para ver os comandos
          disponíveis.
        </span>
      ),
    },
    { id: uid(), type: "blank", content: "" },
  ]);

  // Skip the first pass so opening the terminal does not yank the page to the prompt.
  const didAutoScroll = useRef(false);
  useEffect(() => {
    if (!didAutoScroll.current) {
      didAutoScroll.current = true;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function pushLines(lines: OutputLine[]) {
    setOutput((prev) => [...prev, ...lines].slice(-MAX_OUTPUT_LINES));
  }

  function runCommand(raw: string, recordHistory = true) {
    const cmd = raw.trim().toLowerCase();
    const inputLine: OutputLine = { id: uid(), type: "input", content: raw.trim() };

    if (!cmd) {
      pushLines([inputLine, { id: uid(), type: "blank", content: "" }]);
      return;
    }

    if (recordHistory) {
      setHistory((h) => [raw.trim(), ...h]);
      setHistIdx(-1);
    }

    let result: OutputLine[] = [];

    if (cmd === "clear") {
      setOutput([]);
      setInput("");
      return;
    }

    if (cmd === "gui") {
      pushLines([
        inputLine,
        { id: uid(), type: "success", content: "→ Alternando para modo gráfico..." },
      ]);
      setTimeout(onSwitchToGui, 600);
      setInput("");
      return;
    }

    // cd <section> → alias para cat <section>
    const cdMatch = cmd.match(/^cd\s+(.+)$/);
    if (cdMatch || cmd === "cd") {
      if (!cdMatch || cdMatch[1] === "~" || cdMatch[1] === "/" || cdMatch[1] === ".") {
        pushLines([
          inputLine,
          { id: uid(), type: "info", content: "Você já está em ~/workspace/dg-os" },
          { id: uid(), type: "blank", content: "" },
        ]);
        setInput("");
        return;
      }
      // redirect to run as "cat <section>"
      const target = (cdMatch[1] ?? "").replace(/\/$/, ""); // strip trailing slash
      pushLines([
        inputLine,
        { id: uid(), type: "info", content: `→ cd redireciona para: cat ${target}` },
      ]);
      setInput("");
      // re-run as cat
      setTimeout(() => runCommand(`cat ${target}`, false), 50);
      return;
    }

    if (cmd === "help") {
      result = [
        {
          id: uid(),
          type: "output",
          content: (
            <pre className="whitespace-pre-wrap text-base-content/80 text-xs leading-relaxed">
              {HELP_TEXT}
            </pre>
          ),
        },
      ];
    } else if (cmd === "whoami") {
      result = [
        {
          id: uid(),
          type: "output",
          content: (
            <div className="space-y-1 text-xs font-mono">
              <p>
                <span className="text-accent font-black">USER:</span> {devContent.meta.username}
              </p>
              <p>
                <span className="text-accent font-black">ROLE:</span> {devContent.role}
              </p>
              <p>
                <span className="text-accent font-black">HOST:</span> {devContent.meta.host}
              </p>
              <p>
                <span className="text-accent font-black">KERNEL:</span> {devContent.meta.kernel}
              </p>
              <p>
                <span className="text-accent font-black">SHELL:</span> {devContent.meta.shell} →
                DG-OS terminal
              </p>
              <p>
                <span className="text-accent font-black">UPTIME:</span> {devContent.hero.uptime}
              </p>
              <p>
                <span className="text-accent font-black">STATUS:</span>{" "}
                <span className="text-green-400 animate-pulse">READY_FOR_DEPLOYMENT</span>
              </p>
            </div>
          ),
        },
      ];
    } else if (cmd === "ls") {
      // Build directory list from enabled sections only
      const dirs: string[] = [];
      if (devContent.sections.about.enabled) dirs.push("about/");
      if (devContent.sections.projects.enabled) dirs.push("projects/");
      if (devContent.sections.experience.enabled) dirs.push("experience/");
      dirs.push("skills/"); // always available via cat skills
      dirs.push("cv"); // always available
      result = [
        {
          id: uid(),
          type: "output",
          content: (
            <div className="text-xs font-mono space-y-1">
              <p className="text-accent/60 mb-2">~/workspace/dg-os</p>
              {dirs.map((d) => (
                <p key={d}>
                  <span className="text-accent font-black">{d}</span>
                </p>
              ))}
            </div>
          ),
        },
      ];
    } else if (cmd === "cat about") {
      result = [
        {
          id: uid(),
          type: "output",
          content: (
            <div className="text-xs font-mono space-y-2">
              <p className="text-accent font-black uppercase tracking-widest mb-3"># PRIMARY_BIO</p>
              <p className="text-base-content/90 leading-relaxed max-w-2xl">
                {devContent.about.text}
              </p>
            </div>
          ),
        },
      ];
    } else if (cmd === "cat skills") {
      result = [
        {
          id: uid(),
          type: "output",
          content: (
            <div className="text-xs font-mono space-y-2">
              <p className="text-accent font-black uppercase tracking-widest mb-3">
                # SYSTEM_SERVICES --status --all
              </p>
              <div className="space-y-2">
                {devContent.about.stacks.map((s) => {
                  const bar = asciiBar(s.level);
                  return (
                    <div key={s.name} className="flex items-center gap-3">
                      <span className="w-40 text-base-content">{skillFilename(s.name)}</span>
                      <span className="text-accent font-black w-10">{s.level}%</span>
                      <span className="text-green-400 w-10 animate-pulse">[ OK ]</span>
                      <span className="text-accent/70 tracking-widest">{bar}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ),
        },
      ];
    } else if (cmd === "cat projects") {
      result = [
        {
          id: uid(),
          type: "output",
          content: (
            <div className="text-xs font-mono space-y-3">
              <p className="text-accent font-black uppercase tracking-widest mb-3">
                # PROJECTS_REPOSITORY
              </p>
              {devContent.projects.map((p, i) => (
                <div key={p.title} className="border-l-2 border-accent/30 pl-3 space-y-1">
                  <p>
                    <span className="text-accent font-black">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>{" "}
                    <span className="text-base-content font-bold uppercase">{p.title}</span>{" "}
                    <span className="text-accent/50 ml-2 text-[10px] border border-accent/20 px-1">
                      {p.status}
                    </span>
                  </p>
                  <p className="text-base-content/70">{p.description}</p>
                  <p className="text-base-content/40 text-[10px]">
                    → cat {slugify(p.title)} para detalhes
                  </p>
                </div>
              ))}
            </div>
          ),
        },
      ];
    } else if (cmd === "cat experience") {
      result = [
        {
          id: uid(),
          type: "output",
          content: (
            <div className="text-xs font-mono space-y-4">
              <p className="text-accent font-black uppercase tracking-widest mb-3">
                # git log --stat --color
              </p>
              {devContent.experience.map((e) => (
                <div key={e.company} className="border-l-2 border-accent/30 pl-3 space-y-1">
                  <p className="text-yellow-400/90 font-bold">
                    commit {fakeCommitHash(e.company + e.period)}
                  </p>
                  <p>
                    <span className="text-base-content/50">Date:</span> {e.period}
                  </p>
                  <p className="text-accent font-black uppercase">{e.company}</p>
                  <p className="text-base-content">feat: {e.role}</p>
                  <p className="text-base-content/70">{e.description}</p>
                </div>
              ))}
            </div>
          ),
        },
      ];
    } else if (cmd === "cat cv") {
      result = [{ id: uid(), type: "success", content: "→ Abrindo currículo em nova aba..." }];
      pushLines([inputLine, ...result, { id: uid(), type: "blank", content: "" }]);
      setInput("");
      setTimeout(() => window.open("/dev/cv", "_blank"), 400);
      return;
    } else if (cmd === "theme") {
      // Start wizard — show light palette options
      const lines: OutputLine[] = [
        inputLine,
        {
          id: uid(),
          type: "output",
          content: (
            <div className="font-mono text-xs space-y-3">
              <p className="text-accent font-black uppercase tracking-widest">
                # SYSTEM_THEME_CONFIG
              </p>
              <div className="space-y-1">
                <p className="text-base-content/50 text-[10px] uppercase tracking-widest">
                  ── PALETA LIGHT ──────────────────────────
                </p>
                {TERMINAL_LIGHT_THEMES.map((p, i) => (
                  <p key={p.palette}>
                    <span className="text-accent font-black w-4 inline-block">[{i + 1}]</span>{" "}
                    <span
                      className="inline-block w-3 h-3 rounded-sm mr-1 align-middle"
                      style={{
                        background: p.bg,
                        outline: `2px solid ${p.acc}`,
                        outlineOffset: "1px",
                      }}
                    />
                    <span className="text-base-content">{p.name}</span>
                    {lightPalette === p.palette && (
                      <span className="text-accent/50 ml-2 text-[10px]">[atual]</span>
                    )}
                  </p>
                ))}
              </div>
              <p className="text-accent/70 animate-pulse">
                Digite o número da paleta light [1–{TERMINAL_LIGHT_THEMES.length}]:
              </p>
            </div>
          ),
        },
      ];
      pushLines(lines);
      setWizardStep("light");
      setInput("");
      return;
    } else {
      // Check if it's "cat <project-slug>"
      const catMatch = cmd.match(/^cat\s+(.+)$/);
      if (catMatch) {
        const slug = catMatch[1];
        const project = devContent.projects.find((p) => slugify(p.title) === slug);
        if (project) {
          result = [
            {
              id: uid(),
              type: "output",
              content: (
                <div className="text-xs font-mono space-y-3">
                  <div className="border-l-4 border-accent pl-3 space-y-1">
                    <p className="text-accent/60 uppercase text-[10px] font-black tracking-widest">
                      PROJECTS_REPOSITORY // {project.status}
                    </p>
                    <p className="text-accent font-black text-lg uppercase">{project.title}</p>
                    <p className="text-base-content/60 italic">
                      Função: {project.role || "Fullstack Developer"}
                    </p>
                  </div>
                  <p className="text-base-content/90 leading-relaxed">{project.description}</p>
                  {project.details && (
                    <div>
                      <p className="text-accent font-black mb-1"># RESUMO SISTÊMICO</p>
                      <p className="text-base-content/80 leading-relaxed">{project.details}</p>
                    </div>
                  )}
                  {project.features && project.features.length > 0 && (
                    <div>
                      <p className="text-accent font-black mb-1"># FEATURES</p>
                      {project.features.map((f, fi) => (
                        <p key={fi}>
                          <span className="text-accent">[+]</span> {f}
                        </p>
                      ))}
                    </div>
                  )}
                  <div>
                    <p className="text-accent font-black mb-1"># STACKS</p>
                    <p className="text-base-content/70">{project.tags.join(" · ")}</p>
                  </div>
                  <div className="flex gap-4 pt-2 border-t border-accent/10">
                    {project.link && project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        🌐 LIVE →
                      </a>
                    )}
                    {project.github && project.github !== "private" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        📂 GITHUB →
                      </a>
                    )}
                  </div>
                </div>
              ),
            },
          ];
        } else {
          result = [
            { id: uid(), type: "error", content: `cat: ${slug}: No such file or directory` },
          ];
        }
      } else {
        result = [
          {
            id: uid(),
            type: "error",
            content: `command not found: ${raw.trim()}. Type 'help' for available commands.`,
          },
        ];
      }
    }

    pushLines([inputLine, ...result, { id: uid(), type: "blank", content: "" }]);
    setInput("");
  }

  // ── Wizard step handler ──────────────────────────────────────────────────
  function handleWizardInput(raw: string) {
    const val = raw.trim();
    const inputLine: OutputLine = { id: uid(), type: "input", content: val };

    if (wizardStep === "light") {
      const idx = parseInt(val) - 1;
      const palette = TERMINAL_LIGHT_THEMES[idx];
      if (!palette) {
        pushLines([
          inputLine,
          {
            id: uid(),
            type: "error",
            content: `Opção inválida. Digite um número de 1 a ${TERMINAL_LIGHT_THEMES.length}.`,
          },
        ]);
        setInput("");
        return;
      }
      setLightPalette(palette.palette);
      // Show dark palette options
      pushLines([
        inputLine,
        { id: uid(), type: "success", content: `✔ Paleta light aplicada: ${palette.name}` },
        {
          id: uid(),
          type: "output",
          content: (
            <div className="font-mono text-xs space-y-3">
              <div className="space-y-1">
                <p className="text-base-content/50 text-[10px] uppercase tracking-widest">
                  ── PALETA DARK ───────────────────────────
                </p>
                {TERMINAL_DARK_THEMES.map((p, i) => (
                  <p key={p.palette}>
                    <span className="text-accent font-black w-4 inline-block">[{i + 1}]</span>{" "}
                    <span
                      className="inline-block w-3 h-3 rounded-sm mr-1 align-middle"
                      style={{
                        background: p.bg,
                        outline: `2px solid ${p.acc}`,
                        outlineOffset: "1px",
                      }}
                    />
                    <span className="text-base-content">{p.name}</span>
                    {darkPalette === p.palette && (
                      <span className="text-accent/50 ml-2 text-[10px]">[atual]</span>
                    )}
                  </p>
                ))}
              </div>
              <p className="text-accent/70 animate-pulse">
                Digite o número da paleta dark [1–{TERMINAL_DARK_THEMES.length}]:
              </p>
            </div>
          ),
        },
      ]);
      setWizardStep("dark");
      setInput("");
      return;
    }

    if (wizardStep === "dark") {
      const idx = parseInt(val) - 1;
      const palette = TERMINAL_DARK_THEMES[idx];
      if (!palette) {
        pushLines([
          inputLine,
          {
            id: uid(),
            type: "error",
            content: `Opção inválida. Digite um número de 1 a ${TERMINAL_DARK_THEMES.length}.`,
          },
        ]);
        setInput("");
        return;
      }
      setDarkPalette(palette.palette);
      // Finish wizard
      pushLines([
        inputLine,
        { id: uid(), type: "success", content: `✔ Paleta dark aplicada: ${palette.name}` },
        { id: uid(), type: "blank", content: "" },
        {
          id: uid(),
          type: "info",
          content: "✅ Configurações salvas! Digite 'theme' para alterar novamente.",
        },
        { id: uid(), type: "blank", content: "" },
      ]);
      setWizardStep(null);
      setInput("");
      return;
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    // ── Ctrl+C handler ──
    if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      if (wizardStep) {
        setWizardStep(null);
        pushLines([
          { id: uid(), type: "input", content: input },
          { id: uid(), type: "error", content: "^C (ação cancelada)" },
          { id: uid(), type: "blank", content: "" },
        ]);
      } else {
        pushLines([{ id: uid(), type: "input", content: input + "^C" }]);
      }
      setInput("");
      return;
    }

    if (e.key === "Enter") {
      if (wizardStep) {
        handleWizardInput(input);
      } else {
        runCommand(input);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : (history[next] ?? ""));
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (!input.trim()) return;
      const matches = ALL_COMMANDS.filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 0) return;
      if (matches.length === 1) {
        // Complete immediately
        setInput(matches[0] ?? "");
      } else {
        // Find longest common prefix to partially complete
        const common = matches.reduce((acc, cmd) => {
          let i = 0;
          while (i < acc.length && i < cmd.length && acc[i] === cmd[i]) i++;
          return acc.slice(0, i);
        });
        if (common.length > input.length) {
          setInput(common);
        } else {
          // Show options inline without duplicating the prompt
          const hint: OutputLine = {
            id: uid(),
            type: "info",
            content: (
              <span className="text-base-content/50 text-xs">
                {matches.map((m, i) => (
                  <span key={m}>
                    <span className="text-accent/80">{m}</span>
                    {i < matches.length - 1 && <span className="opacity-30"> │ </span>}
                  </span>
                ))}
              </span>
            ),
          };
          pushLines([hint]);
        }
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="h-[100dvh] flex flex-col pt-20 pb-4 px-4 sm:px-6 md:px-10 md:py-24 md:min-h-screen md:h-auto md:justify-center"
    >
      <div
        className="retro-border bg-base-200 retro-shadow overflow-hidden w-full max-w-7xl mx-auto flex flex-col relative h-[75vh] min-h-[500px] md:min-h-[650px]"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Logo watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.025] pointer-events-none overflow-hidden text-accent select-none">
          <Logo className="w-[140%] h-[140%] object-cover -rotate-12" />
        </div>

        {/* Terminal Header */}
        <div className="bg-accent/10 border-b-2 border-accent/20 px-4 py-2 flex justify-between items-center text-[10px] font-mono tracking-wider text-accent font-black shrink-0 relative z-10">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/20" />
          </div>
          <span className="truncate mx-2">root@dg-os: ~/workspace — TERMINAL_MODE</span>
          <span className="hidden sm:inline animate-pulse text-[9px] bg-accent/20 px-1 py-0.5 rounded text-accent">
            ● LIVE
          </span>
        </div>

        {/* Output area */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8 font-mono text-xs relative z-10 space-y-1">
          {output.map((line, idx) => (
            <motion.div
              key={line.id}
              // Only the line that just arrived animates; replaying the whole scrollback on
              // every command was the reason this sat inside an AnimatePresence.
              initial={idx === output.length - 1 ? { opacity: 0, x: -4 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
            >
              {line.type === "input" && (
                <div className="flex items-start gap-2 text-base-content/90">
                  <span className="text-accent font-black shrink-0">
                    {devContent.meta.username.split("_")[0]}@dg-os:~$
                  </span>
                  <span>{line.content}</span>
                </div>
              )}
              {line.type === "output" && (
                <div className="pl-2 border-l border-accent/10 py-1">{line.content}</div>
              )}
              {line.type === "error" && (
                <div className="text-red-400/90 pl-2">{line.content as string}</div>
              )}
              {line.type === "success" && (
                <div className="text-green-400/90 pl-2">{line.content as string}</div>
              )}
              {line.type === "info" && (
                <div className="text-base-content/70 pl-2">{line.content}</div>
              )}
              {line.type === "blank" && <div className="h-2" />}
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="border-t border-accent/20 px-5 md:px-8 py-3 flex items-center gap-3 font-mono text-xs bg-accent/[0.02] shrink-0 relative z-10">
          <span className="text-accent font-black whitespace-nowrap">
            {wizardStep === "light" && `paleta-light[1–${TERMINAL_LIGHT_THEMES.length}]:`}
            {wizardStep === "dark" && `paleta-dark[1–${TERMINAL_DARK_THEMES.length}]:`}
            {!wizardStep && `${devContent.meta.username.split("_")[0]}@dg-os:~$`}
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-base-content caret-accent placeholder:text-base-content/20"
            placeholder="type a command..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <span className="w-2 h-4 bg-accent animate-pulse shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}
