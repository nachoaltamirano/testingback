import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    mongodb: process.env.MONGO_URL,
    sessionSecret: process.env.SESSION_SECRET,
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL,
    env:process.env.ENV
}
