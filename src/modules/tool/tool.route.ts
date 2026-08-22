import { Router } from "express";
import { toolController } from "./tool.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";


const route = Router()

route.post('/', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), toolController.createTool)
route.get('/', toolController.getTools)
route.put('/:toolId', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), toolController.updateTool)




export const toolRouter = route