export interface SimpleUser {
  uuid: string;
  email: string;
  projectUuids: string[];
}

export interface SimpleProject {
  uuid: string;
  userOwner: string;
  name: string;
  functional: {
    sections: string[];
  };
}
