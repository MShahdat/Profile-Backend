import { Router } from "express";
import { projectController } from "./project.controller";
import { authorization } from "../../middleware/auth";



const route = Router()
route.post('/', authorization.auth(), projectController.createProject)
route.get('/', projectController.getProject)
route.get('/:projectId', projectController.getProjectById)
route.put('/:projectId', authorization.auth(), projectController.updateProject)

export const projectRouter = route