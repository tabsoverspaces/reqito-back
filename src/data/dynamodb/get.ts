import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../libs/ddbClient.js";

export async function getItem(
  tableName: string,
  key: string,
  keyValue: string
) {
  const getParams: { TableName: string; Key: any } = {
    TableName: tableName,
    Key: {},
  };

  getParams.Key[key] = { S: keyValue };

  console.log(
    `[data/dynamodb/getItem] Retrieving item ${JSON.stringify(getParams)}`
  );

  const data = await ddbClient.send(new GetItemCommand(getParams));
  console.log("Success", data.Item);
  return data.Item;
}
