import Express from 'express';
import {
  getAllProducts,
  creatProduct,
  removeProduct,
  getSingleProduct,
  searchProducts,
  updateProduct,
  getProductsByCategory,
} from '../controllers/ProductsController';
import { AuthenticationMiddleware } from '../midlewares/authenticationMidleware';
export const router = Express.Router();

router.get('/', AuthenticationMiddleware.verifyApiKey, getAllProducts);
router.get('/:category', getProductsByCategory);
router.get('/edit/:id', getSingleProduct);
router.get('/search/:name', searchProducts);
router.put('/update', updateProduct);
router.post('/add', creatProduct);
router.delete('/:id', removeProduct);
