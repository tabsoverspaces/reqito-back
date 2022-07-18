import { ItemBase } from "../common/items.common";

export interface SimpleRequirement extends ItemBase {
  modal: string;
  actor: string;
  wording: string;
  description?: string | null;
}
