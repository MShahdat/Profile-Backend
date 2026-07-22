import { Router } from "express";
import { contactController } from "./contact.controller";




const route = Router()

route.post('/', contactController.createContact)
route.get('/', contactController.getContact)



export const contactRouter = route