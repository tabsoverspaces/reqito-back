import { validateToken } from "../api/auth";
import { ProjectService } from "../services/project.service";
import { buildResponse } from "./handler.utils";

export async function getProjects(event: any, context: any, callback: any) {
  const token = event.headers["Authorization"].split("Bearer ")[1];

  const validToken = await validateToken(token);

  if (validToken.errorMessage) {
    callback(validToken.errorMessage);
    return;
  }

  if (!validToken.body) {
    callback("Token validation failed.");
    return;
  }

  const { email } = JSON.parse(validToken.body).payload;

  console.log(
    `[users/handler/createProject] Retrieving all projects for user ${email}`
  );

  const result = await ProjectService.getProjects(email);

  return buildResponse(result);
}

export async function createProject(event: any, context: any, callback: any) {
  const { projectName } = event.body;
  const token = event.headers["Authorization"].split("Bearer ")[1];

  const validToken = await validateToken(token);

  if (validToken.errorMessage) {
    callback(validToken.errorMessage);
    return;
  }

  if (!validToken.body) {
    callback("Token validation failed.");
    return;
  }

  const { email } = JSON.parse(validToken.body).payload;

  console.log(
    `[users/handler/createProject] Creating project ${projectName} for user ${email}`
  );

  const result = await ProjectService.createProject(projectName, email);

  return buildResponse(result);
}
