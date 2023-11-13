export const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title: "Swagger titulo",
            version:"1.0.1",
            description:"Esta es la descripcion de swagger"
        }
    },
    apis:["src/docs/**/*.yaml"]
}