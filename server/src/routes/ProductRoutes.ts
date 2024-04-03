import Express from "express";
import { getAllProducts,creatProduct } from "../controller/ProductsController";
export const router = Express.Router();

router.get('/',getAllProducts);
router.post('/add',creatProduct);

