import { Router } from "express";
import { toolController } from "./tool.controller";


const route = Router()

route.post('/', toolController.createTool) 
route.get('/', toolController.getTools)
route.put('/:toolId', toolController.updateTool) 




export const toolRouter = route