import { Router } from "express";
import { projectController } from "./project.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";



const route = Router()
route.post('/', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), projectController.createProject)
route.get('/', projectController.getProject)
route.get('/:projectId', projectController.getProjectById)
route.put('/:projectId', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), projectController.updateProject)

export const projectRouter = route