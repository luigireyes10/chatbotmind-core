import { Router } from 'express'
import { getInventarioVentas } from '../controllers/InventarioVentasController'
import { PATH_INVENTARIOS } from './helpers/paths'

const inventarioVentasRouter: Router = Router()

inventarioVentasRouter.post(
  `${PATH_INVENTARIOS}/inventario_ventas`,
  getInventarioVentas
)

export default inventarioVentasRouter
