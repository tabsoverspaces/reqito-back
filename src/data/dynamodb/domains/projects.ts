import { getItem } from "../core/get";
import { putItem } from "../core/put";

import { SimpleProject } from "../../../types/core";

const projectsTableName = "ReqitoProjects";

async function getProject(uuid: string) {
  const response = await getItem(projectsTableName, "Uuid", uuid);

  if (response) {
    return {
      uuid: response.uuid.S as string,
      userOwner: response.userOwner.S as string,
      name: response.name.S as string,
      createdOn: response.createdOn.N,
    };
  }
}

async function putProject(project: SimpleProject) {
  const { uuid, userOwner, name, functional, createdOn } = project;

  return putItem(projectsTableName, {
    Uuid: {
      S: uuid,
    },
    UserOwner: {
      S: userOwner,
    },
    name: {
      S: name,
    },
    functionalSections: {
      L: functional.sections,
    },
    createdOn: {
      N: createdOn,
    },
  });
}

async function populateItem(uuid: string) {
  return { uuid, test: "123" };
}

async function populateProject(projectSimple: SimpleProject) {
  const sections = projectSimple.functional.sections.map(populateItem);

  return { ...projectSimple, functional: { sections } };
}

async function populateProjects(projectsSimple: SimpleProject[]) {
  const populateRequests = projectsSimple.map(populateProject);

  return Promise.all(populateRequests);
}

export const ProjectsDynamoAPI = {
  getProject,
  putProject,
  populateProjects,
};
