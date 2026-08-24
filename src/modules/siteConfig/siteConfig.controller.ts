import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { siteConfigService } from "./siteConfig.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpStatus from 'http-status'

//& CREATE
const createSiteConfig = catchAsync(
  async (req: Request, res: Response) => {

    const files = req.files as { [filedName: string]: Express.Multer.File[] } | undefined

    const image = files?.['image']?.[0];
    const resume = files?.['resume']?.[0];
    const cv = files?.['cv']?.[0]

    if (!req.body.data || !image || !resume || !cv) {
      throw new Error('invalid form data')
    }
    let data = JSON.parse(req.body.data)

    const result = await siteConfigService.createSiteConfig(data, image!, resume!, cv!)

    return successResponse(res, httpStatus.CREATED, 'site config created successfully', result)

  }
)



//& GET 
const getSiteConfig = catchAsync(
  async (req: Request, res: Response) => {
    const result = await siteConfigService.getSiteConfig()

    if (result.length === 0) {
      return notFoundResponse(res)
    }
    return successResponse(res, httpStatus.OK, 'site config retrive successfully', result)
  }
)


//& GET BY ID
const getSiteConfigById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.siteConfigId as string
    const result = await siteConfigService.getSiteConfigById(id)

    if (!result) {
      return notFoundResponse(res)
    }
    return successResponse(res, httpStatus.OK, 'site config retrive successfully', result)
  }
)


//& UPDATE
const updateSiteConfig = catchAsync(
  async (req: Request, res: Response) => {

    const id = req.params.siteConfigId as string

    const files = req.files as { [filedName: string]: Express.Multer.File[] } | undefined

    const image = files?.['image']?.[0];
    const resume = files?.['resume']?.[0];
    const cv = files?.['cv']?.[0]

    if (!req.body?.data) {
      throw new Error('invalid form data')
    }
    let data = JSON.parse(req.body.data)
    const payload = {
      data,
      image,
      resume,
      cv
    }

    const result = await siteConfigService.updateSiteConfig(payload, id)

    return successResponse(res, httpStatus.CREATED, 'site config updated successfully', result)

  }
)




export const siteConfigController = {
  createSiteConfig,
  getSiteConfig,
  updateSiteConfig,
  getSiteConfigById
}