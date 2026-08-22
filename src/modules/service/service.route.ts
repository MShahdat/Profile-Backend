import { Router } from "express";
import { serviceController } from "./service.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";




const route = Router()

route.post('/', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), serviceController.createService)
route.get('/', serviceController.getService)
route.put('/:serviceId', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), serviceController.updateService)



export const serviceRouter = route