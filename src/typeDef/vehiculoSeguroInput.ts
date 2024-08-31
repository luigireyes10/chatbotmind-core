import { Field, InputType } from "type-graphql";
import { ID_EMPRESA } from "../constants/general";

@InputType({description: 'Parámetros de consulta de seguros por vehículo.' })
export class vehiculoSeguroInput {

    @Field(() => String, { description: 'Código del Chasis del vehiculo.' })
    CHASIS: string

    @Field(() => String, { description: 'Código de Empresa.', defaultValue: ID_EMPRESA})
    ID_EMPRESA: string = ID_EMPRESA
}
