import Express from "express";
import {
  getAllProducts,
  creatProduct,
  removeProduct,
  getSingleProduct,
  searchProducts,
  updateProduct,
} from "../controller/ProductsController";
import isPagination from "../midleware/paginationMidleware";
export const router = Express.Router();

router.get("/", isPagination, getAllProducts);
router.get("/edit/:id", getSingleProduct);
router.get("/search/:name", searchProducts);
router.put("/update", updateProduct);
router.post("/add", creatProduct);
router.delete("/:id", removeProduct);
