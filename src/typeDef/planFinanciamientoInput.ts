import { Length, Min } from "class-validator";
import { Field, Float, InputType, Int } from "type-graphql";

@InputType({ description: 'Parámetros para consulta de plan de financiamiento.' })
export class planFinanciamientoQueryInput {

    @Field(() => Int, { nullable: true, description: '' })
    ID_PLAN: number

    @Field(() => String, { nullable: true, description: '' })
    ESTADO?: string

    @Field(() => String, { nullable: true, description: '' })
    CHASIS?: string

    @Field(() => String, { nullable: true, description: '' })
    ID_ENTIDAD_FINANCIERA?: string
}


@InputType({ description: 'Nuevo Plan de Financiamiento.' })
export class planFinanciamientoInput {

    @Field(() => String, { nullable: true, description: 'Código de la Oferta' })
    @Length(0, 10)
    ID_OFERTA: string

    @Field(() => String, { description: 'Código de la Entidad Financiera.', nullable: true })
    @Length(0, 10)
    ID_ENTIDAD_FINANCIERA: string

    @Field(() => String, { description: 'Descripción | Nombre de la entidad financiera.', nullable: true })
    @Length(0, 100)
    ENTIDAD_FINANCIERA: string

    @Field(() => String, { description: 'Código del vehículo.', nullable: false })
    @Length(0, 50)
    ID_VEHICULO: string

    @Field(() => String, { description: 'Chasis del vehículo.', nullable: false })
    @Length(0, 50)
    CHASIS: string

    @Field(() => Float, { description: 'Precio del vehículo.', nullable: false })
    PRECIO_VEH: number

    @Field(() => String, { description: 'Valor en porciento del inicial a pagar.', nullable: true })
    @Length(0, 10)
    MONTO_INI_PORC: string

    @Field(() => Float, { description: 'Valor en moneda, del inicial del vehículo.', nullable: true })
    MONTO_INICIAL: number

    @Field(() => Float, { description: 'Monto a financiar.', nullable: true })
    MONTO_FINANCIAMIENTO: number

    @Field(() => String, { description: 'Moneda del financiamiento.', nullable: true })
    @Length(0, 20)
    MONEDA_MONTO_FINANCIAMIENTO: string

    @Field(() => Float, { description: 'Valor de la cuota final.', nullable: true })
    CUOTA_FINAL: number

    @Field(() => Int, { description: 'Plazo del financiamiento en meses.', nullable: true })
    PLAZO_MESES: number

    @Field(() => Int, { description: 'Plazo del financiamiento en años.', nullable: true })
    PLAZO_ANIOS: number

    @Field(() => Float, { description: 'Efectivo que se le agrega al monto del capital.', nullable: true })
    ABONO_CAPITAL: number

    @Field(() => String, { description: 'Porciento del abono a capital.', nullable: true })
    ABONO_CAPITAL_PORC: string

    @Field(() => Int, { description: '', nullable: true })
    MESES_ABONO_CAPITAL: number

    @Field(() => String, { description: '', nullable: true })
    FRECUENCIA_PLAZO: string

    @Field(() => String, { description: 'Indica que el vehiculo lleva seguro.', nullable: true, defaultValue: 'S' })
    @Length(1)
    SEGURO: string = 'S'

    @Field(() => String, { description: 'Aseguradora del vehículo, en dado caso que lleve seguro.', nullable: true })
    @Length(0, 50)
    ASEGURADORA: string

    @Field(() => String, { description: 'Forma de pago del seguro: Contado, Corto plazo, Largo Plazo', nullable: true })
    @Length(0, 50)
    TIPO_PAGO: string

    @Field(() => Float, { description: '', nullable: true })
    INTERES_MENSUAL: number

    @Field(() => Float, { description: '', nullable: true })
    INTERES_TOTAL: number

    @Field(() => Int, { description: 'Número de meses.', nullable: true })
    NO_MESES: number

    @Field(() => Int, { description: 'Número de cuotas.', nullable: true })
    NO_CUOTAS: number

    @Field(() => String, { description: 'Moneda del precio del vehículo.', nullable: true })
    MONEDA_PRECIO_VEH: string

    @Field(() => Float, { description: 'Tasa referencial para el financiamiento.', nullable: true })
    TASA: number

    @Field(() => String, { description: '', nullable: true })
    @Length(0, 10)
    TASA_DE_CAMBIO: string

    @Field(() => String, { description: 'Estado del Financiamiento.', nullable: true, defaultValue: "A" })
    @Length(1)
    ESTADO: string = "A"

    @Field(() => Float, { nullable: true, description: '' })
    ADICIONAL: number

    @Field(() => String, { nullable: true, description: '' })
    PLAZO_ADICIONAL_DIAS: string

    @Field(() => Float, { nullable: true, description: '' })
    VECES_PAGO_ABONO: number

    @Field(() => Float, { nullable: true, description: '' })
    FRECUENCIA_ABONO: number

    @Field(() => String, { nullable: true, description: '' })
    TIEMPO_PAGO_SEGURO: string

    @Field(() => String, { nullable: true, description: '' })
    GARANTIA: string

    @Field(() => String, { nullable: true, description: 'Nombre del plan a financiar.' })
    NOMBRE_PLAN: string

    @Field(() => Int, { nullable: true, description: 'Código del plan base.' })
    ID_PLAN_BASE: number

    @Field(() => String, { nullable: true, description: 'Porciento aprobado por el banco.' })
    PORC_APROB_BANCO: string

    @Field(() => Int, { nullable: true, description: 'Cantidad de efectivo aprobada por el banco' })
    CANT_APROB_BANCO: number

    @Field(() => String, { nullable: true, description: 'Nombre del archivo de la carta emitida por el banco.' })
    NOMBRE_DOCUMENTO?: string

    @Field(() => String, { nullable: true, description: 'Mes para el primer abono en el plan de financiamiento de FlexiCuota.' })
    MES_PRIMER_ABONO?: string

    @Field(() => String, { nullable: true, description: 'Mes para el segundo abono en el plan de financiamiento de FlexiCuota.' })
    MES_SEGUNDO_ABONO?: string
}
