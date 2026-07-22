import { Router } from "express";
import { categoryController } from "./category.controller";
import { authorization } from "../../middleware/auth";


const route = Router()

route.post('/', authorization.auth(), categoryController.createCategory)
route.get('/', categoryController.getCategory)


export const categoryRouter = route