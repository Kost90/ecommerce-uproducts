import ProductsRepository from '../repositories/productsRepository';
import { ValidationHelper } from '../helpers/validationHelper';
import { getProductsUrl } from '../utils/getImageUrl';
import HttpCodesHelper from '../helpers/httpCodeHelper';
import ErrorWithContext from '../errors/errorWithContext';
import { IProductsService } from './interfaces/productsServiceInterface';
import { Product } from '@prisma/client';
import getLogger from '../utils/logger';
const logger = getLogger('ProductsService');

interface IPaginationParams {
  offset: number;
  limit: number;
}

interface IGetByCategoryParams extends IPaginationParams {
  category: string;
}

class ProductsService implements IProductsService {
  private productsRepository: ProductsRepository;

  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async getAllProducts({ offset = 0, limit = 6 }: IPaginationParams): Promise<{ products: Product[]; total: number }> {
    try {
      logger.info(`Fetching products with offset ${offset} and limit ${limit}`);
      const { products, total } = await this.productsRepository.getAllProducts({ offset, limit });

      ValidationHelper.checkForNullOrUndefined(products, `${this.constructor.name}: products`);
      ValidationHelper.checkForNullOrUndefined(total, `${this.constructor.name}: total`);

      logger.info(`Fetched ${products.length} products out of ${total}`);
      const updatedProducts = await this.enrichProductData(products);

      return { products: updatedProducts, total };
    } catch (error) {
      logger.error(`Error fetching products in ProductsService method getAllProducts:: ${error}`);
      throw new ErrorWithContext({}, `Error in ProductsService method getAllProducts: ${error}`, HttpCodesHelper.BAD);
    }
  }

  async getProductsByCategory({ offset = 0, limit = 6, category }: IGetByCategoryParams): Promise<{ products: Product[]; total: number }> {
    try {
      logger.info(`Fetching products with offset ${offset} and limit ${limit}`);
      const { products, total } = await this.productsRepository.getByCategory({ offset, limit, category });

      ValidationHelper.checkForNullOrUndefined(products, `${this.constructor.name}: products`);
      ValidationHelper.checkForNullOrUndefined(total, `${this.constructor.name}: total`);

      logger.info(`Fetched ${products.length} products out of ${total}`);
      const updatedProducts = await this.enrichProductData(products);

      return { products: updatedProducts, total };
    } catch (error) {
      logger.error(`Error fetching products in ProductsService method getAllProducts:: ${error}`);
      throw new ErrorWithContext({}, `Error in ProductsService method getAllProducts: ${error}`, HttpCodesHelper.BAD);
    }
  }

  async findProductById(id: string): Promise<Product | unknown> {
    try {
      const product = await this.productsRepository.findById(id);

      ValidationHelper.checkForNullOrUndefined(product, 'product');

      product!.imagePath = await getProductsUrl(product?.imageKey as string);

      return product;
    } catch (error) {
      logger.error(`Error fetching products in ProductsService method findProductById:: ${error}`);
      throw new ErrorWithContext({}, `Error in ProductsService method findProductById: ${error}`, HttpCodesHelper.BAD);
    }
  }

  async serchByProductName(name: string): Promise<{ products: Product[]; total: number }> {
    try {
      logger.info(`Fetching products by name ${name}`);
      const { products, total } = await this.productsRepository.searchByName(name);

      ValidationHelper.checkForNullOrUndefined(products, `${this.constructor.name}: products`);
      ValidationHelper.checkForNullOrUndefined(total, `${this.constructor.name}: total`);

      const updatedProducts = await this.enrichProductData(products);

      return { products: updatedProducts, total };
    } catch (error) {
      logger.error(`Error fetching products in ProductsService method serchByProductName:: ${error}`);
      throw new ErrorWithContext({}, `Error in ProductsService method serchByProductName: ${error}`, HttpCodesHelper.BAD);
    }
  }

  private async enrichProductData(products: Product[]): Promise<Product[]> {
    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imagePath: await getProductsUrl(product.imageKey).catch(() => ''),
      })),
    );
  }
}

export default ProductsService;
