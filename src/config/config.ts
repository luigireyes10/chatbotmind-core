//* =================================================
//* Entorno
//* =================================================

import path from "path"
require('dotenv').config()


process.env.NODE_ENV = process.env.NODE_ENV || 'DEV'
process.env.PAT_URL_IMG_GENERAL =  process.env.PAT_URL_IMG_GENERAL || 'http://vm-db.vegamovil.local:9999/vm/vimg/'

export const configurations = {
    PROD: { 
        ssl: true, 
        port: process.env.APP_PORT, 
        hostname: `${process.env.BACKEND_URL}`,
        playground: false,
        apollo_graph: true,
        introspection: true,
        db_prod: true
    },
    DEV: { 
        ssl: false, 
        port: process.env.APP_PORT, 
        hostname: 'localhost',
        playground: true,
        apollo_graph: false,
        introspection: true,
        db_prod: false
    }
}

if (process.env.NODE_ENV === 'DEV') {

    process.env.PATH_LOCAL_IMG = path.join('assets', 'cars')


    
    //? directorio de ofertas
    process.env.PATH_OFFERS = 'http://localhost:4000'

    process.env.PATH_ASSETS_LOCAL = 'http://192.168.1.148:4000/'
    process.env.PATH_ASSETS_SERVER = 'http://192.168.1.148:4000/'

    //? vista inventario
    process.env.VEHICLE_VIEW = 'VINVENTARIO_VEHICULO1'


    // ? carfax path
    process.env.CARFAX = path.join('https://ws.vegamovil.com:40051/', 'carfax')

}else {
    process.env.PATH_LOCAL_IMG ='C:/Foto/VM/'

    
    //? directorio de ofertas
    process.env.PATH_OFFERS = 'https://ws.vegamovil.com:4005'


    process.env.PATH_ASSETS_LOCAL = 'http://192.168.24.2:4000/'
    process.env.PATH_ASSETS_SERVER = 'https://ws.vegamovil.com:4005/'
    
    //? vista inventario
    process.env.VEHICLE_VIEW = 'V_INVENTARIO_VEH_WEB'

    // ? carfax path
    process.env.CARFAX = path.join('https://ws.vegamovil.com:4005/', 'carfax')
}
