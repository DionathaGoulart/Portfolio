"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { hubContent } from "@/data/hub-config";
import { currentProject, projectsContent } from "@/data/projects-config";
import { Logo } from "@/components/shared/Logo";
import { TypingText } from "@/components/shared/TypingText";
import { TermWindow } from "@/components/terminal/ui/TermWindow";
import { TermBadge } from "@/components/terminal/ui/TermBadge";
import { TermSocialLinks } from "@/components/terminal/ui/TermSocialLinks";
import { TermModeSwitch } from "@/components/terminal/ui/TermModeSwitch";
import { TermSkinToggle } from "@/components/terminal/ui/TermSkinToggle";
import { TermShellToggle } from "@/components/terminal/ui/TermShellToggle";
import { TermShellView } from "@/components/terminal/shell/TermShellView";

/** The hub (/) in the terminal skin: a `whoami` window and a launcher for the sections. */
export function TermHub() {
  const sections = Object.entries(hubContent.sections);
  const now = currentProject();

  return (
    <>
      {/* Outside the shell swap: the toggles are how the visitor gets back out of it. */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex gap-2 items-center">
        <TermShellToggle />
        <TermSkinToggle />
        <TermModeSwitch />
      </div>

      <TermShellView>
        <main className="selection:bg-accent selection:text-accent-content min-h-screen flex flex-col justify-center py-20 px-4 md:px-6 overflow-x-hidden relative font-mono">
          <div className="terminal-scanline opacity-10 pointer-events-none" />

          <div className="max-w-6xl w-full mx-auto space-y-6 md:space-y-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <TermWindow
                chrome="heavy"
                title="root@dg-os: ~/"
                titleClassName="sm:tracking-[0.4em] text-accent/30 truncate"
              >
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="order-2 md:order-1 md:col-span-8 p-5 sm:p-8 md:p-12 space-y-6">
                    <div className="space-y-1">
                      <p className="text-xs md:text-sm">
                        <span className="text-accent/30 font-bold">{">"}</span>{" "}
                        <span className="text-base-content/30">whoami</span>
                      </p>
                      <h1 className="pl-4 md:pl-6 border-l-2 border-accent/10 text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-accent terminal-glow leading-none">
                        {hubContent.name}
                      </h1>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs md:text-sm">
                        <span className="text-accent/30 font-bold">{">"}</span>{" "}
                        <span className="text-base-content/30">cat manifest.txt</span>
                      </p>
                      <div className="pl-4 md:pl-6 border-l-2 border-accent/10 space-y-3">
                        <p className="text-lg md:text-2xl font-bold text-base-content">
                          <TypingText text={hubContent.typingText} speed={70} />
                        </p>
                        <p className="text-sm md:text-base text-base-content/70 leading-relaxed max-w-2xl uppercase font-bold tracking-tight">
                          {hubContent.description}
                        </p>
                      </div>
                    </div>

                    {now && (
                      <div className="space-y-1">
                        <p className="text-xs md:text-sm">
                          <span className="text-accent/30 font-bold">{">"}</span>{" "}
                          <span className="text-base-content/30">{hubContent.nowLabel}</span>
                        </p>
                        <Link
                          href={`/projetos/${now.slug}`}
                          className="ml-4 md:ml-6 inline-block text-sm md:text-base font-black text-accent hover:bg-accent hover:text-accent-content px-1 transition-colors"
                        >
                          {now.title} — {now.tagline}
                        </Link>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="text-accent/30 font-bold text-xs md:text-sm">{">"}</span>
                      <span className="w-2.5 h-4 bg-accent/40 animate-pulse" />
                    </div>
                  </div>

                  <div className="order-1 md:order-2 md:col-span-4 border-b-2 md:border-b-0 md:border-l-2 border-accent bg-accent/5 p-8 flex items-center justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-5 border-2 border-accent/30 md:border-accent/10 md:group-hover:border-accent/30 transition-colors animate-[spin_15s_linear_infinite] rounded-full" />
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-accent/60 md:border-accent/20 md:group-hover:border-accent/60 transition-colors duration-500 bg-base-200">
                        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-30">
                          <Logo className="w-full h-full text-accent" />
                        </div>
                        <Image
                          src={hubContent.profileImage}
                          alt={hubContent.name}
                          fill
                          priority
                          sizes="(max-width: 768px) 128px, 160px"
                          className="object-cover z-10 md:grayscale md:group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TermWindow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TermWindow chrome="bar" title="root@dg-os: ~/ — ls -la">
                <nav aria-label="Seções" className="flex flex-col">
                  {sections.map(([key, section], i) => (
                    <Link
                      key={key}
                      href={section.href}
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-6 px-4 md:px-8 py-5 border-b border-accent/10 last:border-b-0 hover:bg-accent hover:text-accent-content transition-colors"
                    >
                      <span className="text-accent group-hover:text-accent-content font-black">
                        {i === 0 ? "$" : ">"}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xl md:text-3xl font-black uppercase tracking-tighter">
                          {section.title}
                        </span>
                        <span className="block text-[10px] md:text-xs uppercase tracking-widest opacity-50 group-hover:opacity-80 truncate">
                          {section.subtitle} {"//"} {section.tags}
                        </span>
                      </span>
                      <span className="flex items-center gap-3 md:gap-4">
                        <TermBadge
                          variant="tag"
                          className="hidden sm:inline-flex group-hover:bg-accent-content/10 group-hover:text-accent-content group-hover:border-accent-content/30"
                        >
                          {section.status.replace(
                            "{count}",
                            String(projectsContent.projects.length)
                          )}
                        </TermBadge>
                        <span className="text-xs md:text-sm font-black whitespace-nowrap">
                          {section.action}
                        </span>
                      </span>
                    </Link>
                  ))}
                </nav>
              </TermWindow>
            </motion.div>

            <footer className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
              <TermSocialLinks socials={hubContent.socials} className="justify-center" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent/40 text-center md:text-right">
                {hubContent.footer.core} {"//"} {hubContent.footer.build}
              </p>
            </footer>
          </div>
        </main>
      </TermShellView>
    </>
  );
}
