import { Router } from "express";
import { authorization } from "../../middleware/auth";
import { siteConfigController } from "./siteConfig.controller";
import { Cloudinary } from "../../lib/cloudinary";
import { ROLE } from "../../../generated/prisma/enums";




const router = Router()

router.post('/',
  Cloudinary.upload.fields([
    {
      name: "image",
      maxCount: 1
    },
    {
      name: "resume",
      maxCount: 1
    },
    {
      name: "cv",
      maxCount: 1
    }
  ]),
  authorization.auth(ROLE.SUPER_ADMIN),
  siteConfigController.createSiteConfig)


router.get('/',
  authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  siteConfigController.getSiteConfig)

router.get('/:siteConfigId',
  siteConfigController.getSiteConfig)

router.put('/:siteConfigId',
  Cloudinary.upload.fields([
    {
      name: "image",
      maxCount: 1
    },
    {
      name: "resume",
      maxCount: 1
    },
    {
      name: "cv",
      maxCount: 1
    }
  ]),
  authorization.auth(ROLE.ADMIN),
  siteConfigController.updateSiteConfig)

export const siteConfigRouter = router