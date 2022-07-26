import * as userHandler from "./src/handlers/users.handler";
import * as userDataHandler from "./src/handlers/userData.handler";

module.exports = {
  ...userHandler,
  ...userDataHandler,
};
