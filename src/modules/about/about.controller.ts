import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { aboutService } from "./about.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'

//& create about
const createAbout = catchAsync(
  async(req: Request, res: Response) => {
    const body = req.body

    const result = await aboutService.createAbout(body)

    if(!result){
      return notFoundResponse(res, 'about not found')
    }
    return successResponse(res, httpCode.CREATED, 'about created successfully', result)
  }
)



//& get about
const getAbout = catchAsync(
  async(req: Request, res: Response) => {

    const result = await aboutService.getAbout()

    if(!result){
      return notFoundResponse(res, 'about not found')
    }
    return successResponse(res, httpCode.OK, 'about retrive successfully', result)
  }
)




export const aboutController = {
  createAbout,
  getAbout
}