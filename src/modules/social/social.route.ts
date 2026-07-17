import { Router } from "express";
import { socialController } from "./social.controller";
import { authorization } from "../../middleware/auth";



const route = Router()

route.post('/', authorization.auth(), socialController.createSocialLink)
route.get('/', socialController.getSocialLink)
route.put('/:socialId', authorization.auth(), socialController.updateSocialLink)



export const socialRouter = route