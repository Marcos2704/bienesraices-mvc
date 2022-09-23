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

    const olvideForm = (req, res) =>{
        res.render("auth/olvide-password", {
            pagina: "Recupera tu acceso"
        } )
    }


export {
    loginForm,
    registerForm,
    olvideForm
}