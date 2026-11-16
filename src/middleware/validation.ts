import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utility/catchAsync"
import z from "zod"
import { AppError } from "../utility/appError"

export const validateData = (schema: z.ZodObject) => {
  return catchAsync((req: Request, res: Response, next: NextFunction) => {
    const payload = schema.safeParse(req.body)

    if (!payload.success) {
      console.log('error', payload.error.issues);
      throw new AppError(400, payload.error.issues[0]?.message ?? "Validation failed")
    }
    req.body = payload.data
    next()
  })
}