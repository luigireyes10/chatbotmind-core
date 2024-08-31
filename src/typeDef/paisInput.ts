import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: 'Parámetros para consulta de país.' })
export class queryPaisInput {

    @Field({ nullable: true, description: 'Código del Pais.' })
    @Length(0, 10)
    ID_PAIS: string

    @Field({ nullable: true, defaultValue: 'A', description: 'Estado del Pais.' })
    @Length(1)
    ESTADO: string = "A"
}