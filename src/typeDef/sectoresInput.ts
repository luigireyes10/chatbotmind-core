import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: 'Parámetros para consulta de sectores.' })
export class querySectoresInput {

    @Field({ description: 'Código de la Provincia.' })
    @Length(0, 5)
    ID_PROVINCIA: string

    @Field({ description: 'Código del Municipio.' })
    @Length(0, 5)
    ID_MUNICIPIO: string

    @Field({ nullable: true, description: 'Código del Sector.' })
    ID_SECTOR: number

    @Field({ nullable: true, defaultValue: 'A', description: 'Estado del Sector.' })
    @Length(1)
    ESTADO: string = "A"
}