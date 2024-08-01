import { Router } from 'express'
import { protectedRoutesValidator } from '../../middlewares/auth'
import { errorHandler } from '../../middlewares/errorHandler'
import inventarioVentasRouter from './inventarioVentas'
import personalRouter from './personal'

import whatsappRouter from './Whatsapp'

const protectedRoutes = [
    inventarioVentasRouter,
]

const unProtectedRoutes = [personalRouter, whatsappRouter]
const protectedRouter = Router()
const unProtectedRouter = Router()
const mainRouter = Router()

// protectedRouter.use(protectedRoutesValidator)

protectedRoutes.forEach((router: Router) => {
    protectedRouter.use(router)
})

unProtectedRoutes.forEach((router: Router) => {
    unProtectedRouter.use(router)
})

mainRouter.use([unProtectedRouter, protectedRouter, errorHandler])

export default mainRouter
