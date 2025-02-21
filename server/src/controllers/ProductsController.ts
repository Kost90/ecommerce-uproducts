import { Product } from '@prisma/client';
import { Response, Request, NextFunction } from 'express';
import ProductsService from '../services/productsService';
import { config } from '../config/default';
import { ValidationHelper } from '../helpers/validationHelper';
import HttpCodesHelper from '../helpers/httpCodeHelper';
import ErrorWithContext from '../errors/errorWithContext';

class ProductsController {
  private productsService: ProductsService;
  constructor(productsService: ProductsService) {
    this.productsService = productsService;
  }

  public async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
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

  public async createProduct(req: Request, res: Response, next: NextFunction): Promise<Product | unknown> {
    try {
      const dataForSave = req.matchedData;
      ValidationHelper.checkForNullOrUndefined(dataForSave, 'dataForSave');

      console.log(dataForSave);
      const savedProduct = await this.productsService.createProduct(dataForSave);

      return res.success(savedProduct, HttpCodesHelper.OK, 'Products saved successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in ProductsController method createProduct: ${error}`, HttpCodesHelper.BAD));
    }
  }

  public async updateProduct(req: Request, res: Response, next: NextFunction): Promise<Product | unknown> {
    try {
      const dataForUpdate = req.matchedData;
      ValidationHelper.checkForNullOrUndefined(dataForUpdate, 'dataForUpdate');

      const updatedProduct = await this.productsService.updateProduct(dataForUpdate);

      return res.success(updatedProduct, HttpCodesHelper.OK, 'Product updated successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in ProductsController method updateProduct: ${error}`, HttpCodesHelper.BAD));
    }
  }

  public async removeProduct(req: Request, res: Response, next: NextFunction): Promise<Product | unknown> {
    try {
      const { id } = req.matchedData;

      ValidationHelper.checkForNullOrUndefined(id, 'id');

      const removedProduct = await this.productsService.removeProduct(id);
      return res.success(removedProduct, HttpCodesHelper.OK, 'Product removed successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in ProductsController method removeProduct: ${error}`, HttpCodesHelper.BAD));
    }
  }
}

export default ProductsController;
