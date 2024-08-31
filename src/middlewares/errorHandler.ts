import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from '../constants/httpResponseCodes'
import { UNEXPECTED_ERROR } from '../constants/errorCodes'
import { ApiError } from '../helpers/apiErrors'

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const {
    message,
    status = HTTP_STATUS_INTERNAL_SERVER_ERROR,
    error = UNEXPECTED_ERROR,
  } = err

  res.status(status).json({ message, error })
}
