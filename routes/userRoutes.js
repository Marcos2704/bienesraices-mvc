import  express  from "express";
import { loginForm, registerForm, olvideForm} from "../controllers/userController.js";

const router = express.Router()

router.get("/login", loginForm)
router.get("/register", registerForm)
router.get("/olvide-password", olvideForm)


export default router
