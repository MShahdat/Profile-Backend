import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utility/catchAsync"
import { authServices } from "./auth.service"
import httpCode from 'http-status'
import { badResponse, notFoundResponse, successResponse, unauthorizedResponse } from "../../utility/sendResponse"



//& USER REGISTER
const adminRegister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body

  const admin = await authServices.adminRegisterIntoDB(body)
  successResponse(res, httpCode.CREATED, 'Admin created successfully', admin)
})



//& LOGIN USER
const login = catchAsync(async (req: Request, res: Response) => {
  const body = req.body

  const result = await authServices.loginFromDB(body)

  if (!result) {
    return notFoundResponse(res)
  }

  if (result === 'invalid') {
    badResponse(res, "Invalid email or password")
    return
  }


  res.cookie('refreshToken', result.refreshToken, {
    secure: false,    // set ture in production
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7   // 7 days
  })

   res.cookie('accessToken', result.accessToken, {
    secure: false,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 1
  })

  // console.log('cookies', req.cookies)

  successResponse(res, httpCode.OK, 'Loged in successfully', result)
})



//& GENERATE REFRESH TOKEN
const accessToken = catchAsync(async (req: Request, res: Response) => {
  console.log('cookies : ', req.cookies.refreshToken)
  const token = req.cookies.refreshToken;

  const result = await authServices.generateAccessToken(token)

  if(result === 'unauthorized'){
    return unauthorizedResponse(res)
  }
  
  res.cookie('accessToken', result, {
    secure: false,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 1
  })

  const rs = {
    accessToken: result
  }
  successResponse(res, httpCode.OK , 'Token refreshed successfully', rs)

})




export const authController = {
  adminRegister,
  login,
  accessToken
}