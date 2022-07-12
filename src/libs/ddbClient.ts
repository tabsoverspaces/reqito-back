import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = "eu-west-2";

const ddbClient = new DynamoDBClient({ region: REGION });
export { ddbClient };

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
export { ddbDocClient };
