import { PopulatedProject } from "./populated/projects.populated";

export interface UserData {
  email: string;
  username: string;
  projects: PopulatedProject[];
  uuid?: string;
}
