import { Router } from 'express';
import fs from 'fs';
import ProductManager from '../../ProductManager.js';
import CManager from '../models/DAO/cartM.js';
import PManager from '../models/DAO/prodM.js';
import { Productsmodel } from '../models/prod.model.js';
import { socketServer } from '../../app.js';
import UserManager from '../models/DAO/userM.js';
import { createHash, isValidPassword } from '../../utils.js';
import passport from 'passport';
import { productRealTimePost, products, productRealTimeGet, productRealTimeDelete, registerPost, loginPost, profileGet, restorePost } from '../controllers/views.js';
import { isAdmin, isUser } from '../middlewares/auth.js';
const viewsRouter = Router()
const manager = new ProductManager()
const cart = new CManager();
const prod = new PManager();
const userM = new UserManager()


viewsRouter.get('/', (req, res) => {
    const data = fs.readFileSync('carritos.json');
    const cart = JSON.parse(data)
    res.render('home', {cart})
})

viewsRouter.get("/products",isUser, products)


viewsRouter.get("/realtimeproducts",isAdmin, productRealTimeGet)

viewsRouter.post('/realtimeproducts', productRealTimePost)

viewsRouter.delete('/realtimeproducts/:pid', productRealTimeDelete)

viewsRouter.get('/register',(req, res) => {
    res.render('register',{})
})

viewsRouter.post('/register', registerPost)

viewsRouter.get('/login', (req, res) => {
    res.render('login', {})
})

viewsRouter.post('/login', loginPost)

viewsRouter.get('/logout',(req, res) => {
    req.session.destroy(error => {
        res.render('login')
    })
})

viewsRouter.get('/profile', profileGet)

viewsRouter.get('/restore', (req, res )=> {
    res.render('restore-password',{})
})

viewsRouter.post('/restore', restorePost)


// PASSPORT 

viewsRouter.get('/registerr', (req, res) => {
    res.render('register',{})
})

viewsRouter.post('/registerr', passport.authenticate('register',{failureRedirect:'/failregister'}), async (req, res) => {
    res.render('login',{})
})

viewsRouter.get('/failregister', async (req, res) => {
    res.render('register-error',{})
})

viewsRouter.get('/loginn', (req,res) => {
    res.render('login',{})
})

viewsRouter.post('/loginn', passport.authenticate('login', {failureRedirect: 'faillogin'}), async (req, res) => {
    if(!req.user) return res.render('login-error',{})
    req.session.user = req.user.email
    res.render('datos', {user: req.session.user})
})

viewsRouter.get('/faillogin', async (req, res) => {
    res.render('login-error',{})
})

viewsRouter.get('/github', passport.authenticate('github',{scope: ['user:email']}), async(req, res) => {})

viewsRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/realtimeproducts')
})
export default viewsRouter;