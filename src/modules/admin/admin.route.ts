import { Router } from "express";
import { adminController } from "./admin.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";



const route = Router()

route.get('/profile', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), adminController.getProfile)
route.patch('/change-password', authorization.auth(ROLE.ADMIN), adminController.updatePass)
route.post('/logout', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), adminController.logout)




export const adminRouter = route