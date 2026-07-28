import { Router } from "express";
import { headingController } from "./heading.controller";
import { authorization } from "../../middleware/auth";




const route = Router()

route.post('/', authorization.auth(), headingController.createHeading)
route.get('/:id', headingController.getHeading)
route.put('/:id', authorization.auth(), headingController.updateHeading)



export const headingRouter = route