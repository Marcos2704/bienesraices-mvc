import  Sequelize  from "sequelize";
import dotenv from "dotenv"

dotenv.config({path: ".env"})

const db = new Sequelize(process.env.DB_NOMBRE,  process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    define:{
        timetamps: true
    },
    pool:{
        max: 5,
        min: 0,
        axquire: 30000,
        idle: 10000
    },
    operetorAliases: false
});

export default db