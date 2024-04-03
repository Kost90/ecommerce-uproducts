"use server";

import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import ProductsApi from "@/api/ProductsApi/ProductsApi";

const bucketName = process.env.AWS_BUCKET_NAME;

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
    ContentType: "image/*",
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

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = await uploadFileToS3(buffer, file.name);

  const requestData = {
    name: data.name,
    imagePath: fileName,
    description: data.description,
    priceInCents: data.priceInCents,
  };

  await ProductsApi.AddProduct(requestData);

  revalidatePath("/admin");
  // revalidatePath("/products")

  redirect("/admin");
}
