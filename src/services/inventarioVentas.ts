import { ApiResponse, QueryParams } from '../constants/types'
import { DbInsertError } from '../helpers/apiErrors'
import {
  searchCondition,
  searchConditionToQuery,
} from '../helpers/searchConditionToQuery'
import { paginatedQuery } from './query'

export type vehiclesInventaryResult = {
  VEHICULO: string
  REFERENCIA: string
  REFERENCIA_INF: string
  ANO: string
  MARCA: string
  ID_MARCA: string
  MODELO: string
  ID_MODELO: string
  ESTILO: string
  ID_ESTILO: string
  COLOR_EXTERIOR: string
  COLOR_INTERIOR: string
  PRECIO: string
  PRECIO_RD: string
  PRECIO_SALON_F: string
  PRECIO_WEB_F: string
  ID_MONEDA: string
  TASA: string
  ID_VEHICULO: string
  SECUENCIA_ENTRADA: string
  // ID_EMPRESA: string
  TRANSMISION: string
  TRACCION: string
  COMBUSTIBLE: string
  CILINDRAJE: string
  CILINDROS: string
  CHASIS: string
  ESTADO: string
  EXISTE: string
  CONDICION: string
  FECHA_DISPONIBLE: string
  // ID_PRODUCTO: string
  UBICACION: string
  DESTADO: string
  MILLAJE: string
  MONTO_TRASPASO: string
  NO_BOLSA_AIRE: string
  CONDICION_FISICA: string
  USO: string
  CAMBIO_CAJA: string
  TIEMPO_GARANTIA: string
  GOMAS_NUEVAS: string
  ULTIMA_FECHA_ENTRADA: string
  FILA_ASIENTO: string
  CANT_PUERTA: string
  PASAJEROS: string
  RUTA_DOCUMENTO: string
  CAMBIO_PRECIO: string
  FABRICACION: string
  DESC_CONDICION: string
  // ID_CLASIFICACION_INV: string
}

type conditions = {
  ID_EMPRESA: string
  conditionsArray: searchCondition
}

export const getVehiclesInventary = async (
  requestBody: conditions,
  queryParams: QueryParams
): Promise<ApiResponse<vehiclesInventaryResult[]>> => {
  try {
    const { ID_EMPRESA, conditionsArray } = requestBody

    const table = process.env.VEHICLE_VIEW

    const query = `SELECT VEHICULO,
                        -- REFERENCIA,
                        -- REFERENCIA_INF,
                        ANO,
                        MARCA,
                        ID_MARCA,
                        MODELO,
                        ID_MODELO,
                        ESTILO,
                        ID_ESTILO,
                        COLOR_EXTERIOR,
                        COLOR_INTERIOR,
                        PRECIO,
                        PRECIO_RD,
                        PRECIO_SALON_F,
                        PRECIO_WEB_F,
                        ID_MONEDA,
                        TASA,
                        ID_VEHICULO,
                        -- SECUENCIA_ENTRADA,
                        -- ID_EMPRESA,
                        TRANSMISION,
                        TRACCION,
                        COMBUSTIBLE,
                        CILINDRAJE,
                        CILINDROS,
                        CHASIS,
                        ESTADO,
                        EXISTE,
                        CONDICION,
                        FECHA_DISPONIBLE,
                        -- ID_PRODUCTO,
                        UBICACION,
                        DESTADO,
                        MILLAJE,
                        MONTO_TRASPASO,
                        NO_BOLSA_AIRE,
                        CONDICION_FISICA,
                        USO,
                        -- CAMBIO_CAJA,
                        TIEMPO_GARANTIA,
                        GOMAS_NUEVAS,
                        -- ULTIMA_FECHA_ENTRADA,
                        FILA_ASIENTO,
                        CANT_PUERTA,
                        PASAJEROS,
                        (SELECT RUTA_DOCUMENTO
                          FROM (  SELECT CASE SUBSTR (RUTA_DOCUMENTO, 0, 1)
                                            WHEN 'C'
                                            THEN
                                               REPLACE (
                                                  RUTA_DOCUMENTO,
                                                  'C:/Foto/VM/',
                                                  'https://ws.vegamovil.com:4005/images/')
                                            ELSE
                                               REPLACE (
                                                  RUTA_DOCUMENTO,
                                                  'K:\VM',
                                                  'https://ws.vegamovil.com:4005/images/')
                                         END
                                            AS RUTA_DOCUMENTO,
                                         id_vehiculo
                                    FROM VEHICULO_DOCUMENTO
                                   WHERE ESTADO = 'A'
                                ORDER BY orden, secuencia ASC) a
                         WHERE a.id_vehiculo = vh.id_vehiculo AND ROWNUM = 1)
                          RUTA_DOCUMENTO,
                        -- CAMBIO_PRECIO,
                        FABRICACION,
                        DESC_CONDICION -- ,
                        -- ID_CLASIFICACION_INV
                    FROM (SELECT * FROM ${table}
                      WHERE ID_EMPRESA = ${ID_EMPRESA})vh WHERE 1 = 1 
   ${searchConditionToQuery(
      conditionsArray
    )}`
    const [data, meta] = await paginatedQuery<vehiclesInventaryResult>(
      query,
      queryParams
    )
    return {
      data,
      meta,
    }
  } catch (e) {
    throw DbInsertError(e.message)
  }
}
