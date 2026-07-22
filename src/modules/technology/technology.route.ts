import { Router } from "express";
import { technologyController } from "./technology.controller";


const route = Router()

route.post('/', technologyController.createTechnology)
route.get('/', technologyController.getTechnology)
route.put('/:technologyId', technologyController.updateTechnology)



export const technologyRouter = route