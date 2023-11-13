import PManager from "../models/DAO/prodM.js"
import UserManager from "../models/DAO/userM.js";
import UserDTO from "../models/DTO/userDTO.js";

const userM = new UserManager;
const manager = new PManager;

export const getPro = async () => {
    return await manager.getP()
}

export const getUser = async (email) => {
    let user = await userM.getByEmail(email)
    
    return user
}

export const createUsers = async (user) => {
    return await userM.createUser(user)
}

export const getAllUsers = async () => {
    return await userM.getAll()
}

export const getUserByEmail = async (email) => {
    let user = await userM.getByEmail(email)
    let result = new UserDTO(user)
    return result
}

export const updateUsers = async (user) => {
    return await userM.updateUser(user)
}