import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { categoryService } from "./category.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'

const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body

    const result = await categoryService.createCategoryIntoDB(body)
    return successResponse(res, httpCode.CREATED, 'category created successfully', result)
  }
)





//& get category
const getCategory = catchAsync(
  async (req: Request, res: Response) => {

    const result = await categoryService.getCategoryFromDB()


    return successResponse(res, httpCode.OK, 'categories retrive successfully', result)
  }
)



//& updated category
const updateCategory = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body
    const id = Number(req.params.id)

    const result = await categoryService.updateCategoryIntoDB(id, body)

    if (!result) {
      return notFoundResponse(res, 'No category available')
    }
    return successResponse(res, httpCode.OK, 'categories retrive successfully', result)
  }
)



export const categoryController = {
  createCategory,
  getCategory,
  updateCategory
}