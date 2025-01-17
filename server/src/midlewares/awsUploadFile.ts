import dotenv from "dotenv";
import { PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { Response, Request } from "express";

dotenv.config();
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

const s3Config: S3ClientConfig = {
  region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
};

//S3 client instance
const s3 = new S3Client(s3Config);

async function uploadFileToS3(file: any, fileName: string) {
  const fileBuffer = file;

  const params = {
    Bucket: bucketName,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);
  return fileName;
}

export default async function addImage(req: Request, res: Response, next: any) {
  const file = req.file!;
  const imageName: string = req.body.imageKey;

  const buffer = Buffer.from(await file.buffer);
  const fileName = await uploadFileToS3(buffer, imageName);
  next();
}
