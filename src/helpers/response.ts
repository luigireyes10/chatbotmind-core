import { Response } from 'express'
import { HTTP_STATUS_OK } from '../constants/httpResponseCodes'
import { ApiResponse } from '../constants/types'

export const sendResponse = <T>(
  res: Response,
  data: ApiResponse<T | T[]>
): void => {
  res.status(HTTP_STATUS_OK).send({ ...data })
}
