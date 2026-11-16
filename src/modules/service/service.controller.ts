import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { serviceService } from "./service.service";
import { badResponse, notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'


//& create service
const createService = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body

    const result = await serviceService.createService(body)

    return successResponse(res, httpCode.CREATED, 'service created successfully', result)
  }
)


//& get all services
const getService = catchAsync(
  async (req: Request, res: Response) => {

    const result = await serviceService.getService()

    return successResponse(res, httpCode.OK, 'service retrive successfully', result)
  }
)


//& updated service
const updateService = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body
    const id = req.params.serviceId as string

    const result = await serviceService.updateService(id, body)

    return successResponse(res, httpCode.OK, 'service updated successfully', result)
  }
)



export const serviceController = {
  createService,
  getService,
  updateService

}