import { Router } from "express";
import { projectController } from "./project.controller";



const route = Router()
route.post('/', projectController.createProject)
route.get('/', projectController.getProject)



export const projectRouter = route