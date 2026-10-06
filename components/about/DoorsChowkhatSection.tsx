import ExperiencePhoto from "./ExperiencePhoto";
import { PROJECT } from "@/lib/data";

export default function DoorsChowkhatSection() {
  return (
    <ExperiencePhoto
      src={PROJECT.expDoorPivot}
      alt="Pivot door hung in its frame"
      width={1400}
      height={1758}
      eyebrow="Doors & Chowkhats"
      title="Every door begins with the frame."
      text="The chowkhat is built first, plumbed and squared, before the door ever hangs on it."
    />
  );
}
