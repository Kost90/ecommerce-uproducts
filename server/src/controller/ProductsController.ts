import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllProducts(): Promise<Product[] | Product | unknown> {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    return console.error(`Products didn't found`);
  }
}


