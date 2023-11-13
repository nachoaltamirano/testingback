import mongoose from "mongoose";
import PManager from "../src/models/DAO/prodM.js"
import Assert from "assert"
import config from "../src/config/config.js"

const assert = Assert.strict
mongoose.connect(config.mongodb)

describe('Testeando Product Manager', () => {
    before(async function(){
        this.productManager = new PManager()
    })

    it('Este es un metodo GET que trae todos los productos en formato de ARRAY', async function(){
        let result = await this.productManager.getP()
        assert.strictEqual(Array.isArray(result),true)
    })

    it("Este es un metodo POST que debe crear un producto", async function(){
        let mockProduct = {
            title: "Crear producto test",
            price: 123456,
            category: "TEST",
            stock: 20,
            code: 555,
            description: 'asdjdasjdas'
        }
        const result = await this.productManager.addP(mockProduct)
        assert.ok(result._id)
    })

    it("Este es un metodo DELETE que debe borrar un producto", async function(){
        let mockProductDelete = {
            title: "Borrar producto test",
            price: 123456,
            category: "TEST",
            stock: 20,
            code: 555,
            description: 'asdjdasjdas'
        }
        const productCreated = await this.productManager.addP(mockProductDelete);
        const productDeleted = await this.productManager.deleteP(productCreated._id);
        assert.ok(productCreated._id != productDeleted._id);
    })
})