import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { skillService } from "./skill.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'


//& create skill
const createSkill = catchAsync(
  async(req: Request, res: Response) => {
    const body = req.body

    const result = await skillService.createSkill(body)

    if(!result){
      return notFoundResponse(res, 'skill category not found')
    }
    return successResponse(res, httpCode.CREATED, 'skill created successfully', result)
  }
)



//& get skill
const getSkill = catchAsync(
  async(req: Request, res: Response) => {

    const result = await skillService.getSkill()

    if(result.length === 0){
      return notFoundResponse(res, 'skill not found')
    }
    return successResponse(res, httpCode.CREATED, 'skill retrive successfully', result)
  }
)


//& update skill
const updateSkill = catchAsync(
  async(req: Request, res: Response) => {

    const id = Number(req.params.skillId)
    const body = req.body

    const result = await skillService.updateSkill(id, body)

    if(!result){
      return notFoundResponse(res, 'skill not found')
    }
    return successResponse(res, httpCode.CREATED, 'skill updated successfully', result)
  }
)


export const skillController = {
  createSkill,
  getSkill,
  updateSkill,
  
}