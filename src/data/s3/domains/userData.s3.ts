import { UserData } from "../../../types/userData.type";
import { putObject } from "../core/put";
import { UserDataAccesses } from "../../accesses/userData.access";
import { getObject } from "../core/get";
import { v4 as uuid } from "uuid";

async function storeUserData(userData: UserData) {
  const objectToStore = userData;
  if (!userData.uuid) objectToStore.uuid = uuid();

  const cleanedEmail = objectToStore.email.split("@").join("");

  return putObject(
    UserDataAccesses.userDataBucketName,
    cleanedEmail,
    objectToStore
  );
}

async function getUserData(email: string) {
  const cleanedEmail = email.split("@").join("");
  const result = await getObject(
    UserDataAccesses.userDataBucketName,
    cleanedEmail
  );

  return result;
}

export const UserDataS3API = { storeUserData, getUserData };
