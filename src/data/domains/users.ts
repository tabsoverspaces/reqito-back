import { getItem } from "../dynamodb/get";
import { putItem } from "../dynamodb/put";
import { SimpleUser } from "../../types/core";

export async function getUser(username: string) {
  return getItem("Users", "username", username);
}

export async function putUser(user: SimpleUser) {
  return putItem("Users", user);
}
