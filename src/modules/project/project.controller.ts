import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { projectService } from "./project.service";
import { badResponse, notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'



const createProject = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body

    const result = await projectService.createProjectInto(body)
    if (result === 'exist') {
      return badResponse(res, 'this project alrady exist. used different title')
    }
    return successResponse(res, httpCode.CREATED, 'project created successfully', result)
  }
)



const getProject = catchAsync(
  async (req: Request, res: Response) => {

    const result = await projectService.getProjectsFromDB()
    if (result.length === 0) {
      return notFoundResponse(res, 'project not available')
    }
    return successResponse(res, httpCode.OK, 'project retrive successfully', result)
  }
)



//& get project by id
const getProjectById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.projectId as string

    const result = await projectService.getProjectByIdFromDB(id)

    if (!result) {
      return notFoundResponse(res, 'project not found')
    }
    return successResponse(res, httpCode.OK, 'project retrive successfully', result)
  }
)


export const projectController = {
  createProject,
  getProject,
  getProjectById,

}