import { Fragment } from "react";
import type { PersonaContent, Project } from "@/types/content";
import type { TerminalThemeOption } from "@/data/theme-config";
import { asciiBar, fakeCommitHash, skillFilename } from "@/lib/terminal";
import { slugify } from "@/lib/slug";
import { HELP_TEXT } from "./constants";

/**
 * Rendered bodies of every terminal command.
 *
 * These are pure: they read the persona content and take no terminal state, so the shell keeps
 * only dispatch and side effects.
 */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <p className="text-accent font-black uppercase tracking-widest mb-3">{children}</p>;
}

export function HelpOutput() {
  return (
    <pre className="whitespace-pre-wrap text-base-content/80 text-xs leading-relaxed">
      {HELP_TEXT}
    </pre>
  );
}

export function WhoamiOutput({ content }: { content: PersonaContent }) {
  const status =
    content.about.envVars.find((env) => env.key === "DG_STATUS")?.value ?? content.hero.status;
  const rows: [string, React.ReactNode][] = [
    ["USER", content.meta.username],
    ["ROLE", content.role],
    ["HOST", content.meta.host],
    ["KERNEL", content.meta.kernel],
    ["SHELL", <Fragment key="shell">{content.meta.shell} → DG-OS terminal</Fragment>],
    ["UPTIME", content.hero.uptime],
    [
      "STATUS",
      <span key="status" className="text-green-400 animate-pulse">
        {status}
      </span>,
    ],
  ];

  return (
    <div className="space-y-1 text-xs font-mono">
      {rows.map(([label, value]) => (
        <p key={label}>
          <span className="text-accent font-black">{label}:</span> {value}
        </p>
      ))}
    </div>
  );
}

export function LsOutput({ content }: { content: PersonaContent }) {
  const { sections } = content;
  const dirs = [
    ...(sections.about.enabled ? ["about/"] : []),
    ...(sections.projects.enabled ? ["projects/"] : []),
    ...(sections.experience.enabled ? ["experience/"] : []),
    "skills/", // always available via cat skills
    "cv", // always available
  ];

  return (
    <div className="text-xs font-mono space-y-1">
      <p className="text-accent/60 mb-2">~/workspace/dg-os</p>
      {dirs.map((d) => (
        <p key={d}>
          <span className="text-accent font-black">{d}</span>
        </p>
      ))}
    </div>
  );
}

export function AboutOutput({ content }: { content: PersonaContent }) {
  return (
    <div className="text-xs font-mono space-y-2">
      <SectionHeading># PRIMARY_BIO</SectionHeading>
      <p className="text-base-content/90 leading-relaxed max-w-2xl">{content.about.text}</p>
    </div>
  );
}

export function SkillsOutput({ content }: { content: PersonaContent }) {
  return (
    <div className="text-xs font-mono space-y-2">
      <SectionHeading># SYSTEM_SERVICES --status --all</SectionHeading>
      <div className="space-y-2">
        {content.about.stacks.map((s) => (
          <div key={s.name} className="flex items-center gap-3">
            <span className="w-40 text-base-content">{skillFilename(s.name)}</span>
            <span className="text-accent font-black w-10">{s.level}%</span>
            <span className="text-green-400 w-10 animate-pulse">[ OK ]</span>
            <span className="text-accent/70 tracking-widest">{asciiBar(s.level)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsOutput({ content }: { content: PersonaContent }) {
  return (
    <div className="text-xs font-mono space-y-3">
      <SectionHeading># PROJECTS_REPOSITORY</SectionHeading>
      {content.projects.map((p, i) => (
        <div key={p.title} className="border-l-2 border-accent/30 pl-3 space-y-1">
          <p>
            <span className="text-accent font-black">[{String(i + 1).padStart(2, "0")}]</span>{" "}
            <span className="text-base-content font-bold uppercase">{p.title}</span>{" "}
            <span className="text-accent/50 ml-2 text-[10px] border border-accent/20 px-1">
              {p.status || "STABLE"}
            </span>
          </p>
          <p className="text-base-content/70">{p.description}</p>
          <p className="text-base-content/40 text-[10px]">→ cat {slugify(p.title)} para detalhes</p>
        </div>
      ))}
    </div>
  );
}

export function ExperienceOutput({ content }: { content: PersonaContent }) {
  return (
    <div className="text-xs font-mono space-y-4">
      <SectionHeading># git log --stat --color</SectionHeading>
      {content.experience.map((e) => (
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
  );
}

export function ProjectDetailOutput({ project }: { project: Project }) {
  return (
    <div className="text-xs font-mono space-y-3">
      <div className="border-l-4 border-accent pl-3 space-y-1">
        <p className="text-accent/60 uppercase text-[10px] font-black tracking-widest">
          {"PROJECTS_REPOSITORY // "}
          {project.status || "STABLE"}
        </p>
        <p className="text-accent font-black text-lg uppercase">{project.title}</p>
        {project.role && <p className="text-base-content/60 italic">Função: {project.role}</p>}
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
            <span aria-hidden="true">🌐</span> LIVE →
          </a>
        )}
        {project.github && project.github !== "private" && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            <span aria-hidden="true">📂</span> GITHUB →
          </a>
        )}
      </div>
    </div>
  );
}

const SEPARATOR_WIDTH = 42;

interface PaletteListProps {
  /** Shown above the swatches, e.g. `LIGHT`. */
  label: string;
  themes: TerminalThemeOption[];
  /** Palette id currently applied, marked `[atual]`. */
  current: string;
  /** Rendered above the list; only the first wizard step shows it. */
  title?: string;
}

/** Swatch picker of the `theme` wizard. Both steps render the same list. */
export function PaletteList({ label, themes, current, title }: PaletteListProps) {
  // The separator is padded so every step's rule ends at the same column.
  const rule = "─".repeat(Math.max(0, SEPARATOR_WIDTH - "── PALETA ".length - label.length - 1));

  return (
    <div className="font-mono text-xs space-y-3">
      {title && <p className="text-accent font-black uppercase tracking-widest">{title}</p>}
      <div className="space-y-1">
        <p className="text-base-content/50 text-[10px] uppercase tracking-widest">
          ── PALETA {label} {rule}
        </p>
        {themes.map((p, i) => (
          <p key={p.palette}>
            <span className="text-accent font-black w-4 inline-block">[{i + 1}]</span>{" "}
            <span
              className="inline-block w-3 h-3 rounded-sm mr-1 align-middle"
              style={{ background: p.bg, outline: `2px solid ${p.acc}`, outlineOffset: "1px" }}
            />
            <span className="text-base-content">{p.name}</span>
            {current === p.palette && (
              <span className="text-accent/50 ml-2 text-[10px]">[atual]</span>
            )}
          </p>
        ))}
      </div>
      <p className="text-accent/70 animate-pulse">
        Digite o número da paleta {label.toLowerCase()} [1–{themes.length}]:
      </p>
    </div>
  );
}

/** Commands whose entire response is static markup, dispatched by name in the shell. */
export const COMMAND_OUTPUTS: Record<string, (content: PersonaContent) => React.ReactNode> = {
  help: () => <HelpOutput />,
  whoami: (content) => <WhoamiOutput content={content} />,
  ls: (content) => <LsOutput content={content} />,
  "cat about": (content) => <AboutOutput content={content} />,
  "cat skills": (content) => <SkillsOutput content={content} />,
  "cat projects": (content) => <ProjectsOutput content={content} />,
  "cat experience": (content) => <ExperienceOutput content={content} />,
};
