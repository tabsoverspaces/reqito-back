import { PopulatedItem, PopulatedItemBase } from "./items.populated";
import { ItemBase } from "../common/items.common";

export interface PopulatedSection extends ItemBase {
  requirements: PopulatedItem[];
}
