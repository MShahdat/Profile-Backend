import { Router } from "express";
import { authController } from "./auth.controller";
import { validateData } from "../../middleware/validation";
import { adminRegisterSchema } from "./auth.validation";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";


const route = Router()


route.post('/register', authorization.auth(ROLE.SUPER_ADMIN), validateData(adminRegisterSchema), authController.adminRegister)
route.post('/login', authController.login)
route.post('/access-token', authController.accessToken)


export const authRouter = route