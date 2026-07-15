import { Router } from "express";
import { adminController } from "./admin.controller";
import { authorization } from "../../middleware/auth";



const route = Router()

route.get('/profile', authorization.auth(), adminController.getProfile)
route.patch('/change-password', authorization.auth(), adminController.updatePass)
route.post('/logout', authorization.auth(), adminController.logout)




export const adminRouter = route