import { Request, Response } from "express"
import { catchAsync } from "../../utility/catchAsync"
import { headingService } from "./heading.service"
import httpCode from 'http-status'
import { notFoundResponse, successResponse } from "../../utility/sendResponse"


//& CREATE HEADING 
const createHeading = catchAsync(
  async(req: Request, res: Response) => {
    const body = req.body
    const result = await headingService.createHeadingIntoDB(body)
    
    return successResponse(res, httpCode.CREATED, 'Heading created successfully', result)
  }
)



//& GET HEADING 
const getHeading = catchAsync(
  async(req: Request, res: Response) => {
    const id = Number(req.params.headingId)
    const result = await headingService.getHeadingFromDB(id)
    
    if(!result){
      return notFoundResponse(res, 'Heading not found')
    }
    return successResponse(res, httpCode.OK, 'Heading retrive successfully', result)
  }
)




//& UPDATE HEADING 
const updateHeading = catchAsync(
  async(req: Request, res: Response) => {
    const id = Number(req.params.headingId)
    const body = req.body

    const result = await headingService.updateHeadingIntoDB(id, body)
    
    if(!result){
      return notFoundResponse(res, 'Heading not found')
    }
    return successResponse(res, httpCode.OK, 'Heading updated successfully', result)
  }
)




export const headingController = {
  createHeading,
  getHeading,
  updateHeading,
  
}