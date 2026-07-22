import { Router } from "express";
import { technologyController } from "./technology.controller";
import { authorization } from "../../middleware/auth";


const route = Router()

route.post('/', authorization.auth(), technologyController.createTechnology)
route.get('/', technologyController.getTechnology)
route.put('/:technologyId', authorization.auth(), technologyController.updateTechnology)



export const technologyRouter = route