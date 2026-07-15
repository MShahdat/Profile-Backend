import { NextFunction, Request, Response } from "express"
import { badResponse } from "../utility/sendResponse"
import { z, ZodError } from 'zod'
import httpCode from 'http-status'

export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } 
    catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(httpCode.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(httpCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  }
}