import { config } from "../config/default";
import { GetObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const { name, region, accessKey, secretAccessKey } = config.bucket;

if (!accessKey || !secretAccessKey) {
  throw new Error("AWS access key and secret access key must be defined");
}

// Initial S3Config for S3 Bucket AWS
const s3Config: S3ClientConfig = {
  region: region,
  credentials: {
    accessKeyId: accessKey || "",
    secretAccessKey: secretAccessKey || "",
  },
};

//S3 client instance
const s3 = new S3Client(s3Config);

export async function getProductsUrl(key: string): Promise<string> {
  const params = {
    Bucket: name,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  const seconds = 60;
  const url = await getSignedUrl(s3, command, { expiresIn: seconds });

  return url;
}
