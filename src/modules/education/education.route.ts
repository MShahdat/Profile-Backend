import { Router } from "express";
import { educationController } from "./education.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";



const route = Router()

route.post('/', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), educationController.createEducation)
route.get('/', educationController.getEducation)
route.put('/:educationId', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), educationController.updateEducation)


export const educationRouter = route