import Express from 'express';
import {
  creatProduct,
  removeProduct,
  getSingleProduct,
  searchProducts,
  updateProduct,
  getProductsByCategory,
} from '../controllers/productsController';
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

router.get('/', AuthenticationMiddleware.verifyApiKey, RequestMiddleware.validateRequest, productsController.getAllProducts);
router.get(
  '/:category',
  AuthenticationMiddleware.verifyApiKey,
  ProductsValidator.getProductsByCategory,
  RequestMiddleware.validateRequest,
  getProductsByCategory,
);
router.get('/edit/:id', getSingleProduct);
router.get('/search/:name', searchProducts);
router.put('/update', updateProduct);
router.post('/add', creatProduct);
router.delete('/:id', removeProduct);
