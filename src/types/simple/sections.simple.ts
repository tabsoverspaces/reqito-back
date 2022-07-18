import { ItemBase } from "../common/items.common";
import { SimpleItem } from "./item.simple";

export interface SimpleSection extends ItemBase {
  requirements: string[];
}
