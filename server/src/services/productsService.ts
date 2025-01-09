import ProductsRepository from '../repositories/productsRepository';
import { ValidationHelper } from '../helpers/validationHelper';
import { getProductsUrl } from '../utils/getImageUrl';
import HttpCodesHelper from '../helpers/httpCodeHelper';
import ErrorWithContext from '../errors/errorWithContext';
import { IProductsService } from './interfaces/productsServiceInterface';
import { Product } from '@prisma/client';
import getLogger from '../utils/logger';
const logger = getLogger('ProductsService');

interface IgetAllProductsParams {
  offset: number;
  limit: number;
}

class ProductsService implements IProductsService {
  private productsRepository: ProductsRepository;

  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async getAllProducts({ offset = 0, limit = 6 }: IgetAllProductsParams): Promise<{ products: Product[]; total: number }> {
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
