import { v4 as uuid } from "uuid";
import { SimpleProject, SimpleUser } from "../types/core";
import { ProjectsDynamoAPI } from "../data/dynamodb/domains/projects";
import { UsersDynamoAPI } from "../data/dynamodb/domains/users";

async function getProjects(ownerEmail: string) {
  const user = await UsersDynamoAPI.getUser(ownerEmail);

  if (!user) {
    console.error(
      `[projects/service/getProjects] User ${ownerEmail} not found.}`
    );

    return { error: "User not found." };
  }

  var projectUuids: string[] = (user as SimpleUser).projectUuids;

  if (!projectUuids) {
    console.error(
      `[projects/service/getProjects] projectUuids not defined for user ${ownerEmail}`
    );

    projectUuids = [];
  }

  const getProjectsPromises = projectUuids.map((projectUuid: string) =>
    ProjectsDynamoAPI.getProject(projectUuid)
  );

  const projectsSimple = await Promise.all(getProjectsPromises);
  const projects = await ProjectsDynamoAPI.populateProjects(
    projectsSimple.filter((e) => e) as []
  );

  return { projects };
}

export async function createProject(projectName: string, ownerEmail: string) {
  const projectUuid = uuid();
  const projectObject: SimpleProject = {
    uuid: projectUuid,
    userOwner: ownerEmail,
    name: projectName,
    functional: { sections: [] },
    createdOn: Date.now(),
  };

  console.log(
    `[users/service/createProject] Creating project ${projectName} with id ${projectUuid} for user ${ownerEmail}.`
  );

  const { data, error } = await ProjectsDynamoAPI.putProject(projectObject);

  if (error) {
    console.error(
      `[users/service/createProject] Error while creating project ${projectName} - ${JSON.stringify(
        error
      )}`
    );
    return { error };
  }

  console.log(
    `[users/service/createProject] Project ${projectName} successfully created.`
  );

  return { ...data, projectObject };
}

export const ProjectService = {
  createProject,
  getProjects,
};
