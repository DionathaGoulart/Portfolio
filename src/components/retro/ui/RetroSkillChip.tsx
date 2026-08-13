import { RetroBadge } from "./RetroBadge";

/** Plain uppercase chip the retro skin uses for a skill name — no level indicator. */
export function RetroSkillChip({ name }: { name: string }) {
  return <RetroBadge variant="chip">{name.toUpperCase()}</RetroBadge>;
}
