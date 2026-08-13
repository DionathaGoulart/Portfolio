"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Logo } from "@/components/shared/Logo";
import { RetroSocialLinks } from "@/components/retro/ui/RetroSocialLinks";
import { RetroCard } from "@/components/retro/ui/RetroCard";
import { TypingText } from "@/components/shared/TypingText";
import { hubContent } from "@/data/hub-config";

/** Photo, name plate and the typed manifest — the left half of the hub. */
export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-7 space-y-8"
    >
      <div className="flex flex-col md:flex-row gap-6 md:items-end">
        <div className="flex flex-row gap-4 items-center md:items-end">
          {/* Profile Photo Container with Logo Background */}
          <div className="relative group shrink-0">
            <RetroCard
              shadow="none"
              className="w-32 h-32 md:w-48 md:h-48 overflow-hidden retro-shadow md:retro-shadow-sm md:group-hover:retro-shadow transition-all relative items-center justify-center"
            >
              {/* Logo Background */}
              <div className="absolute inset-0 flex items-center justify-center p-4 opacity-40 scale-110 md:opacity-20 md:scale-100 md:group-hover:opacity-40 md:group-hover:scale-110 transition-all duration-500">
                <Logo className="w-full h-full text-accent" />
              </div>

              {/* Profile Image (Cut-out) */}
              <Image
                src={hubContent.profileImage}
                alt={hubContent.name}
                fill
                priority
                sizes="(max-width: 768px) 128px, 192px"
                className="object-cover z-10 grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
              />

              {/* Terminal overlay on photo */}
              <div className="absolute inset-0 bg-accent/5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none flex flex-col justify-end p-2 font-mono text-[8px] text-accent-content z-20">
                <span className="bg-accent px-1 w-fit">SYNC_COMPLETE</span>
              </div>
            </RetroCard>
            {/* Decorative corner */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-accent" />
          </div>

          {/* Mobile Socials */}
          <RetroSocialLinks socials={hubContent.socials} variant="hub" className="md:hidden" />
        </div>

        <RetroCard className="bg-accent p-6 md:p-8 inline-block flex-1">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-accent-content tracking-tighter leading-[0.85] uppercase italic whitespace-pre-line">
            {hubContent.name.replace(" ", " \n ")}
          </h1>
        </RetroCard>
      </div>

      <RetroCard shadow="sm" className="p-6 md:p-8 space-y-4 relative overflow-hidden">
        {/* Terminal hint */}
        <div className="absolute top-0 right-0 p-2 font-mono text-[10px] opacity-10 select-none uppercase">
          {"// system_manifest_v2.0"}
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic text-accent flex items-center gap-2">
          <span className="text-xl opacity-40 font-mono not-italic">{">"}</span>
          <TypingText text={hubContent.typingText} speed={70} />
        </h2>
        <p className="text-lg sm:text-xl font-bold opacity-70 leading-tight max-w-2xl uppercase tracking-tighter">
          {hubContent.description}
        </p>
      </RetroCard>
    </motion.div>
  );
}
