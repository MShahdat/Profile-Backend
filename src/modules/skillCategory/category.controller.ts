import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { categoryService } from "./category.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'


//& create
const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body

    const result = await categoryService.createCategoryIntoDB(body)
    if (result) {
      return successResponse(res, httpCode.CREATED, 'category created successfully', result)
    }
  }
)



//& get
const getCategory = catchAsync(
  async (req: Request, res: Response) => {

    const result = await categoryService.getCategoryFromDB()
    if (result.length === 0) {
      return notFoundResponse(res, 'Skill category not found')
    }
    return successResponse(res, httpCode.CREATED, 'category created successfully', result)
  }
)



//& update
const updateCategory = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body
    const id = Number(req.params.id)

    const result = await categoryService.updateCategoryIntoDB(id, body)
    if (!result) {
      return notFoundResponse(res, 'category not found')
    }
    return successResponse(res, httpCode.OK, 'category updated successfully', result)
  }
)


export const categoryController = {
  createCategory,
  getCategory,
  updateCategory,
}