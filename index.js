import express from "express"
import userRoutes from "./routes/userRoutes.js"

//crear la app
const app = express()

app.set("view engine", "pug")
app.set("views", "./views")


app.use(express.static("public"))

app.use("/auth", userRoutes)


const port = 3000

app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})