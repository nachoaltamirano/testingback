import { Router } from "express";
import { getCart, createCart, addProduct, deleteProduct, modificarCantidad, deleteCart, purchaseCart } from "../controllers/cart.js";
const Crouter = Router();

Crouter.post("/", createCart);

Crouter.get("/:cid", getCart);

Crouter.post("/:cid/products/:pid", addProduct);

Crouter.delete("/:cid/products/:pid", deleteProduct);

Crouter.put("/:cid/products/:pid", modificarCantidad);

Crouter.delete('/:cid', deleteCart);

Crouter.post("/:cid/purchase", purchaseCart)


export default Crouter;