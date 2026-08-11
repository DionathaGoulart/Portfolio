import { SocialLinks } from "@/components/shared/SocialLinks";
import { hubContent } from "@/data/hub-config";

/** Bottom bar: the socials row plus the build strings. */
export function HubFooter() {
  return (
    <div className="max-w-7xl mx-auto mt-16 md:mt-24 w-full flex flex-col md:flex-row justify-between items-center gap-8 border-t-2 border-base-300/10 pt-12 relative z-10">
      <SocialLinks
        socials={hubContent.socials}
        variant="hub"
        compact
        className="hidden md:grid grid-cols-4 gap-4 sm:gap-6"
      />

      <div className="font-mono text-[10px] opacity-30 uppercase tracking-[0.2em] text-center md:text-right text-base-content">
        {hubContent.footer.core} {"//"} {hubContent.footer.build}
        <br />
        {hubContent.footer.root}
      </div>
    </div>
  );
}
