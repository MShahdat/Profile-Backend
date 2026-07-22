import { Router } from "express";
import { educationController } from "./education.controller";
import { authorization } from "../../middleware/auth";



const route = Router()

route.post('/', authorization.auth(), educationController.createEducation)
route.get('/', educationController.getEducation)
route.put('/:educationId', authorization.auth(), educationController.updateEducation)


export const educationRouter = route