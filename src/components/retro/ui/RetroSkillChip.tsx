/** Plain uppercase chip the retro skin uses for a skill name — no level indicator. */
export function RetroSkillChip({ name }: { name: string }) {
  return (
    <div className="retro-border bg-base-100 px-3 py-1 md:px-4 md:py-2 font-bold text-xs md:text-sm">
      {name.toUpperCase()}
    </div>
  );
}
