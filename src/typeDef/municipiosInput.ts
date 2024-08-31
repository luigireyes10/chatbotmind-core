import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: 'Parámetros para consulta de municipios.' })
export class queryMunicipiosInput {

    @Field({ description: 'Código de la Provincia.' })
    @Length(0, 5)
    ID_PROVINCIA: string

    @Field({ nullable: true, description: 'Código del Municipio.' })
    @Length(0, 5)
    ID_MUNICIPIO: string

    @Field({ nullable: true, defaultValue: 'A', description: 'Estado del Municipio.' })
    @Length(1)
    ESTADO: string = "A"
}
