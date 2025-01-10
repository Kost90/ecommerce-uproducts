import { Product } from '@prisma/client';

export interface IProductsRepository {
  getAllProducts(pagination: { offset: number; limit: number }): Promise<{
    products: Product[];
    total: number;
  }>;
  getByCategory(params: { category: string; offset: number; limit: number }): Promise<{ products: Product[]; total: number }>;
  searchByName(name: string): Promise<{ products: Product[]; total: number } | unknown>;
}
