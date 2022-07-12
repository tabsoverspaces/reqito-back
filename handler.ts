import * as userHandler from "./src/handlers/users.handler";
import * as projectsHandler from "./src/handlers/projects.handler";

module.exports = { ...userHandler, ...projectsHandler };
