import mongoose from "mongoose";
import CManager from "../src/models/DAO/cartM.js"
import chai from "chai"
import {app} from "../app.js"
import config from "../src/config/config.js"
import supertest from "supertest";
import PManager from "../src/models/DAO/prodM.js";

const expect = chai.expect;
const requester = supertest(app)
mongoose.connect(config.mongodb)

describe('Testeando Cart Manager', () => {
    let cartResult
    let productResult
    before(async function(){
        this.cartManager = new CManager()
        this.productManager = new PManager()
    })

    it('Endpoint POST /api/c/ debe crear un carrito', async function(){
        cartResult = await requester.post("/api/c").send()
        expect(cartResult._body.payload).to.have.property('_id')
    })

    it('Endpoint POST /api/p/ debe crear un producto', async function(){
        let mockProduct = {
            title: "Crear producto test",
            price: 123456,
            category: "TEST",
            stock: 20,
            code: 555,
            description: 'asdjdasjdas'
        }
        
        productResult = await requester.post('/api/p').send(mockProduct)
        expect(productResult.statusCode).to.equal(200)
    })

    it('Endpoint POST /api/c/:cid/products/:pid debe agregar un producto al carrito', async function(){
       let response = await requester.post(`/api/c/${cartResult._body.payload._id}/products/${productResult._body.payload._id}`).send()
        
        expect(response.statusCode).to.equal(200);
 
    })

    it('Endpoint GET /api/c/:cid debe obtener un carrito por su id', async function(){
        let result = await requester.get(`/api/c/${cartResult._body.payload._id}`).send()
        expect(result.statusCode).to.equal(200)
    })
})