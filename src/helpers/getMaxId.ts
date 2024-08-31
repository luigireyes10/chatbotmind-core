import { createQueryBuilder } from "typeorm"

export async function getMaxId(DbTable: string, DbColumn: string) {
    try {
        const { max } = await createQueryBuilder(`${DbTable}`)
                .select(`MAX(${DbColumn})`, 'max')
                .getRawOne()

        return max + 1 ;
    } catch (error) {
        console.log("Error al consultar el id maximo de la tabla")
    }

}