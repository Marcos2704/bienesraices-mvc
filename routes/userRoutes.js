import  express  from "express";
import { loginForm, registerForm, olvideForm, registerFormValidator} from "../controllers/userController.js";


const router = express.Router()

router.get("/login", loginForm)

router.get("/register", registerForm)
router.post("/register", registerFormValidator)

router.get("/olvide-password", olvideForm)


export default router
