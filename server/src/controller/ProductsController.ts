import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
import { Response, Request } from "express";

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
    const { name, imagePath, description, priceInCents, imageKey } = req.body;

    const result = await prisma.product.create({
      data: {
        name: name,
        imagePath: imagePath,
        imageKey: imageKey,
        description: description,
        priceInCents: priceInCents,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return console.error(`Product didn't created`);
  }
}

// Remove function
export async function removeProduct(req: Request, res: Response) {
  let id = req.params.id;
  const result = await prisma.product.delete({ where: { id: id } });
  return res.json(result);
}
