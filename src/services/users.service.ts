import { v4 as uuidv4 } from "uuid";
import { putUser } from "../data/domains/users";
import { SimpleUser } from "../types/core";

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
  const { data, error } = await putUser(userObject);

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
