import { EError } from "../services/errors/enums.js";

export const errorHandler = (error, req,res,next) => {
    switch (error.code) {
        case EError.INVALID_TYPE:
            res.send({status:"error", error: error.cause, message: error.message})
            break;
        case EError.INVALID_PARAM:
            res.send({status:"error", message: error.message})
            break;
        default:
            res.send({status:"error", message: "error inesperado."})
            break;
    }
    next();
}