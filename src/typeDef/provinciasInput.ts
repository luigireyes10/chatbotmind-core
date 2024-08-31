import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: 'Parámetros para consulta de provincias.' })
export class queryProvinciasInput {

    @Field({ description: 'Código del pais.' })
    @Length(0, 10)
    ID_PAIS: string

    @Field({ nullable: true, description: 'Código de la provincia.' })
    @Length(0, 5)
    ID_PROVINCIA: string

    @Field({ nullable: true, defaultValue: 'A', description: 'Estado de la provincia.' })
    @Length(1)
    ESTADO: string = "A"
}