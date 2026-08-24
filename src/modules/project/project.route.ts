import { Router } from "express";
import { projectController } from "./project.controller";
import { authorization } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";
import { Cloudinary } from "../../lib/cloudinary";



const route = Router()
route.post('/',
  Cloudinary.upload.fields([
    {
      name: 'cover',
      maxCount: 1
    },
    {
      name: "images",
      maxCount: 10
    }
  ]),
  authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), projectController.createProject)

route.get('/',
  projectController.getProject
)

route.get('/:projectId',
  projectController.getProjectById
)

route.put('/:projectId',
  Cloudinary.upload.fields([
    {
      name: 'cover',
      maxCount: 1
    },
    {
      name: "images",
      maxCount: 10
    }
  ]),
  authorization.auth(ROLE.ADMIN, ROLE.SUPER_ADMIN
  ), projectController.updateProject)

export const projectRouter = route