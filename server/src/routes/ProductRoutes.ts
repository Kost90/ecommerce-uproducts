import Express, { Request, Response, NextFunction } from 'express';
import { AuthenticationMiddleware } from '../midlewares/authenticationMidleware';
import RequestMiddleware from '../midlewares/requestMidleware';
import ProductsValidator from '../validators/products';
import { PrismaClient } from '@prisma/client';
import InjectionService from '../services/injectionServiceFactory';
import ProductsController from '../controllers/productsController';

const prisma = new PrismaClient();
const injectionService = new InjectionService(prisma);
export const router = Express.Router();
const productsController = new ProductsController(injectionService.getProductsService());

router.get('/', AuthenticationMiddleware.verifyApiKey, RequestMiddleware.validateRequest, (req, res, next) =>
  productsController.getAllProducts(req, res, next),
);
router.get(
  '/category/:category',
  AuthenticationMiddleware.verifyApiKey,
  ProductsValidator.getProductsByCategory(),
  RequestMiddleware.validateRequest,
  (req: Request, res: Response, next: NextFunction) => productsController.getProductsByCategory(req, res, next),
);
router.get(
  '/edit/:id',
  AuthenticationMiddleware.verifyApiKey,
  ProductsValidator.getSingleProduct(),
  RequestMiddleware.validateRequest,
  (req: Request, res: Response, next: NextFunction) => productsController.getSingleProduct(req, res, next),
);
router.get(
  '/search/:name',
  AuthenticationMiddleware.verifyApiKey,
  ProductsValidator.searchProducts(),
  RequestMiddleware.validateRequest,
  (req: Request, res: Response, next: NextFunction) => productsController.serchByProductName(req, res, next),
);
router.put(
  '/update',
  AuthenticationMiddleware.verifyApiKey,
  ProductsValidator.updateProduct(),
  RequestMiddleware.validateRequest,
  (req: Request, res: Response, next: NextFunction) => productsController.updateProduct(req, res, next),
);
router.post(
  '/add',
  AuthenticationMiddleware.verifyApiKey,
  ProductsValidator.createProduct(),
  RequestMiddleware.validateRequest,
  (req: Request, res: Response, next: NextFunction) => productsController.createProduct(req, res, next),
);
router.delete(
  '/:id',
  AuthenticationMiddleware.verifyApiKey,
  ProductsValidator.removeProduct(),
  RequestMiddleware.validateRequest,
  (req: Request, res: Response, next: NextFunction) => productsController.removeProduct(req, res, next),
);
