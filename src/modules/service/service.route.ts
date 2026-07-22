import { Router } from "express";
import { serviceController } from "./service.controller";




const route = Router()

route.post('/', serviceController.createService)
route.get('/', serviceController.getService)
route.put('/:serviceId', serviceController.updateService)



export const serviceRouter = route