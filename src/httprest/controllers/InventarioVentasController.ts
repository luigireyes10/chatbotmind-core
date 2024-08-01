import { NextFunction, Request, Response } from 'express'
import { sendResponse } from '../../helpers/response'
import { getVehiclesInventary, vehiclesInventaryResult } from '../../services/inventarioVentas'

export const getInventarioVentas = async (
  request: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await getVehiclesInventary(request.body, request.query)
    return sendResponse<vehiclesInventaryResult>(res, result)
  } catch (e) {
    next(e)
  }
}
