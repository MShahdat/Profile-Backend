import { Router } from "express";
import { toolController } from "./tool.controller";
import { authorization } from "../../middleware/auth";


const route = Router()

route.post('/', authorization.auth(), toolController.createTool)
route.get('/', toolController.getTools)
route.put('/:toolId', authorization.auth(), toolController.updateTool)




export const toolRouter = route