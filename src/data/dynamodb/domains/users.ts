import { getItem } from "../core/get";
import { putItem } from "../core/put";

import { SimpleUser } from "../../../types/core";

async function getUser(email: string) {
  const response = await getItem("ReqitoUsers", "Email", email);

  if (response) {
    return {
      uuid: response.uuid.S as string,
      projectUuids: response.ProjectUuids.L as [],
      email: response.Email.S as string,
    };
  }
}

async function putUser(user: SimpleUser) {
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

export const UsersDynamoAPI = {
  getUser,
  putUser,
};
