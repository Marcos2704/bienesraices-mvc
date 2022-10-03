import nodemailer from "nodemailer"

const emailRegister = async (data) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const {email, name, token} = data 

      await transport.sendMail({
        from: "YourDestiny.com",
        to: email,
        subject: "Condirma tu cuenta en YourDestiny",
        text: "Condirma tu cuenta en YourDestiny",
        html: `
            <p>Hola ${name}, Verifica tu cuenta en YourDestiny.com </p>

            <p>Tu cuenta esta casi lista, solo debes confirmar en el siguiente en enlace
               <a href="${process.env.SERVER_URL}:${process.env.PORT ?? 3000}/auth/confirm/${token}">Confirmar Cuenta</a>
            </p> 

            <p>Si tu no creaste esta cuenta, ignora este mensaje </p>

        `
      })
}

export{
    emailRegister
}