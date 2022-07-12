import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../../libs/ddbClient.js";

export async function deleteItem(tableName: string, key: any) {
  const deleteParams = {
    TableName: tableName,
    Key: key,
    // {
    //   UUID: { N: key },
    // },
  };

  try {
    const data = await ddbClient.send(new DeleteItemCommand(deleteParams));
    console.log("Success, item deleted", data);
    return data;
  } catch (err) {
    console.error(
      `[data/dynamodb/delete] Error while deleting from ${tableName}: ${JSON.stringify(
        err
      )}`
    );

    /*if (err && err.code === "ResourceNotFoundException") {
      console.log("Error: Table not found");
    } else if (err && err.code === "ResourceInUseException") {
      console.log("Error: Table in use");
    }*/
  }
}
