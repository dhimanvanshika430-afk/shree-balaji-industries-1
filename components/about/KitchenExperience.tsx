import ExperiencePhoto from "./ExperiencePhoto";
import { PROJECT } from "@/lib/data";

export default function KitchenExperience() {
  return (
    <ExperiencePhoto
      src={PROJECT.expKitchenDrawers}
      alt="Open soft-close kitchen drawers and cabinet door"
      width={1800}
      height={1037}
      eyebrow="Kitchen Experience"
      title="Every drawer, tested."
      text="Soft-close drawers and full-height doors, checked to open and close smoothly before they leave our unit."
    />
  );
}
