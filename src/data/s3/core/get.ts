import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../../libs/S3Client";

export async function getObject(
  bucketName: string,
  objKey: string
): Promise<any | { error: string | any }> {
  const getParams = {
    Bucket: bucketName,
    Key: objKey,
  };

  try {
    const data = await s3Client.send(new GetObjectCommand(getParams));
    const bodyContents = await readableStreamToString(data.Body);

    return bodyContents;
  } catch (error) {
    console.log("Error", error);
    return { error };
  }
}

function readableStreamToString(stream: any) {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
