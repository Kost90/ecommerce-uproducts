import { PrismaClient, Product } from '@prisma/client';
import ErrorWithContext from '../errors/errorWithContext';
import HttpCodesHelper from '../helpers/httpCodeHelper';
import { IProductsRepository } from './interfaces/productsRepositoryInterface';

interface IPaginationParams {
  offset: number;
  limit: number;
}

interface IGetByCategoryParams extends IPaginationParams {
  category: string;
}

class ProductsRepository implements IProductsRepository {
  private prismaClient: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prismaClient = prisma;
  }

  async getAllProducts(pagination: IPaginationParams): Promise<{ products: Product[]; total: number }> {
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

  async getByCategory(params: IGetByCategoryParams): Promise<{ products: Product[]; total: number }> {
    try {
      const [products, countProducts] = await Promise.all([
        this.prismaClient.product.findMany({
          skip: params.offset,
          take: params.limit,
          where: { categories: params.category },
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

  async findById(id: string): Promise<Product | null> {
    try {
      const product = await this.prismaClient.product.findUnique({ where: { id: id } });

      return product;
    } catch (error) {
      throw new ErrorWithContext({}, `Error in ProductsRepository method findById: ${error}`, HttpCodesHelper.BAD);
    }
  }

  async searchByName(name: string): Promise<{ products: Product[]; total: number }> {
    try {
      const [products, countProducts] = await Promise.all([
        this.prismaClient.product.findMany({
          where: {
            name: { contains: name, mode: 'insensitive' },
          },
        }),
        this.prismaClient.product.count({
          where: {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
        }),
      ]);

      return {
        products: products,
        total: countProducts,
      };
    } catch (error) {
      throw new ErrorWithContext({}, `Error in ProductsRepository method searchByName: ${error}`, HttpCodesHelper.BAD);
    }
  }

  public async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      const result = await this.prismaClient.product.create({ data: product });
      return result;
    } catch (error) {
      throw new ErrorWithContext({}, `Error in ProductsRepository method createProduct: ${error}`, HttpCodesHelper.BAD);
    }
  }
}

export default ProductsRepository;
