import { getItem } from "../dynamodb/get";
import { putItem } from "../dynamodb/put";
import { SimpleUser } from "../../types/core";

export async function getUser(email: string) {
  return getItem("ReqitoUsers", "Email", email);
}

export async function putUser(user: SimpleUser) {
  return putItem("ReqitoUsers", {
    uuid: {
      S: user.uuid,
    },
    ProjectUuids: {
      L: user.projectUuids,
    },
    Email: {
      S: user.email,
    },
  });
}
