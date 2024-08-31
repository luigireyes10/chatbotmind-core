import { Field, Float, InputType, Int, ObjectType } from "type-graphql";
import { ID_EMPRESA, ID_MONEDA } from "../constants/general";

@InputType({description: 'Parámetros para obtener el monto de gastos de cierre.'})
export class queryGastosCierre {

    @Field(() => String, { description: 'Código de Empresa.', defaultValue: ID_EMPRESA })
    ID_EMPRESA: string = ID_EMPRESA

    @Field(() => String, { description: 'Código de Oferta.' })
    OFERTA: string

    @Field(() => String, { description: 'Código de Moneda.', defaultValue: ID_MONEDA })
    MONEDA: string = ID_MONEDA

    @Field(() => Float, { description: 'Tasa de la moneda.' })
    TASA_MONEDA: number

    @Field(() => Float, { description: 'Monto a financiar.' })
    MONTO_FINANCIAMIENTO: number

    @Field(() => Float, { description: 'Monto de carta de banco.' })
    MONTO_CARTA_BANCO: number = 0

    @Field(() => Float, { description: 'Monto a pagar en adicionales.' })
    MONTO_ADICIONALES: number = 0

    @Field(() => Float, { description: 'Monto en pagos extraordinarios.' })
    MONTO_PAGOS_ESTRAORDINARIOS: number = 0
}


@ObjectType({ description: '' })
export class GASTOS_CIERRE {

    @Field({ nullable: true })
    MONTO_GASTOS_CIERRE: string
}