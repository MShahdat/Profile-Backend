import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { technologyService } from "./technology.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'

// create technology
const createTechnology = catchAsync(
  async(req: Request, res: Response) => {
    const body = req.body

    const result = await technologyService.createTechnologyIntoDB(body)
    return successResponse(res, httpCode.CREATED, 'technology ceated successfully', result)
  }
)



// create technology
const getTechnology = catchAsync(
  async(req: Request, res: Response) => {
    
    const result = await technologyService.getTechnologyFromDB()
    if(result.length === 0){
      return notFoundResponse(res, 'technology not found')
    }
    return successResponse(res, httpCode.CREATED, 'technology ceated successfully', result)
  }
)



// create technology
const updateTechnology = catchAsync(
  async(req: Request, res: Response) => {
    const body = req.body
    const id = Number(req.params.technologyId)

    const result = await technologyService.updateTechnologyIntoDB(id, body)
    if(!result){
      return notFoundResponse(res, 'technology not found')
    }
    return successResponse(res, httpCode.OK, 'technology updated successfully', result)
  }
)




export const technologyController = {
  createTechnology,
  getTechnology,
  updateTechnology,
  
}