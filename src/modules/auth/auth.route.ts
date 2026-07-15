import { Router } from "express";
import { authController } from "./auth.controller";
import { validateData } from "../../middleware/validation";
import { adminRegisterSchema } from "./auth.validation";
import { authorization } from "../../middleware/auth";




const route = Router()


route.post('/register', validateData(adminRegisterSchema), authController.adminRegister)
route.post('/login', authController.login)
route.post('/access-token', authorization.auth(), authController.accessToken)


export const authRouter = route