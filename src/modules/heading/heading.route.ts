import { Router } from "express";
import { headingController } from "./heading.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";




const route = Router()

route.post('/', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), headingController.createHeading)
route.get('/:id', headingController.getHeading)
route.put('/:id', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), headingController.updateHeading)



export const headingRouter = route