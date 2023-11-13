import { getCategories, getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../services/product.js";
import CustomError from "../services/errors/customError.js";
import { EError } from "../services/errors/enums.js";
import { generateProductErrorInfo, generateProductErrorParam } from "../services/errors/info.js";

export const getAllProducts = async (req,res) => {
    const pageBody = req.query.page || 1;
    const limit = req.query.limit || 10;
    const cat = req.query.category;
    const sort = req.query.sort || "asc";
    try {
        let categories = await getCategories()
        categories = categories.map((category) => ({
            name: category,
            selected: category === cat
        }))
        let result = await getProducts(pageBody, limit, cat, sort)

        let data = {
            prods: result.docs,
            hasPrevPage: result.hasPrevPage,
            prevPage: result.prevPage,
            hasNextPage: result.hasNextPage,
            nextPage: result.nextPage,
            page: result.page,
            prevLink: result.hasPrevPage ? `/api/p?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `/api/p?page=${result.nextPage}` : null
        }
        res.send(data)
    } catch (error) {
        req.logger.error('error producto'+ error)
        res.status(500).send('Error interno')
    }
}

export const getProduct = async (req, res)=>{
    let pid = req.params.pid;
    let product;
    try {
        product = await getProductById(pid)
        if(product === undefined){
            CustomError.createError({
                name: 'Error',
                cause: generateProductErrorParam(pid),
                message: 'El id del producto no existe',
                code: EError.INVALID_PARAM
            })
        }
    } catch (error) {
        req.logger.error('error producto'+ error)
        res.status(400).send({status: "error", error})
    }
    res.send({status: "success", payload: product})
}

export const createProduct = async (req, res)=>{
    let P = req.body;
    let product;
    if (!P.title || !P.description || !P.code || !P.price || !P.stock || !P.category) {
        CustomError.createError({
            name: 'Error',
            cause: generateProductErrorInfo(P),
            message: 'Error al intentar crear el producto',
            code: EError.INVALID_TYPE
        })
    }
    try {
       product = await addProduct(P)
    } catch (error) {
        req.logger.error('error producto'+ error)
        res.status(400).send({status: "error", error})
    }
    res.send({status: "success", payload: product})
}

export const updateProducts = async (req, res) => {
    let pid = req.params.pid;
    let P = req.body;
    if (!P.title || !P.description || !P.code || !P.price || !P.stock || !P.category) {
        CustomError.createError({
            name: 'Error',
            cause: generateProductErrorInfo(P),
            message: 'Error al intentar crear el producto',
            code: EError.INVALID_TYPE
        })
    }
    try {
        await updateProduct(pid, P)
    } catch (error) {
        req.logger.error('error producto'+ error)
        res.status(400).send({status: "error", error})
    }
    res.send({status: "success", msg: "Producto updateado"})
}

export const deleteProducts = async(req, res)=>{
    let pid = req.params.pid;
    let productDelete; 
    try {
        productDelete = await deleteProduct(pid);
        if(productDelete === undefined){
            CustomError.createError({
                name: 'Error',
                cause: generateProductErrorParam(pid),
                message: 'El id del producto no existe',
                code: EError.INVALID_PARAM
            })
        }
    } catch (error) {
        req.logger.error('error producto'+ error)
        res.status(400).send({ status: "error", msg: "error al borrar el producto" })
    }
    res.send({ status: "success", msg: "Producto borrado"})
}