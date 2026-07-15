import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { heroService } from "./hero.service";
import { successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'


const createHero = catchAsync(
  async(req: Request, res: Response) => {
    const body = req.body

    const result = await heroService.createHeroIntoDB(body)

    return successResponse(res, httpCode.CREATED, 'hero created successfully', result)
  }
)



export const heroController = {
  createHero,

}