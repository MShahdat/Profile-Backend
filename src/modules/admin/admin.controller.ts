import { Request, Response } from "express";
import httpCode from 'http-status'
import { catchAsync } from "../../utility/catchAsync";
import { adminService } from "./admin.service";
import { badResponse, errorResponse, successResponse } from "../../utility/sendResponse";
import { authServices } from "../auth/auth.service";



//^ PROFILE GET
const getProfile = catchAsync(
  async (req: Request, res: Response) => {

    const id = req.user?.id as string
    console.log('loging id', id)

    const result = await adminService.getProfileFromDB(id);

    if (!result) {
      return errorResponse(res, "Internal server error")
    }
    return successResponse(res, httpCode.OK, 'user retrive successfully', result)
  }
)




//^ PASSWORD UPDATE
const updatePass = catchAsync(
  async (req: Request, res: Response) => {

    const id = req.user?.id as string
    const body = req.body

    const result = await adminService.updatePassIntoDB(id, body)

    if (result === 'not') {
      return badResponse(res, 'Entire the password')
    }

    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    return successResponse(res, httpCode.OK, 'Password updated successfully')
  }
)



//& LOGOUT
const logout = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.user?.id

    if (!id) {
      return errorResponse(res, 'Internal server error')
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken')

    return successResponse(res, httpCode.OK, 'logout successfully')
  }
)




export const adminController = {
  getProfile,
  updatePass,
  logout

}