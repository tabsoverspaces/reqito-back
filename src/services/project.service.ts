import { v4 as uuid } from "uuid";
import { SimpleProject, SimpleUser } from "../types/core";
import { ProjectsDynamoAPI } from "../data/dynamodb/domains/projects";
import { UsersDynamoAPI } from "../data/dynamodb/domains/users";

async function getProjects(ownerEmail: string) {
  const user = await UsersDynamoAPI.getUser(ownerEmail);

  console.log(
    `[projects/service/getProjects] Retrieving projects for ${ownerEmail}`
  );

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

  console.log(
    `[projects/service/getProjects] Found ${projectsSimple.length} simple projects in pre-processing for user ${ownerEmail}`
  );
  const projects = await ProjectsDynamoAPI.populateProjects(
    projectsSimple.filter((e) => !!e) as []
  );

  console.log(
    `[projects/service/getProjects] Found ${projects.length} projects for user ${ownerEmail}`
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
    `[projects/service/createProject] Creating project ${projectName} with id ${projectUuid} for user ${ownerEmail}.`
  );

  const { data: projectCreateData, error: projectCreateError } =
    await ProjectsDynamoAPI.putProject(projectObject);

  if (projectCreateError) {
    console.error(
      `[projects/service/createProject] Error while creating project ${projectName} - ${JSON.stringify(
        projectCreateError
      )}`
    );
    return { projectCreateError };
  }

  // Linking with user
  const user = await UsersDynamoAPI.getUser(ownerEmail);
  if (!user) {
    console.error(
      `[projects/service/createProject] User ${ownerEmail} not found while creating project ${projectName}}`
    );
    return { error: "User not found." };
  }

  const userExistingProjectUuids = user.projectUuids.map(
    (e: { S: string }) => e.S
  );
  const updatedProjects = [...userExistingProjectUuids, projectObject.uuid];

  console.log(
    `[projects/service/createProject] Updaating user ${ownerEmail} projects.`
  );
  const { data: userUpdateData, error: userUpdateError } =
    await UsersDynamoAPI.updateUserProjects(ownerEmail, updatedProjects);

  if (userUpdateError) {
    console.error(
      `[projects/service/createProject] Error while updating user ${ownerEmail} - ${JSON.stringify(
        userUpdateError
      )}`
    );

    // TODO delete project if fails ?

    return { error: userUpdateError };
  }

  console.log(
    `[projects/service/createProject] Project ${projectName} successfully created.`
  );

  return { ...projectCreateData, projectObject };
}

export const ProjectService = {
  createProject,
  getProjects,
};
