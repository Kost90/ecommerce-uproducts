import Express from "express";
import { getAllProducts,creatProduct,removeProduct } from "../controller/ProductsController";
export const router = Express.Router();

router.get('/',getAllProducts);
router.post('/add',creatProduct);
router.delete('/:id',removeProduct);

