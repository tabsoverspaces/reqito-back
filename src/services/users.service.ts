import { v4 as uuidv4 } from "uuid";
import { SimpleUser } from "../types/core";
import { UsersDynamoAPI } from "../data/dynamodb/domains/users";

export async function createUser(email: string) {
  const uuid = uuidv4();
  const userObject: SimpleUser = {
    uuid,
    email,
    projectUuids: [],
  };

  console.log(
    `[users/service/createUser] Inserting user ${email} in DynamoDB.`
  );
  const { data, error } = await UsersDynamoAPI.putUser(userObject);

  if (error) {
    console.error(
      `[users/service/createUser] Error while inserting user ${email} in DynamoDB - error ${JSON.stringify(
        error
      )}`
    );
    return { error };
  }

  console.log(
    `[users/service/createUser] User ${email} successfully inserted in DynamoDB.`
  );

  return { ...data, uuid };
}

export const UserService = {
  createUser,
};
