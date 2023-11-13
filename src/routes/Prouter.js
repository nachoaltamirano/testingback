import { Router } from "express";
import { getAllProducts, getProduct, createProduct, updateProducts, deleteProducts } from "../controllers/product.js";
import { addLogger } from "../utils/logger.js";
const Prouter = Router()

Prouter.get('/',addLogger, getAllProducts);

Prouter.get("/:pid", getProduct);

Prouter.post("/", createProduct);

Prouter.put("/:pid", updateProducts);

Prouter.delete("/:pid", deleteProducts);

export default Prouter;