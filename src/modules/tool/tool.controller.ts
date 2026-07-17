import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { toolService } from "./tool.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'


//& tool create
const createTool = catchAsync(
  async(req: Request, res: Response) => {

    const body = req.body
    const result =  await toolService.createTool(body)

    if(result){
      return successResponse(res, httpCode.CREATED, 'tool created successfully', result)
    }
  }
)


//& get tools
const getTools = catchAsync(
  async(req: Request, res: Response) => {
    
    const result = await toolService.getTools()
    if(result.length === 0 ){
      return notFoundResponse(res, 'tools not found')
    }
    return successResponse(res, httpCode.OK, 'tools retrive successfully', result)
  }
)

//& tool update
const updateTool = catchAsync(
  async(req: Request, res: Response) => {

    const body = req.body
    const id = Number(req.params.toolId)

    const result =  await toolService.updateTool(id, body)

    if(!result){
      return notFoundResponse(res, "tool not found")
    }
    return successResponse(res, httpCode.OK, 'tool updated successfully', result)
  }
)


export const toolController = {
  createTool,
  getTools,
  updateTool,

}