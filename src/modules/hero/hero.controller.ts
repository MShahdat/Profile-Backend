import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { heroService } from "./hero.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'


const createHero = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body

    const result = await heroService.createHeroIntoDB(body)

    return successResponse(res, httpCode.CREATED, 'hero created successfully', result)
  }
)



//& get hero
const getHero = catchAsync(
  async (req: Request, res: Response) => {

    const result = await heroService.getHeroFromDB()

    if (!result) {
      return notFoundResponse(res, `hero doesn't create yet`)
    }

    return successResponse(res, httpCode.OK, 'hero retrive successfully', result)
  }
)
export const heroController = {
  createHero,
  getHero,


}