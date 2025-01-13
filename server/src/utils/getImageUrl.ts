import dotenv from 'dotenv';
import { GetObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { config } from '../config/default';

dotenv.config();
const bucketName = config.awsBucket.name;

const s3Config: S3ClientConfig = {
  region: config.awsBucket.region,
  credentials: {
    accessKeyId: config.awsBucket.accessKeyId,
    secretAccessKey: config.awsBucket.secretAccessKey,
  },
};

const s3: any = new S3Client(s3Config);

export async function getProductsUrl(key: string): Promise<string> {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    const command: any = new GetObjectCommand(params);
    const seconds = 60;
    const url = await getSignedUrl(s3, command, { expiresIn: seconds });

    if (!url) {
      throw new Error(`Can't fetch product url`);
    }

    return url;
  } catch (error) {
    throw new Error(`Error in getProductsUrl function: ${error}`);
  }
}
