import { Router } from "express";
import { heroController } from "./hero.controller";
import { authorization } from "../../middleware/auth";



const route = Router()

route.post('/', authorization.auth(), heroController.createHero)
route.get('/', heroController.getHero)


export const heroRouter = route