import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../libs/ddbClient.js";

export async function putItem(tableName: string, item: any) {
  const putParams = {
    TableName: tableName,
    Item: item,
  };

  try {
    const data = await ddbClient.send(new PutItemCommand(putParams));
    console.log(data);
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
