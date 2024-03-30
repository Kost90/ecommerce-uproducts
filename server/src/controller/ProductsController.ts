import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export async function getAllProducts(): Promise<Product[] | Product | unknown> {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    return console.error(`Products didn't found`);
  }
}

export async function creatProduct(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { name, imagePath, description, priceInCents } = req.body;
    const result = await prisma.product.create({
      data: {
        name: name,
        imagePath: imagePath,
        description: description,
        priceInCents: priceInCents,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return console.error(`Product didn't created`);
  }
}
