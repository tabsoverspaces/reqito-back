import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../../libs/ddbClient";

export async function putItem(tableName: string, item: any) {
  const putParams = {
    TableName: tableName,
    Item: item,
  };

  console.log(
    `[data/dynamodb/core/put] Inserting ${JSON.stringify(
      item
    )} into ${tableName} `
  );

  try {
    const data = await ddbClient.send(new PutItemCommand(putParams));

    console.log(
      `[data/dynamodb/core/put] Insert result ${JSON.stringify(data)}`
    );

    return { data };
  } catch (error: any) {
    console.error(
      `[data/dynamodb/put] Error while inserting into ${tableName}: ${JSON.stringify(
        error
      )}`
    );

    return { error };
  }
}
