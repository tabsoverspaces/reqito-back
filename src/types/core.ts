export interface SimpleUser {
  uuid: string;
  email: string;
  projectUuids: string[];
}

interface ProjectCommon {
  uuid: string;
  userOwner: string;
  name: string;
  createdOn: number;
}

export interface SimpleProject extends ProjectCommon {
  functional: {
    sections: string[];
  };
}

export interface Project extends ProjectCommon {
  functional: {
    sections: SimpleItem[];
  };
}

interface SimpleItem {}
