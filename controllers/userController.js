import { check, validationResult } from "express-validator"
import User from "../models/Users.js"
import { genereteId } from "../helpers/tokens.js"
import { emailRegister } from "../helpers/emails.js"



const loginForm = (req, res) =>{
        res.render("auth/login", {
          page: "Iniciar Sesion"
        } ) 
    }

const registerForm = (req, res) =>{
        res.render("auth/register", {
           page: "Crear cuenta",
           csrfToken :req.csrfToken(),
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
                page: "Crear cuenta",
                csrfToken :req.csrfToken(),
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
                page: 'Crear Cuenta',
                csrfToken :req.csrfToken(),
                errors: [{msg: 'El Usuario ya esta Registrado'}], 
                users: {
                    name: req.body.name,
                    email: req.body.email
                }
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            token: genereteId()
        })

        emailRegister({
            name: user.name,
            email: user.email,
            token: user.token
        })



        res.render("templates/message", {
            page: "Cuenta creada correctamente",
            msg: "Hemos enviado un Email de confirmacion"
        })
    }

    const confirmUser = async (req, res) =>{
        const {token} = req.params
        const user = await User.findOne({where:{token}})

        if(!user){
            return res.render(`auth/confirm`, {
                page: "Error al confirmar cuenta",
                msg: "Hubo un error al confirmar tu cuenta, intenta de nuevo",
                error: true
            })
        }

        user.token = null
        user.confirm = true
        await user.save()

        res.render(`auth/confirm`, {
            page: "Cuenta confirmada",
            msg: "La cuenta se confirmo correctamente"
        })


       
    }
   
    const olvideForm = (req, res) =>{
        res.render("auth/olvide-password", {
            page: "Recupera tu acceso"
        } )
    }   
     


export {
    loginForm,
    registerForm,
    olvideForm,
    registerFormValidator,
    confirmUser
}