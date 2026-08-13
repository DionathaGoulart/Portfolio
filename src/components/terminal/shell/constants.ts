import { devContent } from "@/data/dev-config";
import { slugify } from "@/lib/slug";

export type OutputLine = {
  id: number;
  type: "input" | "output" | "error" | "success" | "info" | "blank";
  content: string | React.ReactNode;
};

export const HELP_TEXT = `
COMANDOS DISPONÍVEIS:
──────────────────────────────────────────────
  help              → Lista todos os comandos
  whoami            → Informações sobre o sistema
  ls                → Lista módulos disponíveis
  cat about         → Exibe bio e habilidades
  cat projects      → Lista todos os projetos
  cat <projeto>     → Detalhes de um projeto específico
  cat experience    → Histórico de experiências
  cat skills        → Mapa de habilidades técnicas
  cat cv            → Abre o currículo completo
  theme             → Altera paleta de cores e fonte
  clear             → Limpa o terminal
  gui               → Volta para o modo gráfico
──────────────────────────────────────────────
Dica: Use [TAB] para auto-completar comandos.
`;

export const PROJECT_NAMES = devContent.projects.map((p) => slugify(p.title));

export const ALL_COMMANDS = [
  "help",
  "whoami",
  "ls",
  "clear",
  "gui",
  "theme",
  "cat about",
  "cat projects",
  "cat experience",
  "cat skills",
  "cat cv",
  "cd about",
  "cd projects",
  "cd experience",
  "cd skills",
  "cd cv",
  ...PROJECT_NAMES.map((n) => `cat ${n}`),
  ...PROJECT_NAMES.map((n) => `cd ${n}`),
];

/** Lines kept in the scrollback. Older ones are dropped so a long session stays cheap. */
export const MAX_OUTPUT_LINES = 200;
