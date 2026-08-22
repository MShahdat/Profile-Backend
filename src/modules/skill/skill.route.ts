import { Router } from "express";
import { skillController } from "./skill.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";


const route = Router()

route.post('/', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), skillController.createSkill)
route.get('/', skillController.getSkill)
route.put('/:skillId', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), skillController.updateSkill)




export const skillRouter = route