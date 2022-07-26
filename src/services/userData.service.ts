import { UserData } from "../types/userData.type";
import { UserDataS3API } from "../data/s3/domains/userData.s3";

async function getUserData(email: string): Promise<UserData | Error> {
  return UserDataS3API.getUserData(email);
}

async function storeUserData(userData: UserData) {
  return UserDataS3API.storeUserData(userData);
}

export const UserDataService = {
  storeUserData,
  getUserData,
};
