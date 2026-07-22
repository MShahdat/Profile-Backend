import { Router } from "express";
import { serviceController } from "./service.controller";
import { authorization } from "../../middleware/auth";




const route = Router()

route.post('/', authorization.auth(), serviceController.createService)
route.get('/', serviceController.getService)
route.put('/:serviceId', authorization.auth(), serviceController.updateService)



export const serviceRouter = route