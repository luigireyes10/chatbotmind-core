import * as Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import { ParamsLocation, ValidationError } from '../constants/types'
import { PayloadValidationError } from '../helpers/apiErrors'

export const validateSchema = (
  schema: Joi.object,
  location: ParamsLocation = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { value, error } = Joi.validate(req[location], schema)

    if (!error) {
      req[location] = value
      return next()
    }

    const { details } = error
    const message = details.map((e: ValidationError) => e.message).join(',')

    throw PayloadValidationError(message)
  }
}
