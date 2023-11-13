import mongoose from "mongoose";
import CManager from "../src/models/DAO/cartM.js"
import chai from "chai"
import {app} from "../app.js"
import config from "../src/config/config.js"
import supertest from "supertest-session";
import PManager from "../src/models/DAO/prodM.js";
import {faker} from "@faker-js/faker"

mongoose.connect(config.mongodb)
let expect = chai.expect
let requester = supertest(app)

describe('Testeando views', async () => {
    let cookie;
    let userMock = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: "123",
        age: 22,
    }
    before(async function(){
        this.cartManager = new CManager()
        this.productManager = new PManager()
    })

    it('Registro usuario', async function(){
        let user = await requester.post("/register").send(userMock)
        expect(user).to.be.ok
    })

    it('login Usuario', async function(){
        let result = await requester.post('/login').send({
            email: userMock.email,
            password: userMock.password
        })

        let cookieResult = result.headers['set-cookie'][0]
        
        cookie = {
            name: cookieResult.split('-')[0],
            value: cookieResult.split('=')[1].split(';')[0]
        }
        expect(cookie.name).to.be.ok
        expect(cookie.value).to.be.ok
    })

    // it('Ver profile', async function(){
    //     console.log(cookie)
    //     let user = requester.get('/profile').set('Cookie',[`${cookie.name}=${cookie.value}`])
    //     expect(user.email).to.be.eql(userMock.email)
    // })  
})