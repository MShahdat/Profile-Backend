import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { projectService } from "./project.service";
import { badResponse, notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'
import { AppError } from "../../utility/appError"


//& CREATE 
const createProject = catchAsync(
  async (req: Request, res: Response) => {

    const files = req.files as { [filedName: string]: Express.Multer.File[] } | undefined

    const cover = files?.['cover']?.[0];
    const images = files?.['images'] || [];

    if (!req.body.data || !cover) {
      throw new AppError(400, 'invalid form data')
    }
    let data = JSON.parse(req.body.data)

    const result = await projectService.createProjectInto(data, cover, images!)

    return successResponse(res, httpCode.CREATED, 'project created successfully', result)
  }
)


//& GET ALL
const getProject = catchAsync(
  async (req: Request, res: Response) => {

    const result = await projectService.getProjectsFromDB()

    return successResponse(res, httpCode.OK, 'project retrive successfully', result)
  }
)



//& get project by id
const getProjectById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.projectId as string

    const result = await projectService.getProjectByIdFromDB(id)

    return successResponse(res, httpCode.OK, 'project retrive successfully', result)
  }
)



//& update project by id
const updateProject = catchAsync(
  async (req: Request, res: Response) => {

    const id = req.params.projectId as string
    const files = req.files as { [filedName: string]: Express.Multer.File[] } | undefined

    const cover = files?.['cover']?.[0];
    const images = files?.['images'] || [];

    if (!req.body.data) {
      throw new AppError(400, 'invalid form data')
    }
    let data = JSON.parse(req.body.data)

    const result = await projectService.updateProjectInto(id, data, cover!, images!)

    return successResponse(res, httpCode.OK, 'project updated successfully', result)
  }
)




export const projectController = {
  createProject,
  getProject,
  getProjectById,
  updateProject,

}