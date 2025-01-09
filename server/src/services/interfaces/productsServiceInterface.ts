import { Product } from '@prisma/client';

export interface IProductsService {
  getAllProducts(params: { offset: number; limit: number }): Promise<{
    products: Product[];
    total: number;
  }>;
}