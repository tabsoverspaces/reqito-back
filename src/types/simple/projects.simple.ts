import { ProjectCommon } from "../common/projects.common";

export interface SimpleProject extends ProjectCommon {
  functional: {
    sections: string[];
  };
  actors: string[];
}
