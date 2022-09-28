import { DataTypes} from "sequelize"
import db from "../config/db.js"
import bcrypt from "bcrypt"

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
    confirm: DataTypes.BOOLEAN
},
    {
        hooks: {
            beforeCreate: async function (user){
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
            }
        }
    }
)

export default User