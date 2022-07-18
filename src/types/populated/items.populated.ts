import { PopulatedRequirement } from "./requirements.populated";
import { PopulatedSection } from "./sections.populated";

export interface PopulatedItemBase {
  uuid: string;
  name: string;
}

export type PopulatedItem = PopulatedRequirement | PopulatedSection;
