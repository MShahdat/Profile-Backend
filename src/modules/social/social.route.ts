import { Router } from "express";
import { socialController } from "./social.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";



const route = Router()

route.post('/', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), socialController.createSocialLink)
route.get('/', socialController.getSocialLink)
route.put('/:socialId', authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), socialController.updateSocialLink)



export const socialRouter = route