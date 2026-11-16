import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { educationService } from "./education.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'


//* create education
const createEducation = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body

    const result = await educationService.createEducation(body)
    return successResponse(res, httpCode.CREATED, 'education created successfully', result)
  }
)



//* get education
const getEducation = catchAsync(
  async (req: Request, res: Response) => {

    const result = await educationService.getEducation()

    return successResponse(res, httpCode.OK, 'education retrived successfully', result)
  }
)



//* updated education
const updateEducation = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body
    const id = Number(req.params.educationId)

    const result = await educationService.updateEducation(id, body)

    return successResponse(res, httpCode.OK, 'education updated successfully', result)
  }
)




export const educationController = {
  createEducation,
  getEducation,
  updateEducation,

}