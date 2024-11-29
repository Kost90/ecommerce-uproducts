import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
import { Response, Request } from "express";
import { getProductsUrl } from "../utils/getImageUrl";

const prisma = new PrismaClient();

// Function for get All products
export async function getAllProducts(
  req: Request,
  res: Response
): Promise<Product[] | Product | unknown> {
  try {
    const limit = 6;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const [products, countProducts] = await Promise.all([
      prisma.product.findMany({
        skip: offset,
        take: limit,
      }),
      prisma.product.count(),
    ]);

    if (!products) {
      throw new Error(`Products is undefined or null`);
    }
    for (const product of products) {
      product.imagePath = await getProductsUrl(product.imageKey);
    }
    const result = {
      products: products,
      total: countProducts,
    };

    return res.status(200).json(result);
  } catch (error) {
    throw new Error(
      `Error in ProductsController method getAllProducts: ${error}`
    );
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
    if (!product) {
      throw new Error(`product is undefined or null`);
    }

    return res.status(200).json(product);
  } catch (error) {
    return console.error(`Can't find single product: ${error}`);
  }
}

// FUNCTION FOR SEARCH PRODUCTS BY NAME
export async function searchProducts(
  req: Request,
  res: Response
): Promise<Product[] | Product | unknown> {
  try {
    const name = req.params.name;
    const lowercaseProductName = name.toLowerCase();
    const product = await prisma.product.findMany({
      where: { name: lowercaseProductName },
    });

    if (!product) {
      throw new Error(`product is undefined or null`);
    }

    if (product && Array.isArray(product)) {
      for (const el of product) {
        el.imagePath = await getProductsUrl(el.imageKey);
      }
    }
    return res.status(200).json(product);
  } catch (error) {
    return console.error(`Product doesn't exist: ${error}`);
  }
}

// FUNCTION FOR POST NEW PRODUCT TO THE S3 BUCKET AND DB
export async function creatProduct(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { name, imagePath, description, priceInCents, imageKey, categories } =
      req.body;
    const lowerCaseName = name.toLowerCase();
    const result = await prisma.product.create({
      data: {
        name: lowerCaseName,
        imagePath: imagePath,
        imageKey: imageKey,
        description: description,
        priceInCents: priceInCents,
        categories: categories,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return console.error(`Product didn't created: ${error}`);
  }
}

// Update function
export async function updateProduct(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const {
      id,
      name,
      description,
      priceInCents,
      imageKey,
      imagePath,
      categories,
    } = req.body;
    const lowerCaseName = name.toLowerCase();
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name: lowerCaseName,
        description: description,
        priceInCents: priceInCents,
        imageKey: imageKey,
        imagePath: imagePath,
        categories: categories,
      },
    });
    if (!updatedProduct) {
      throw new Error(`updatedProduct is undefined or null`);
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return console.error(`Can't update product: ${error}`);
  }
}

// Remove function
export async function removeProduct(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const result = await prisma.product.delete({ where: { id: id } });
  return res.json(result);
}
