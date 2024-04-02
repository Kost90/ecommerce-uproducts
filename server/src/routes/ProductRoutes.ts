import Express from "express";
import multer from "multer";
import { getAllProducts,creatProduct } from "../controller/ProductsController";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const router = Express.Router();

router.get('/',getAllProducts);
router.post('/add',upload.single('image'),creatProduct);

