import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { projectTechService } from "./projectTechnology.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'


//& create project technology
const createProjectTech = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body

    const result = await projectTechService.createProjectTech(body)
    return successResponse(res, httpCode.CREATED, 'project technology created', result)
  }
)



//& get project technology
const getProjectTech = catchAsync(
  async (req: Request, res: Response) => {

    const result = await projectTechService.getProjectTech()
    if (result.length === 0) {
      return notFoundResponse(res, 'not found')
    }
    return successResponse(res, httpCode.OK, 'project technology retrive successfully', result)
  }
)


export const projectTechController = {
  createProjectTech,
  getProjectTech,

}