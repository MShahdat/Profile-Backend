import { NextFunction, Request, Response } from "express";
import { forbiddenResponse, unauthorizedResponse } from "../utility/sendResponse";
import config from "../config/env";
import { catchAsync } from "../utility/catchAsync";
import { jwtToken } from "../utility/jwt";
import { ROLE } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { AppError } from "../utility/appError";



const auth = (...roles: ROLE[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ?
      req.cookies.accessToken
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

    const { id, name, email, role } = decoded;

    if (roles.length && !roles.includes(role)) {
      throw new AppError(403, "Forbidden. You don't have permission to access this resource.");
    }

    const admin = await prisma.admin.findUnique({
      where: {
        id,
        email,
        name,
        role,
      },
    });

    if (!admin) {
      throw new AppError(401, "User not found. Please log in again.");
    }

    req.user = {
      id,
      name,
      email,
      role,
    }
    next();
  })
}


export const authorization = {
  auth,
}

