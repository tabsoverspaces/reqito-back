import { validateToken } from "../api/auth";
import { getUser } from "../data/domains/users";
import { UserService } from "../services/users.service";
import { buildResponse } from "./handler.utils";

export async function createUser(event: any, context: any, callback: any) {
  const { email } = event.body;
  const token = event.headers["Authorization"].split("Bearer ")[1];

  console.log(`[users/handler/createUser] Creating user ${email}`);

  const validToken = await validateToken(token);

  if (validToken.errorMessage) {
    callback(validToken.errorMessage);
    return;
  }

  console.log(
    `[users/handler/createUser] Token validated: ${JSON.stringify(validToken)}`
  );
  const validatedEmail = JSON.parse(validToken.body).payload.email;

  // validate user can create his own account
  if (validatedEmail !== email) {
    callback("User not allowed to create user.");
    return;
  }

  // validate user does not have an account exising already
  const userAlreadyExists = await getUser(email);

  if (userAlreadyExists) {
    console.log(
      `[handlers/users/createUser] User ${email} already exists in Dynamo.`
    );
    callback("User already created");
    return;
  }

  console.log(
    `[users/handler/createUser] Validation OK: creating user ${email} in DynamoDB.`
  );
  const result = await UserService.createUser(email);

  return buildResponse(result);
}
