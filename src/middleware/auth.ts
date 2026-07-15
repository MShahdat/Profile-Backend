import { NextFunction, Request, Response } from "express";
import { forbiddenResponse, unauthorizedResponse } from "../utility/sendResponse";
import config from "../config/env";
import { catchAsync } from "../utility/catchAsync";
import { jwtToken } from "../utility/jwt";



const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken
      :
      req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1]
        :
        req.headers.authorization

    if (!token) {
      return unauthorizedResponse(res, 'Unauthorized access!');
    }

    const decoded = jwtToken.jwtVerify(token, config.jwt_access_sectet)

    if (!decoded) {
      return unauthorizedResponse(res, "unauthorized access!")
    }
    console.log('decoded', decoded)

    const {id, name, email} = decoded;

    req.user = {
      id,
      name,
      email,
    }
    next();
  })
}


export const authorization = {
  auth,
}

