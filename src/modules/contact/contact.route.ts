import { Router } from "express";
import { contactController } from "./contact.controller";
import { authorization } from "../../middleware/auth";




const route = Router()

route.post('/', contactController.createContact)
route.get('/', authorization.auth(), contactController.getContact)



export const contactRouter = route