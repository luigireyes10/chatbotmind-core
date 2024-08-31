import * as Joi from 'joi'

export const requiredString = Joi.string().required()
export const joiString = Joi.string()
export const joiNumber = Joi.number()
export const positiveInteger = Joi.number().integer().positive()
export const requiredDate = Joi.date().required()
export const joiDate = Joi.date()
export const requiredPositiveInteger = Joi.number()
  .required()
  .integer()
  .positive()
export const requirednumber = Joi.number().required()
