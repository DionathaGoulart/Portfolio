"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { devContent } from "@/data/dev-config";
import { Logo } from "@/components/shared/Logo";
import { useSkin } from "@/components/shared/SkinProvider";
import { TERMINAL_LIGHT_THEMES, TERMINAL_DARK_THEMES } from "@/data/theme-config";
import { slugify } from "@/lib/slug";
import { TermWindow } from "@/components/terminal/ui/TermWindow";
import { TermBadge } from "@/components/terminal/ui/TermBadge";
import { ALL_COMMANDS, MAX_OUTPUT_LINES, type OutputLine } from "./constants";
import { COMMAND_OUTPUTS, PaletteList, ProjectDetailOutput } from "./output";

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

    const staticOutput = COMMAND_OUTPUTS[cmd];
    if (staticOutput) {
      result = [{ id: uid(), type: "output", content: staticOutput() }];
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
            <PaletteList
              title="# SYSTEM_THEME_CONFIG"
              label="LIGHT"
              themes={TERMINAL_LIGHT_THEMES}
              current={lightPalette}
            />
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
              content: <ProjectDetailOutput project={project} />,
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
          content: <PaletteList label="DARK" themes={TERMINAL_DARK_THEMES} current={darkPalette} />,
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
      <TermWindow
        chrome="shell"
        className="max-w-7xl mx-auto relative h-[75vh] min-h-[500px] md:min-h-[650px]"
        onClick={() => inputRef.current?.focus()}
        title="root@dg-os: ~/workspace — TERMINAL_MODE"
        right={
          <TermBadge
            variant="pill"
            className="hidden sm:inline-flex animate-pulse bg-accent/20 text-accent"
          >
            ● LIVE
          </TermBadge>
        }
      >
        {/* Logo watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.025] pointer-events-none overflow-hidden text-accent select-none">
          <Logo className="w-[140%] h-[140%] object-cover -rotate-12" />
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
        {/* The input suppresses its own outline, so the row carries the focus ring. */}
        <div className="border-t border-accent/20 px-5 md:px-8 py-3 flex items-center gap-3 font-mono text-xs bg-accent/[0.02] shrink-0 relative z-10 has-[input:focus-visible]:outline has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-accent has-[input:focus-visible]:-outline-offset-2">
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
            aria-label="Terminal de comandos"
            className="flex-1 bg-transparent outline-none text-base-content caret-accent placeholder:text-base-content/20 focus-visible:outline-none"
            placeholder="type a command..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <span className="w-2 h-4 bg-accent animate-pulse shrink-0" />
        </div>
      </TermWindow>
    </motion.div>
  );
}
