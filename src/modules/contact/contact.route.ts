import { Router } from "express";
import { contactController } from "./contact.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";




const route = Router()

route.post('/', contactController.createContact)
route.get('/', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), contactController.getContact)



export const contactRouter = route