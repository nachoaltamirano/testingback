import CManager from "../models/DAO/cartM.js"
import PManager from "../models/DAO/prodM.js"
import TicketManager from "../models/DAO/ticketM.js";

const prodManager = new PManager;
const manager = new CManager;
const ticketManager = new TicketManager;

export const getCarts = async (cid) => {
    return await manager.getCartById(cid)
}



export const createCarts = async () => {
    return await manager.createCart()
}

export const addProductCart = async (cid, pid) => {
    return await manager.addProductInCart(cid, pid)
}

export const deleteProducts = async (cid, pid) => {
    return await manager.deleteProductInCart(cid, pid)
}

export const modiCantidad = async (cid, pid, cantidad) => {
    return await manager.modCantidad(cid, pid, cantidad)
}

//export const purchaseBuy = async (cid) => {
  //  let productosNoStock = []
 //   let amount = 0
    
  //  const cart = await manager.getCartById(cid);

  //  if(cart.length !== 0) {
   //     for(let product of cart.products){
     //       const {producto : id} = product;
      //      const prod = await prodManager.getPById(id);

      //      if(product.quantity <= prod.stock){
       //         prod.stock = parseInt(prod.stock) - parseInt(product.quantity);
        //      let prodAct = await prodManager.updateP(id, {stock: prod.stock});
        //      let priceProd = prod.price * product.quantity;
           //   amount = amount + priceProd;
         //   }else{
        //        productosNoStock.push(product);
         //   }
      //  }
     ///   console.log(amount, "AMOUNT");

//console.log(productosNoStock, "SIN STOCK");
      //  let ticket = {
     //       amount: amount,
     //       code: Math.floor(Math.random() * 100000) + 1,
      //      purchaser: req.session.user
      ///  }
//let ticketHecho = await ticketManager.createTicket(ticket)
//return ticketHecho;

  //  }

//}

