import { Router } from "express";
import { projectTechController } from "./projectTechnology.controller";
import { authorization } from "../../middleware/auth";


const route = Router()

route.post('/', authorization.auth(), projectTechController.createProjectTech)
route.get('/', projectTechController.getProjectTech)
route.put('/:id', authorization.auth(), projectTechController.updateProjectTech)


export const projectTechRouter = route