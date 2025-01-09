import { PrismaClient, Product } from '@prisma/client';
import ErrorWithContext from '../errors/errorWithContext';
import HttpCodesHelper from '../helpers/httpCodeHelper';
import { IProductsRepository } from './interfaces/productsRepositoryInterface';

interface IgetAllProductsParams {
  offset: number;
  limit: number;
}

class ProductsRepository implements IProductsRepository {
  private prismaClient: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prismaClient = prisma;
  }

  async getAllProducts(pagination: IgetAllProductsParams): Promise<{ products: Product[]; total: number }> {
    try {
      const [products, countProducts] = await Promise.all([
        this.prismaClient.product.findMany({
          skip: pagination.offset,
          take: pagination.limit,
        }),
        this.prismaClient.product.count(),
      ]);

      return {
        products: products,
        total: countProducts,
      };
    } catch (error) {
      throw new ErrorWithContext({}, `Error in ProductsRepository method getAllProducts: ${error}`, HttpCodesHelper.BAD);
    }
  }
}

export default ProductsRepository;
