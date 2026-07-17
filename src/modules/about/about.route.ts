import { Router } from "express";
import { aboutController } from "./about.controller";
import { authorization } from "../../middleware/auth";



const route = Router()

route.post('/', authorization.auth(), aboutController.createAbout)
route.get('/', aboutController.getAbout)



export const aboutRouter = route