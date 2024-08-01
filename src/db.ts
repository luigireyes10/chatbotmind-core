import { Connection, createConnection } from "typeorm"
import colors from "colors"

/**
 * @description Iniciar la conexion con la base de datos
 */
export async function startDBConnection(): Promise<void> {
    try {
        const connection: Connection = await createConnection()
        
        if (connection.isConnected) {
            console.log(
                colors.blue(`--> DB connection successfuly at(${connection.options.type}): ${process.env.TYPEORM_DB_HOST}`)
            )
        }
    } catch (e) {
        console.log(
            colors.red(`--> DB connection failed. Error: ${e}`)
        )
    }
}
