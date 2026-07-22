import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { contactService } from "./contact.service";
import { notFoundResponse, successResponse } from "../../utility/sendResponse";
import httpCode from 'http-status'


const createContact = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body

    const result = await contactService.createContact(body)
    return successResponse(res, httpCode.CREATED, 'new contact created successfully', result)
  }
)



const getContact = catchAsync(
  async (req: Request, res: Response) => {

    const result = await contactService.getContact()

    if (result.length === 0) {
      return notFoundResponse(res, 'no contact found')
    }
    return successResponse(res, httpCode.OK, 'contacts retrived successfully', result)
  }
)



export const contactController = {
  createContact,
  getContact,

}