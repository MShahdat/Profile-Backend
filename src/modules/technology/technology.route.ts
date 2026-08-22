import { Router } from "express";
import { technologyController } from "./technology.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";


const route = Router()

route.post('/', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), technologyController.createTechnology)
route.get('/', technologyController.getTechnology)
route.put('/:technologyId', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), technologyController.updateTechnology)



export const technologyRouter = route