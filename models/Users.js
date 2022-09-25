import { DataTypes } from "sequelize"
import db from "../config/db.js"

const User = db.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNUll: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNUll: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNUll: false,
    },
    token: DataTypes.STRING,
    confirm: Boolean

})

export default User