import { Actor } from "../actors";
import { ProjectCommon } from "../common/projects.common";
import { PopulatedItem } from "./items.populated";

export interface PopulatedProject extends ProjectCommon {
  functional: {
    sections: PopulatedItem[];
  };

  actors: Actor[];
  lastModified?: string;
}
