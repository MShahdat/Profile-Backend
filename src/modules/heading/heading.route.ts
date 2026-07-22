import { Router } from "express";
import { headingController } from "./heading.controller";
import { authorization } from "../../middleware/auth";




const route = Router()

route.post('/', authorization.auth(), headingController.createHeading)
route.get('/:headingId', headingController.getHeading)
route.put('/:headingId', authorization.auth(), headingController.updateHeading)



export const headingRouter = route