import { Stream } from 'stream';
import { VehiculoInventario } from './../entity/VehiculoInventario';
export type ApiResponse<T> = {
    error?: boolean
    message?: string
    data?: T
    meta?: ResponseMetadata
}

export type Nullable<T> = T | null

export type ResponseMetadata = {
    pagination: {
        currentPage: number
        totalPages: number
        totalRows: number
        count: number
        pageSize: number
        links?: PaginationLinks
    }
}

export type PaginationLinks = {
    nextPage: Nullable<string>
    previousPage: Nullable<string>
}

export type SessionData = {
    username: string
    name: string
    idUsuario: number
    businessId: string
    phone: string
}

export type ValidationError = {
    message?: string
    path?: string[]
    type?: string
}

export type QueryParams = {
    page?: number
    size?: number
}

export type ParamsLocation = 'body' | 'query' | 'params'

export type ConditionType = {
    ID_EMPRESA?: string
    ID_TIPO_TRANS?: string
    ID_DOCUMENTO?: string
    ID_RANGO?: string
    ID_TIPO_CAPTACION?: string
    ID_PERSONA?: string
    ID_LISTA?: number
    ID_TIPO_VEHICULO?: string
    CEDULARNC?: string
    ID_PAIS?: string
    ID_PROVINCIA?: string
    ID_CAPTACION?: number
    ID_SOL_TASACION?: number
    FILTER?: string
    ESTADO?: string
    TIPO_TELEFONO?: string
    CHASIS?: string
    COD_BARRA?: string
    SECUENCIA_ENTRADA?: number
    ID_EGRESO?: number
    ID_EMPLEADO?: string
    ID_EJECUCION?: number
    ID_TASACION?: number
    ID_TIPO_CONCEPTO?: string
    TIPO_COMISION?: string
    ID_PAGO?: string
    INDRECIBIR?: string
    ID_TIPO_TRANS_REF?: string
    ID_DOCUMENTO_REF?: string
    ID_CLIENTE?: string
    ID_RECEPCION?: string
    ID_TRANSACCION_ALM?: string
    ID_INGRESO?: string
    ID_SOLICITUD_ING?: string
    ID_CENTRO_COSTO?: string
    ID_PUESTO?: string
    ID_EMPLEADO_SUP?: string
    IDENTIFICACION?: string
    TIPO?: string
    ID_COLOR?: number
}

export type ParameterList = {
    [key: string]: string
}

export type ParametersArray = {
    desc: string
    value: ParameterListDet[]
}

export type ParameterListDet = {
    desc: string
    value: string | number
}


export type MenuItem = {
    NAME: string
    ID: string
    PARENT: string
    MODULE: string
    CHILDREN?: MenuItem[]
}

export type ListTreeItem = {
    TITLE: string
    KEY: string
    PARENT: string
    CHILDREN?: ListTreeItem[]
}

export type ListVehicle  = {
    vehicles: [VehiculoInventario],
    pagination: ResponseMetadata
}

// @ObjectType()
// export class pagination {
//     currentPage: number
//     totalPages: number
//     totalRows: number
//     count: number
//     pageSize: number
//     links?: PaginationLinks
// }

export interface Upload {
    filename: string
    mimetype: string
    encoding: string
    createReadStream: () => Stream;
}
