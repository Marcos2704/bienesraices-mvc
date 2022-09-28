import { check, validationResult } from "express-validator"
import User from "../models/Users.js"


const loginForm = (req, res) =>{
        res.render("auth/login", {
          pagina: "Iniciar Sesion"
        } ) 
    }

const registerForm = (req, res) =>{
        res.render("auth/register", {
           pagina: "Crear cuenta"
        } )
    }

    const registerFormValidator = async (req, res) => {

        await check("name").notEmpty().withMessage("El nombre esta vacio").run(req)
        await check("email").isEmail().withMessage("Ingrese un email valido").run(req)
        await check("password").isLength({min: 6}).withMessage("El password debe tener al menos 6 caracteres").run(req)
        await check("password2").equals(req.body.password).withMessage("Los password no coinciden").run(req)

        let result = validationResult(req)

        if(!result.isEmpty()){
            return res.render("auth/register", {
                pagina: "Crear cuenta",
                errors: result.array(),
                user:{
                    name: req.body.name,
                    email: req.body.email
                }
             })
        }

        const { name, email, password } = req.body
 
        // Verificar que el usuario no este duplicado
        const existUser = await  User.findOne({ where : { email }})
        if(existUser) {
            return res.render('auth/register', {
                pagina: 'Crear Cuenta',
                errors: [{msg: 'El Usuario ya esta Registrado'}], 
                users: {
                    name: req.body.name,
                    email: req.body.email
                }
            })
        }

        await User.create({
            name,
            email,
            password,
            token: 123
        })
    }
   
    const olvideForm = (req, res) =>{
        res.render("auth/olvide-password", {
            pagina: "Recupera tu acceso"
        } )
    }   
     


export {
    loginForm,
    registerForm,
    olvideForm,
    registerFormValidator
}