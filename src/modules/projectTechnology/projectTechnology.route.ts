import { Router } from "express";
import { projectTechController } from "./projectTechnology.controller";


const route = Router()

route.post('/', projectTechController.createProjectTech)
route.get('/', projectTechController.getProjectTech)



export const projectTechRouter = route