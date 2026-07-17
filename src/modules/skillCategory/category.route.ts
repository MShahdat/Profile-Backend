import { Router } from "express";
import { categoryController } from "./category.controller";



const route = Router()

route.post('/', categoryController.createCategory)
route.get('/', categoryController.getCategory)


export const categoryRouter = route