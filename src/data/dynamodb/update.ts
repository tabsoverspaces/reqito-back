import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../libs/ddbClient.js";

export async function updateItem(tableName: string, key: any) {
  const updateParams = {
    TableName: tableName,
    /*
    Convert the attribute JavaScript object you are updating to the required
    Amazon  DynamoDB record. The format of values specifies the datatype. The
    following list demonstrates different datatype formatting requirements:
    String: "String",
    NumAttribute: 1,
    BoolAttribute: true,
    ListAttribute: [1, "two", false],
    MapAttribute: { foo: "bar" },
    NullAttribute: null
     */
    Key: key,
    //  {
    //   primaryKey: { ATTRIBUTE_TYPE: "KEY_VALUE" }, // For example, 'Season': {N:2}.
    //   sortKey: { ATTRIBUTE_TYPE: "KEY_VALUE" }, // For example,  'Episode': {S: "The return"}; (only required if table has sort key).
    // },
    // Define expressions for the new or updated attributes
    UpdateExpression:
      "set NEW_ATTRIBUTE_NAME_1 = :t, NEW_ATTRIBUTE_NAME_2 = :s", // For example, "'set Title = :t, Subtitle = :s'"
    ExpressionAttributeValues: {
      ":t": "NEW_ATTRIBUTE_VALUE_1", // For example ':t' : 'NEW_TITLE'
      ":s": "NEW_ATTRIBUTE_VALUE_2", // For example ':s' : 'NEW_SUBTITLE'
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const data = await ddbClient.send(new UpdateItemCommand(updateParams));
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
