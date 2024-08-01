import { Router } from 'express'
import { validateSchema } from '../../middlewares/validation'
import { login } from '../controllers/AuthController'
import { loginSchema } from '../validation/auth'
import { PATH_LOGIN } from './helpers/paths'

const personalRouter = Router()
export const userRouter = Router()

personalRouter.post(PATH_LOGIN, validateSchema(loginSchema), login)

export default personalRouter
