import { verify, VerifyErrors } from 'jsonwebtoken'
import { AuthorizationError } from '../helpers/apiErrors'

import { NextFunction, Request, Response } from 'express'
import { SessionData } from '../constants/types'

export type RequestAuth = Request & {
  sessionInfo?: { username: string; businessId: string; listId?: number }
}

export const protectedRoutesValidator = (
  req: RequestAuth, // Request & {sessionInfo: { username: string; businessId: string}},
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization

  return verify(
    token,
    process.env.JWT_SECRET,
    (err: VerifyErrors, sessionInfo: SessionData) => {
      if (err) {
        next(AuthorizationError)
      }

      req.sessionInfo = sessionInfo

      next()
    }
  )
}
