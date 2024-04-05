import Express from "express";
import {
  getAllProducts,
  creatProduct,
  removeProduct,
  getSingleProduct,
  updateProduct,
} from "../controller/ProductsController";
export const router = Express.Router();

router.get("/", getAllProducts);
router.get("/edit/:id", getSingleProduct);
router.put("/update", updateProduct);
router.post("/add", creatProduct);
router.delete("/:id", removeProduct);
