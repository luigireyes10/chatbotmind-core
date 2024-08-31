import { Field, InputType } from "type-graphql";


@InputType({
    description: 'Parametros de consulta para ofertas financiamiento.'
})
export class OfertasFinanciamientParams {

    @Field({ nullable: true, description: '' })
    ID_EMPRESA: string

    @Field({ nullable: true, description: '' })
    ID_OFERTA: string

    @Field({ nullable: true, description: '' })
    ID_BANCO: string

    @Field({ nullable: true, description: '' })
    ID_SUCURSAL: string

    @Field({ nullable: true, description: '' })
    ID_CENTRO_COSTO: string

    @Field({ nullable: true, description: '' })
    ID_TIPO_CONCEPTO: string

    @Field({ nullable: true, description: '' })
    FECHA_INICIAL: Date

    @Field({ nullable: true, description: '' })
    FECHA_FINAL: Date

    @Field({ nullable: true, description: '' })
    TIPO_OFERTA: string

    @Field({ nullable: true, description: '' })
    TASA: number

    @Field({ nullable: true, description: '' })
    TASA_MINIMA: number

    @Field({ nullable: true, description: '' })
    TASA_MAXIMA: number

    @Field({ nullable: true, description: '' })
    TIPO_INTERES: string

    @Field({ nullable: true, description: '' })
    TIPO_MORA: string

    @Field({ nullable: true, description: '' })
    FRECUENCIA: string

    @Field({ nullable: true, description: '' })
    PLAZO: number

    @Field({ nullable: true, description: '' })
    PLAZO_MINIMO: number

    @Field({ nullable: true, description: '' })
    PLAZO_MAXIMO: number

    @Field({ nullable: true, description: '' })
    PORC_FINANCIAR: number

    @Field({ nullable: true, description: '' })
    PORC_INICIAL: number

    @Field({ nullable: true, description: '' })
    PORC_EXTRA: number

    @Field({ nullable: true, description: '' })
    TIPO_CLIENTE: string
}