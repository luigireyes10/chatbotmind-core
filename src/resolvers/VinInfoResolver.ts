import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { VinInfo } from "../entity/VinInfo";
import { vinInput } from "../typeDef/vin";

const getVinInfoRepository = (): Repository<VinInfo> => getRepository(VinInfo)
@Resolver()
export class VinInfoResolver {

    @Query(() => [VinInfo])
    async getVinInfo(
        // condiciones de busquedas
    ) {
        try {
            console.log('Get Vin Info...')

            const result = await getVinInfoRepository().find()

            return result
        } catch (error) {
            console.log('Error en Query <GetVinInfo>', error)
        }
    }

    @Mutation(() => VinInfo)
    async createVin(
        @Arg("vinData", () => vinInput) vinData: vinInput
    ) {
        try {
            console.log('create data vin')

            // validar si existe en la bd
            const vinExist = await getVinInfoRepository().find(
                {
                    where: {
                        VIN_CODE: vinData.VIN_CODE
                    }
                }
            )

            if (vinExist.length > 0) {
                console.log('El vin ya existe...')
                return 1
            }

            const _vin = {
                ...vinData,
                USUARIO_INSERCION: 'TRANSACCIONAL',
                FECHA_INSERCION: new Date()
            }
            // insert data
            const newVin = await getVinInfoRepository().insert(_vin)

            // get inserted data
            const [insertedVin] = await getVinInfoRepository().find(
                newVin.identifiers[0]
            )

            return insertedVin
        } catch (error) {
            console.log('Error en Mutation <CreateVin> d', error)
        }
    }

    @Mutation(() => VinInfo)
    async updateVin(
        @Arg("vinData", () => vinInput) vinData: vinInput
    ) {
        try {
            console.log('update data vin')
            return ''
        } catch (error) {
            console.log(error)
        }
    }
}
