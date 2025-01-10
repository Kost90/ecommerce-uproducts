import { PrismaClient } from '@prisma/client';
import { Product } from '@prisma/client';
import { Response, Request, NextFunction } from 'express';
import { getProductsUrl } from '../utils/getImageUrl';
import ProductsService from '../services/productsService';
import { config } from '../config/default';
import { ValidationHelper } from '../helpers/validationHelper';
import HttpCodesHelper from '../helpers/httpCodeHelper';
import ErrorWithContext from '../errors/errorWithContext';

const prisma = new PrismaClient();

class ProductsController {
  private productsService: ProductsService;
  constructor(productsService: ProductsService) {
    this.productsService = productsService;
  }

  public async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<Product[] | unknown> {
    try {
      const matchedData = req?.matchedData;

      ValidationHelper.checkForNullOrUndefined(matchedData, `matchedData`);

      const limit = config.limits.products.paginationsLimit;
      const page = Number(matchedData.page) || 1;
      const offset = (page - 1) * limit;

      const { products, total } = await this.productsService.getAllProducts({
        offset: offset,
        limit: limit,
      });

      const result = {
        products: products,
        total: total,
      };

      return res.success(result, HttpCodesHelper.OK, 'Products fetched successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in ProductsController method getAllProducts: ${error}`, HttpCodesHelper.BAD));
    }
  }

  public async getProductsByCategory(req: Request, res: Response, next: NextFunction): Promise<Product[] | Product | unknown> {
    try {
      const { category, page = 1 } = req?.matchedData;
      ValidationHelper.checkForNullOrUndefined(category, 'category params');

      const limit = config.limits.products.paginationsLimit;
      const offset = (page - 1) * limit;

      const { products, total } = await this.productsService.getProductsByCategory({
        offset: offset,
        limit: limit,
        category,
      });

      const result = {
        products: products,
        total: total,
      };

      return res.success(result, HttpCodesHelper.OK, 'Products by category fetched successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in ProductsController method getProductsByCategory: ${error}`, HttpCodesHelper.BAD));
    }
  }

  public async getSingleProduct(req: Request, res: Response, next: NextFunction): Promise<Product | unknown> {
    try {
      const { id } = req.matchedData;
      ValidationHelper.checkForNullOrUndefined(id, 'id');

      const product = await this.productsService.findProductById(id);

      ValidationHelper.checkForNullOrUndefined(product, 'product');

      return res.success(product, HttpCodesHelper.OK, 'Product by id fetched successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in ProductsController method getSingleProduct: ${error}`, HttpCodesHelper.BAD));
    }
  }

  public async serchByProductName(req: Request, res: Response, next: NextFunction): Promise<Product | Product[] | unknown> {
    try {
      const { name } = req.matchedData;
      ValidationHelper.checkForNullOrUndefined(name, 'name');

      const { products, total } = await this.productsService.serchByProductName(name);

      const result = {
        products: products,
        total: total,
      };

      return res.success(result, HttpCodesHelper.OK, 'Products by name fetched successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in ProductsController method serchByProductName: ${error}`, HttpCodesHelper.BAD));
    }
  }
}


// FUNCTION FOR POST NEW PRODUCT TO THE S3 BUCKET AND DB
export async function creatProduct(req: Request, res: Response): Promise<Response | void> {
  try {
    // TODO: take all from matchedData
    const { name, imagePath, description, priceInCents, imageKey, categories } = req.body;
    // const lowerCaseName = name.toLowerCase();
    const result = await prisma.product.create({
      data: {
        name: name,
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
export async function updateProduct(req: Request, res: Response): Promise<Response | void> {
  try {
    const { id, name, description, priceInCents, imageKey, imagePath, categories } = req.body;
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
export async function removeProduct(req: Request, res: Response): Promise<Response | void> {
  const id = req.params.id;
  const result = await prisma.product.delete({ where: { id: id } });
  return res.json(result);
}

export default ProductsController;
