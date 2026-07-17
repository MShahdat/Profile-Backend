import { Router } from "express";
import { skillController } from "./skill.controller";


const route = Router() 

route.post('/', skillController.createSkill)
route.get('/', skillController.getSkill)
route.put('/:skillId', skillController.updateSkill)




export const skillRouter = route