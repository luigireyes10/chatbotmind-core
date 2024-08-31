import { NextFunction, Request, Response } from 'express'
import { sendResponse } from '../../helpers/response'
import { authUser, LoginResult } from '../../services/personal'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body
    const data = await authUser(username, password)

    sendResponse<LoginResult>(res, { data })
  } catch (e) {
    next(e)
  }
}
