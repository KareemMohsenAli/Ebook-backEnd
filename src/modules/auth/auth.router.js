import { Router } from "express";
import* as authController from "./controller/auth.js"
import { validation } from "../../middleWare/validation.js";
import * as validatores from "./validation.js"
import { asyncHandeller } from "../../utils/errorHandeling.js";
const  router = Router()
router.post(`/signup`,validation(validatores.signup),asyncHandeller(authController.signUp))

router.post(`/login`,
// validation(validatores.signIn),
asyncHandeller(authController.signIn))
export default router