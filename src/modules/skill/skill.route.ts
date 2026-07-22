import { Router } from "express";
import { skillController } from "./skill.controller";
import { authorization } from "../../middleware/auth";


const route = Router()

route.post('/', authorization.auth(), skillController.createSkill)
route.get('/', skillController.getSkill)
route.put('/:skillId', authorization.auth(), skillController.updateSkill)




export const skillRouter = route