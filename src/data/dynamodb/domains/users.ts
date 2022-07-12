import { getItem } from "../core/get";
import { putItem } from "../core/put";

import { SimpleUser } from "../../../types/core";
import { updateItem } from "../core/update";

const usersTableName = "ReqitoUsers";

async function getUser(email: string) {
  console.log(`[data/dynamodb/users] Retrieving user ${email}.`);

  const response = await getItem(usersTableName, "Email", email);

  if (response) {
    return {
      uuid: response.uuid.S as string,
      projectUuids: response.ProjectUuids.L as [],
      email: response.Email.S as string,
    };
  }
}

async function putUser(user: SimpleUser) {
  return putItem(usersTableName, {
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

async function updateUserProjects(userEmail: string, newProjects: string[]) {
  return updateItem(
    usersTableName,
    { Email: userEmail },
    "set ProjectUuids = :p",
    {
      ":p": newProjects,
    }
  );
}

export const UsersDynamoAPI = {
  getUser,
  putUser,
  updateUserProjects,
};
