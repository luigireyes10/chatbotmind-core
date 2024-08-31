import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { ID_EMPRESA } from "../constants/general";
@InputType({ description: '' })
export class crmProspectoQueryInput {

    @Field(() => String)
    CEDULARNC: string

    @Field({ nullable: true, defaultValue: '3', description: '' })
    ID_EMPRESA: string = '3'
}

@InputType({ description: '' })
export class crmProspectoInput {

    @Field(() => String, { defaultValue: ID_EMPRESA, description: '' })
    @Length(0, 3)
    ID_EMPRESA: string = ID_EMPRESA

    @Field()
    @Length(0, 20)
    CEDULARNC: string

    @Field()
    @Length(0, 150)
    NOMBRES: string

    @Field()
    @Length(0, 150)
    APELLIDOS: string

    @Field({ nullable: true })
    @Length(0, 10)
    TIPO_ORGANIZACION?: string

    @Field({ nullable: true })
    @Length(0, 1)
    TIPO_PROSPECTO?: string

    @Field({ nullable: true })
    @Length(0, 20)
    PASAPORTE?: string

    @Field({ nullable: true })
    @Length(0, 150)
    APODO?: string

    @Field({ nullable: true })
    ID_PROVINCIA?: string

    @Field({ nullable: true })
    @Length(0, 10)
    ID_MUNICIPIO?: string

    @Field({ nullable: true })
    @Length(0, 10)
    ID_SECTOR?: string

    @Field({ nullable: true })
    @Length(0, 10)
    ID_VIA?: string

    @Field()
    @Length(0, 150)
    EMAIL: string

    @Field({ nullable: true })
    @Length(0, 1)
    SEXO?: string

    @Field({ nullable: true })
    @Length(0, 1)
    ESTADO_CIVIL?: string

    @Field({ nullable: true })
    @Length(0, 10)
    PEPS?: string

    @Field({ nullable: true })
    @Length(0, 150)
    CARGO?: string

    @Field({ nullable: true })
    @Length(0, 50)
    VINCULADO_A?: string
}
