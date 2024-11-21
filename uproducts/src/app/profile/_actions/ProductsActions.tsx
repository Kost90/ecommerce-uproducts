'use server';
import sharp from 'sharp';
import { z } from 'zod';
import crypto from 'crypto';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { S3Client, PutObjectCommand, S3ClientConfig, DeleteObjectCommand } from '@aws-sdk/client-s3';
import ProductsApi from '@/api/ProductsApi/ProductsApi';

const bucketName = process.env.AWS_BUCKET_NAME;

// Generator of random name
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

// Initial validationg schemas
const fileSchema = z.instanceof(File, { message: 'Required' });

// Инициализация схемы
const addSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  priceInCents: z.coerce.number().int().min(1, 'Price must be at least 1 cent'),
  image: fileSchema.refine((file) => file.size > 0, 'Image file is required and cannot be empty'),
  categories: z.string().min(1, 'At least one category is required'),
});

// Initial S3Config for S3 Bucket AWS
const s3Config: S3ClientConfig = {
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
};

//S3 client instance
const s3 = new S3Client(s3Config);

// Function for uploading photos to AWS
async function uploadFileToS3(file: any, fileName: string): Promise<string> {
  const fileBuffer = file;

  const params = {
    Bucket: bucketName,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: 'image/jpg',
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);
  return fileName;
}

// Function for sending Data to Node.js Server and DB
export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;
  const file = data.image;

  const imageName = generateFileName();

  const fileBuffer = await sharp(await file.arrayBuffer())
    .resize({ height: 1920, width: 1080, fit: 'contain' })
    .toBuffer();

  // const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = await uploadFileToS3(fileBuffer, imageName);

  const body = {
    name: data.name,
    imageKey: fileName,
    imagePath: 'path',
    description: data.description,
    priceInCents: data.priceInCents,
    categories: data.categories,
  };

  const res = await ProductsApi.AddProduct(body);

  if (!res.ok) {
    console.error(Error);
  }

  revalidatePath('/profile/products');
  redirect('/profile/products');
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
  revalidatePath('/profile/products');
}

// SCHEMA FOR UPDATE FUNCTION
const editSchema = addSchema.extend({
  image: fileSchema.optional(),
  imageKey: z.string().optional(),
  imagePath: z.string().optional(),
});

// FUNCTION FOR UPDATE PRODUCT
export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  // TODO: Thing how to make it more beautifull
  let data = {
    id: id,
    ...result.data,
  };

  const file = data.image;

  let FileName = '';

  if (file !== undefined) {
    if (file.size > 0) {
      const product = await ProductsApi.getSingleProduct(id);
      await deleteFileS3(product.imageKey);
      const imageName = generateFileName();
      const buffer = Buffer.from(await file.arrayBuffer());
      FileName = await uploadFileToS3(buffer, imageName);
      data = {
        id: id,
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        imageKey: FileName,
        imagePath: 'path',
        categories: data.categories,
      };
    }
  } else {
    const singleProduct = await ProductsApi.getSingleProduct(id);
    data = {
      id: id,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      imageKey: singleProduct.imageKey,
      imagePath: 'path',
      categories: data.categories,
    };
  }

  await ProductsApi.updateProduct(data);

  revalidatePath('/profile/products');

  redirect('/profile/products');
}
