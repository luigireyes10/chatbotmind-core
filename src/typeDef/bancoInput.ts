import { Length } from "class-validator"
import { Field, InputType, Int } from "type-graphql"

@InputType({description: 'Parámetros para consulta de bancos.'})
export class bancoInput {

    @Field(() => Int, { nullable: true , description: '' })
    @Length(0, 5)
    ID_BANCO?: number

    @Field(() => String, { nullable: true , description: '' })
    @Length(1)
    ESTADO?: string

    @Field(() => String, { nullable: true , description: '' })
    RNC_BANCO?: string
}
