import { Productsmodel } from "../models/prod.model.js";
import { socketServer } from "../../app.js";
import { addProduct, deleteProduct } from "../services/product.js";
import { getPro, getUser, createUsers, getAllUsers, getUserByEmail, updateUsers } from "../services/views.js";
import { createHash, isValidPassword } from "../../utils.js";
import UserDTO from "../models/DTO/userDTO.js";
export const products = async (req, res) => {
    const { page = 1, limit = 4 } = req.query;
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await Productsmodel.paginate({}, { page, limit, lean: true });
    const productos = docs;
    res.render('home',
        {
            style: 'index.css',
            productos,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage
        });
}

export const productRealTimeGet = async (req, res) => {
    const productos = await Productsmodel.find().lean();
    res.render('realTimeProducts',
        {
            style: 'index.css',
            productos
        });

}

export const productRealTimePost = async (req, res) => {
    let P = req.body;
    if (!P.title || !P.description || !P.code || !P.price || !P.stock || !P.category) {
        return  res.status(400).send({status: "error", error})
    }
    let producto = await addProduct(P)
    res.send({status: "success", payload: producto})
    const productos = await getPro()
    socketServer.emit("newproduct", productos)
}

export const productRealTimeDelete = async (req, res) => {
    let pid = req.params.pid
    const producto = await deleteProduct(pid)
    producto ? res.send({status: "success", payload: producto}) : res.status(400).send({error:"no existe un producto con ese id"})
    let productos = await getPro()
    socketServer.emit("productdelete", productos)
}

export const registerPost = async (req, res) => {
    let user = req.body;
    let email = user.email
    let userFound = await getUser(email)
    if(userFound){
        res.render('register-error',{})
    }
    user.password = createHash(user.password);
    let result = await createUsers(user)
    let resultt = new UserDTO(result)
 //   console.log(resultt)
    res.render('login', {})
}

export const loginPost = async (req, res) => {
    let user = req.body
    let users = await getAllUsers()
    let userFound = users.find(u =>{
        return u.email == user.email && isValidPassword(u, user.password)
    })
    if(userFound){
        let result = new UserDTO(userFound)
     //   console.log(result)
        req.session.user = user.email
        req.session.rol = user.rol
        if(result.rol == 'admin'){
            res.redirect('/realtimeproducts')
        }else{
            res.redirect('/profile')
        }
    }else{
        res.render('login-error',{})
    }
}

export const profileGet = async (req, res) => {
    let email = req.session.user
    let user = await getUserByEmail(email)

    if(user){
        res.render('datos', {user})
    }else{
        res.redirect('/login')
    }
    
}

export const restorePost = async (req, res) => {
    let user = req.body;
    let email = user.email
    let userFound = await getUserByEmail(email)
    if(!userFound) {
        res.render('register', {})
    }else {
        let newPassword = createHash(user.password)
        let result = await updateUsers(email, newPassword)
    }
    res.render('login', {})
}