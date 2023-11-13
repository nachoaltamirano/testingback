import winston from "winston";
import config from "../config/config.js";



const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'magenta',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'cyan',
        debug: 'white'
    }
}


const developmentLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        })
    ]
});


const productionLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './src/logs/errors.log.json',
            level: 'error',
            format: winston.format.json() 
        })
    ]
});


export const addLogger = (req, res, next) => {
    if(config.env == 'production'){
        req.logger = productionLogger;
    }else{
        req.logger = developmentLogger;
    }
    next();
};