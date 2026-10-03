import Image from "next/image";
import { Logo } from "@/components/shared/Logo";
import type { PersonalProject } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * A project's screenshot, or — until it has one — a generated cover: its title on the
 * accent block with the logo behind, so the grid never shows a hole.
 */
export function RetroProjectCover({
  project,
  priority = false,
  className,
}: {
  project: PersonalProject;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-video overflow-hidden bg-accent", className)}>
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <Logo className="absolute -right-8 -bottom-8 w-2/3 h-auto text-accent-content opacity-10 -rotate-12" />
          <span className="relative text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-accent-content text-center leading-none">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}
