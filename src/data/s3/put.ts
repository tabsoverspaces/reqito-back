import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../libs/S3Client";

export async function putObject(
  bucketName: string,
  objKey: string,
  objContent: any
) {
  const putParams = {
    Bucket: bucketName,
    Key: objKey,
    Body: JSON.stringify(objContent),
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(putParams));

    console.log(`[data/s3/put] Uploaded ${objKey} to ${bucketName}`);

    return data;
  } catch (err) {
    console.error(
      `[data/s3/put] Error while sending object to S3: ${JSON.stringify(err)}`
    );
  }
}
