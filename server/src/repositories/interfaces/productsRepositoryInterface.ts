import { Product } from '@prisma/client';

export interface IProductsRepository {
  getAllProducts(pagination: { offset: number; limit: number }): Promise<{
    products: Product[];
    total: number;
  }>;
}