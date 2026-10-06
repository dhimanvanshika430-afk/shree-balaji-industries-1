import ExperiencePhoto from "./ExperiencePhoto";
import { PROJECT } from "@/lib/data";

export default function StorageExperience() {
  return (
    <ExperiencePhoto
      src={PROJECT.expWardrobeBedroom}
      alt="Built-in wardrobe wall in a bedroom"
      width={2000}
      height={1121}
      eyebrow="Storage Experience"
      title="A wardrobe built around what you actually own."
      text="Hanging space, shelving and drawer units, laid out to your wardrobe before a single panel is cut."
    />
  );
}
