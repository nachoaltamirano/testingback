import { faker } from "@faker-js/faker";



export const generarProductos = async (req,res)=> {
    const products = [];
    for (let i = 0; i < 100; i++) {
        products.push(generarProducto())
    }
    res.send({status: "success", payload: products})
}

const generarProducto = () => {
    return {
        id: faker.database.mongodbObjectId(),
        code: faker.string.alphanumeric(10),
        title: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        stock: parseInt(faker.string.numeric(2)),
        status: faker.datatype.boolean(),
        category: faker.commerce.department()
    }
}

