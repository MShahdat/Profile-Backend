import { Router } from "express";
import { categoryController } from "./category.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";


const route = Router()

route.post('/', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), categoryController.createCategory)
route.get('/', categoryController.getCategory)
route.put('/:id', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), categoryController.updateCategory)


export const categoryRouter = route