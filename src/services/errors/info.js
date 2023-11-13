
export const generateProductErrorInfo = (P) =>{
    return `
    title: Necesita recibir un string, y recibio ${P.title}
    price: Necesita recibir un numero, y recibio ${P.price}
    code: Necesita recibir un string, y recibio ${P.code}
    category: Necesita recibir un string, y recibio ${P.category}
    `
}

export const generateProductErrorParam = (pid) => {
    return `
    Necesita recibir un id de un producto valido, y se recibio: ${pid}
    `
}

export const generateCartErrorParam = (cid) => {
    return `
    Necesita recibir un id de un carrito valido, y se recibio: ${cid}
    `
}