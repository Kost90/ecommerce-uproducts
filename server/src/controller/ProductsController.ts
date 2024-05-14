import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

// Function for get All products
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

// FUNCTION FOR GET SINGLE PRODUCT
export async function getSingleProduct(
  req: Request,
  res: Response
): Promise<Product | unknown> {
  try {
    const id = req.params.id;
    const product = await prisma.product.findUnique({ where: { id: id } });
    if (product !== null) {
      return res.json(product);
    }
  } catch (error) {
    return console.error(`Can't find single product`);
  }
}

// FUNCTION FOR POST NEW PRODUCT TO THE S3 BUCKET AND DB
export async function creatProduct(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { name, imagePath, description, priceInCents, imageKey, categories } = req.body;

    const result = await prisma.product.create({
      data: {
        name: name,
        imagePath: imagePath,
        imageKey: imageKey,
        description: description,
        priceInCents: priceInCents,
        categories:categories,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return console.error(`Product didn't created`);
  }
}

// Update function
export async function updateProduct(req: Request, res: Response) {
  const { id, name, description, priceInCents, imageKey, imagePath, categories } = req.body;
  try {
    const response = await prisma.product.update({
      where: { id: id },
      data: {
        name: name,
        description: description,
        priceInCents: priceInCents,
        imageKey: imageKey,
        imagePath: imagePath,
        categories:categories,
      },
    });
    if (response !== null) {
      return res.json(response);
    }
  } catch (error) {
    return console.error(`Can't update product`);
  }
}

// Remove function
export async function removeProduct(req: Request, res: Response) {
  let id = req.params.id;
  const result = await prisma.product.delete({ where: { id: id } });
  return res.json(result);
}
