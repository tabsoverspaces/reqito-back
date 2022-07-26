import {
  validateToken,
  TokenValidationFailed,
  TokenValidationSuccessful,
} from "../api/auth";
import { UserService } from "../services/users.service";
import { buildResponse } from "./handler.utils";
import { UsersDynamoAPI } from "../data/dynamodb/domains/users";

export async function createUser(event: any, context: any, callback: any) {
  const { email } = event.body;
  const token = event.headers["Authorization"].split("Bearer ")[1];

  console.log(`[users/handler/createUser] Creating user ${email}`);

  const tokenValidation = await validateToken(token);

  if ((tokenValidation as any).error) {
    callback((tokenValidation as TokenValidationFailed).error);
    return;
  }

  const { email: validatedEmail } =
    tokenValidation as TokenValidationSuccessful;

  console.log(
    `[users/handler/createUser] Token validated: ${JSON.stringify(
      tokenValidation
    )}`
  );

  // validate user can create his own account
  if (validatedEmail !== email) {
    callback("User not allowed to create user.");
    return;
  }

  // validate user does not have an account exising already
  const userAlreadyExists = await UsersDynamoAPI.getUser(email);

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
