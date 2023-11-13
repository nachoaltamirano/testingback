import passport from "passport";
import local from 'passport-local';
import UserManager from "../models/DAO/userM.js";
import { createHash, isValidPassword } from "../../utils.js";
import GitHubStrategy from 'passport-github2';
import config from "./config.js";

const manager = new UserManager;

const localStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
            try {
                let user = req.body;
                let userFound = await manager.getByEmail(user.email);
                if(userFound){
                    return done(null,false)
                }
                user.password = createHash(user.password)
                let result = await manager.createUser(user)
                console.log(result)
                return done(null, result)
            } catch (error) {
                return done('Error: ' + error)
            }
        }
    ))

    passport.use('login', new localStrategy({ usernameField: 'email'}, async (username, password, done) => {
        let users = await manager.getAll()
        let userFound = users.find(u =>{
            return u.email == username && isValidPassword(u, password)
        })
        if(userFound){
            console.log(userFound)
            delete userFound.password
            return done(null, userFound)
        }else{
            return done(null, false)
        }
    }))

    passport.use('github',new GitHubStrategy({
        clientID: config.clientID,
        clientSecret:config.clientSecret,
        callbackURL:config.callbackURL,
        scope: ['user:email']
    },async(accessToken,refreshToken,profile,done) => {
        try {
            console.log(profile)
            let userEmail = profile.emails[0].value
            let user = await manager.getByEmail(userEmail)
            if(!user){
                let newUser = {
                    first_name:profile._json.login,
                    last_name:"",
                    email: userEmail,
                    password:"",
                    age: 18
                }
                let result = await manager.createUser(newUser)
                done(null, result)
            }else{
                done(null, user)
            }
        } catch (error) {
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await manager.getById(id)
        done(null, user)
    })
}
export default initializePassport;