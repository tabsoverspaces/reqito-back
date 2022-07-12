import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../../libs/S3Client";

export async function getObject(bucketName: string, objKey: string) {
  const getParams = {
    Bucket: bucketName,
    Key: objKey,
  };

  try {
    // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
    const data = await s3Client.send(new GetObjectCommand(getParams));
    //   return data; // For unit tests.
    const bodyContents = await readableStreamToString(data.Body);
    console.log(bodyContents);
    return bodyContents;
  } catch (err) {
    console.log("Error", err);
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
