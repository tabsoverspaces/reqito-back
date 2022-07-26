import { Actor } from "./types/actors";

interface DefaultsType {
  actors: Actor[];
}

export const Defaults: DefaultsType = {
  actors: [
    { uuid: "uuid-system", actorName: "System", editDisabled: false },
    { uuid: "uuid-user", actorName: "User", editDisabled: false },
  ],
};
