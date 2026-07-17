import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { socialService } from "./social.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'


//& CREATE
const createSocialLink = catchAsync(
  async(req: Request, res: Response) => {
    const body = req.body

    const result = await socialService.createSocialLink(body)

    return successResponse(res, httpCode.CREATED, 'social link created successfully', result)
  }
)



//& get
const getSocialLink = catchAsync(
  async(req: Request, res: Response) => {

    const result = await socialService.getSocialLink()

    if(result.length === 0){
      return notFoundResponse(res, 'Link not found')
    }
    return successResponse(res, httpCode.CREATED, 'social link created successfully', result)
  }
)



//& UPDATE
const updateSocialLink = catchAsync(
  async(req: Request, res: Response) => {
    const body = req.body
    const id = Number(req.params.socialId)

    const result = await socialService.updateSocialLink(id, body)

    if(!result){
      return notFoundResponse(res, 'link not found')
    }

    return successResponse(res, httpCode.CREATED, 'social link created successfully', result)
  }
)

export const socialController = {
  createSocialLink,
  updateSocialLink,
  getSocialLink,
  
}