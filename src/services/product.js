import PManager from "../models/DAO/prodM.js"

const manager = new PManager;

export const getCategories = async () => {
    return await manager.getCategory()
}

export const getProducts = async (pageBody, limit, cat, sort) => {
    return await manager.getP(pageBody, limit, cat, sort)
}

export const getProductById = async (pid) => {
    return await manager.getPById(pid)
}

export const addProduct = async (P) => {
    return await manager.addP(P)
}

export const updateProduct = async (pid, P) => {
    return await manager.updateP(pid, P)
}

export const deleteProduct = async (pid) => {
    return await manager.deleteP(pid)
}