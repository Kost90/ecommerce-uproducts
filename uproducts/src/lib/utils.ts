import { getProductsUrl } from "@/app/admin/_actions/ProductsActions";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function for fetching data from server and DB
export async function getData() {
  const res = await fetch("http://localhost:3001/products");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const products = await res.json();

  for (let product of products) {
    product.imagePath = await getProductsUrl(product.imageKey);
  }

  return products;
}
