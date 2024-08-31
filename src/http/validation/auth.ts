import * as Joi from 'joi'
import { requiredString } from '../../helpers/validationTypes'

export const loginSchema = Joi.object().keys({
  username: requiredString,
  password: requiredString,
})
