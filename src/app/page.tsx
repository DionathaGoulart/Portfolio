import { SkinView } from "@/components/shared/SkinProvider";
import { RetroHub } from "@/components/retro/hub/RetroHub";
import { TermHub } from "@/components/terminal/hub/TermHub";

export default function HubPage() {
  return <SkinView retro={<RetroHub />} terminal={<TermHub />} />;
}
