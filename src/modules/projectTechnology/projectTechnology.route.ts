import { Router } from "express";
import { projectTechController } from "./projectTechnology.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";


const route = Router()

route.post('/', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), projectTechController.createProjectTech)
route.get('/', projectTechController.getProjectTech)
route.put('/:id', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), projectTechController.updateProjectTech)


export const projectTechRouter = route