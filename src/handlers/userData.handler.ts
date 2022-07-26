import {
  validateToken,
  TokenValidationFailed,
  TokenValidationSuccessful,
} from "../api/auth";
import { buildResponse } from "./handler.utils";
import { UserDataService } from "../services/userData.service";

export async function storeUserData(event: any, context: any, callback: any) {
  const token = event.headers["Authorization"].split("Bearer ")[1];

  const tokenValidation = await validateToken(token);

  if ((tokenValidation as any).error) {
    callback((tokenValidation as TokenValidationFailed).error);
    return;
  }

  const { email } = tokenValidation as TokenValidationSuccessful;

  console.log(
    `[userData/handler/storeUserData] Saving user data for user ${email}`
  );

  const { userData } = event.body;

  const result = await UserDataService.storeUserData(userData);

  if (result && (result as any).error) {
    console.error(
      `[userData/handler/storeUserData] Failed to store user data for user ${email} - ${JSON.stringify(
        (result as any).error
      )}`
    );
    callback("Failed to store user data.");
    return;
  }

  console.log(
    `[userData/handler/storeUserData] Result for user ${email}: ${JSON.stringify(
      result
    )}`
  );

  return buildResponse({ result });
}

export async function getUserData(event: any, context: any, callback: any) {
  const token = event.headers["Authorization"].split("Bearer ")[1];

  const tokenValidation = await validateToken(token);

  console.log("token valid", tokenValidation);

  if ((tokenValidation as any).error) {
    callback((tokenValidation as TokenValidationFailed).error);
    return;
  }

  const { email } = tokenValidation as TokenValidationSuccessful;

  console.log(
    `[userData/handler/getUserData] Retrieving user data for user ${email}`
  );

  const result = await UserDataService.getUserData(email);

  return buildResponse(result);
}
