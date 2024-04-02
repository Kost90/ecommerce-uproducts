import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
import { Response, Request } from "express";
import { S3Client, PutObjectAclCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const credentials = {
  accessKeyId: accessKey,
  secretKey: secretAccessKey,
};

const s3 = new S3Client({
  region: bucketRegion,
  ...credentials,
});

const prisma = new PrismaClient();

export async function getAllProducts(
  req: Request,
  res: Response
): Promise<Product[] | Product | unknown> {
  try {
    const products = await prisma.product.findMany();
    if (products !== null) {
      return res.json(products);
    }
  } catch (error) {
    return console.error(`Products didn't found`);
  }
}





// FUNCTION FOR POST NEW PRODUCT TO THE S3 BUCKET AND DB
export async function creatProduct(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { name, image, description, priceInCents } = req.body;



// TODO: Error: Multipart: Boundary not found how to fix it.

// TODO:I take file from form, than I need to save string to the DB and send File to the S3!
    console.log(req.body)
    // const params = {
    //   Bucket:bucketName,
    //   Key:req.file?.originalname,
    //   Body:req.file?.buffer,
    //   ContentType:req.file?.mimetype,
    // }

    // const command = new PutObjectAclCommand(params)

    // await s3.send(command)

    // const result = await prisma.product.create({
    //   data: {
    //     name: name,
    //     imagePath: imagePath,
    //     description: description,
    //     priceInCents: priceInCents,
    //   },
    // });
    // return res.status(200).json(result);
  } catch (error) {
    return console.error(`Product didn't created`);
  }
}
