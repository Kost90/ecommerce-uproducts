"use server";

import { z } from "zod";
import crypto from "crypto";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  S3Client,
  PutObjectCommand,
  S3ClientConfig,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ProductsApi from "@/api/ProductsApi/ProductsApi";

const bucketName = process.env.AWS_BUCKET_NAME;

// Generator of random name
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// Initial validationg schemas
const fileSchema = z.instanceof(File, { message: "Required" });

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  image: fileSchema.refine((file) => file.size > 0, "Required"),
});

// Initial S3Config for S3 Bucket AWS
const s3Config: S3ClientConfig = {
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
};

//S3 client instance
const s3 = new S3Client(s3Config);

// Function for uploading photos to AWS
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

// Function for sending Data to Node.js Server and DB
export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;
  const file = data.image;

  const imageName = generateFileName();

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = await uploadFileToS3(buffer, imageName);

  const requestData = {
    name: data.name,
    imageKey: fileName,
    imagePath: "path",
    description: data.description,
    priceInCents: data.priceInCents,
  };

  await ProductsApi.AddProduct(requestData);

  revalidatePath("/admin");
  revalidatePath("/admin/products");

  redirect("/admin/products");
}

// Function that generate url for image from S3 Bucket AWS
export async function getProductsUrl(key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  const seconds = 60;
  const url = await getSignedUrl(s3, command, { expiresIn: seconds });

  return url;
}

// function for Delete media from S3 AWS.
export async function deleteFileS3(key: string) {
  const deleteParams = {
    Bucket: bucketName,
    Key: key,
  };
  return s3.send(new DeleteObjectCommand(deleteParams));
}

// function for delete product from DB
export async function deleteProduct(id: string, filename: string) {
  await deleteFileS3(filename);
  await ProductsApi.removeProduct(id);
  revalidatePath("/admin/products");
  return console.log(`Product ${id} is deleted`);
}
