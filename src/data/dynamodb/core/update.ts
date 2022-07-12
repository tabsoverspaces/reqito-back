import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../../../libs/ddbClient";

export async function updateItem(
  tableName: string,
  key: any,
  updateExpression: string,
  expressionAttributeValues: any
) {
  const updateParams = {
    TableName: tableName,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const data = await ddbDocClient.send(new UpdateCommand(updateParams));
    return { data };
  } catch (err) {
    console.error(err);
    return { error: err };
  }
}
