import { Router } from "express";
import { generarProductos } from "../controllers/mocks.js";

let router = Router()

router.get('/', generarProductos)

export default router;