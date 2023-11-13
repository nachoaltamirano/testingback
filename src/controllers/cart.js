import { getCarts, createCarts, addProductCart, deleteProducts, modiCantidad} from "../services/cart.js";
import { ticketsModel } from "../models/ticket.model.js";
import { getid } from "../../ProductManager.js";
import { getProductById } from "../services/product.js";
import CustomError from "../services/errors/customError.js";
import {EError} from '../services/errors/enums.js'
import { generateCartErrorParam } from "../services/errors/info.js";
import TicketManager from "../models/DAO/ticketM.js";
import CManager from "../models/DAO/cartM.js";
import PManager from "../models/DAO/prodM.js";
let ticketManager = new TicketManager;
let manager = new CManager;
let prodManager = new PManager

export const getCart = async (req, res)=>{
    let cid = req.params.cid;
    let product;
    try {
      product = await getCarts(cid);
      console.log(JSON.stringify(product, null, '\t'))
    } catch (error) {
        req.logger.error('error cart'+ error)
      res.status(400).send({ status: "error", msg: "Producto no encontrado" }) 
    }
    res.send({ status: "success", payload: product})
}

export const createCart = async (req, res)=>{
    let newCart; 
    try {
      newCart = await createCarts();
      res.send({ status: "success", payload: newCart})
    } catch (error) {
        req.logger.error('error cart'+ error)
        res.status(400).send({ status: "error", msg: "error" }) 
    } 
}

export const addProduct = async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const productCart = await addProductCart(cid, pid);

    res.status(productCart.code).send({ status: productCart.status, message: productCart.message });
}

export const deleteProduct = async (req, res)=> {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await deleteProducts(cid, pid);
    
    res.status(result.code).send({ status: result.status, message: result.message });
    }

export const modificarCantidad = async (req,res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    let {cantidad} = req.body;

    let result = await modiCantidad(cid, pid, cantidad)
    res.status(result.code).send({ status: result.status, message: result.message })
}

export const deleteCart = async(req, res)=>{
    let cid = req.params.cid;

    let carrito = await getCarts(cid)
    if(!carrito){
        CustomError.createError({
          name: 'error',
          cause: generateCartErrorParam(cid),
          code: EError.INVALID_PARAM,
          message: 'Error al borrar el carrito'
        })
    }

    carrito.products = [];
    res.send({status:"success", msg:"Se han borrado todos los productos del carrito"})

}

export const purchaseCart = async(req,res) => {

    let cid = req.params.cid
    let productosNoStock = []
    let amount = 0
    let result;
    
    const cart = await manager.getCartById(cid);

    if(cart.length !== 0) {
        for(let product of cart.products){
            const {producto : id} = product;
            const prod = await prodManager.getPById(id);

            if(product.quantity <= prod.stock){
                prod.stock = parseInt(prod.stock) - parseInt(product.quantity);
              let prodAct = await prodManager.updateP(id, {stock: prod.stock});
              let priceProd = prod.price * product.quantity;
              amount = amount + priceProd;
            }else{
                productosNoStock.push(product);
            }
        }
        console.log(amount, "AMOUNT");

console.log(productosNoStock, "SIN STOCK");
        let ticket = {
            amount: amount,
            code: Math.floor(Math.random() * 100000) + 1,
            purchaser: req.session.user
        }
  result = await ticketManager.createTicket(ticket)
    }
    res.send({status:"success",payload: result})

}