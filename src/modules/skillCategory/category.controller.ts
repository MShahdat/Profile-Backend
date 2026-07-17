import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { categoryService } from "./category.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'


const createCategory = catchAsync(
  async(req: Request, res: Response) => {
    const body = req.body

    const result = await categoryService.createCategoryIntoDB(body)
    if(result){
      return successResponse(res, httpCode.CREATED, 'category created successfully', result)
    }
  }
)




const getCategory = catchAsync(
  async(req: Request, res: Response) => {

    const result = await categoryService.getCategoryFromDB()
    if(result.length === 0){
      return notFoundResponse(res, 'Skill category not found')
    }
    return successResponse(res, httpCode.CREATED, 'category created successfully', result)
  }
)




export const categoryController = {
  createCategory,
  getCategory,
  
}