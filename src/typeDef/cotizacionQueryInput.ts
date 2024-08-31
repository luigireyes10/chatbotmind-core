import { Field, Float, InputType } from "type-graphql";

@InputType({ description: 'Parametros para consulta de coberturas' })
export class paramsCoberturas {

    @Field(() => String, { description: '', nullable: false })
    CLIENTE: string

    @Field(() => String, { description: '', nullable: false })
    CEDULA: string

    @Field(() => String, { description: 'Número de Teléfono', nullable: false })
    CONTACTO: string

    @Field(() => String, { description: '', nullable: false })
    CHASIS: string

    @Field(() => String, { description: '', nullable: false })
    COLOR: string

    @Field(() => Float, { description: '', nullable: false })
    PRECIO_RD: number

    @Field(() => Float, { description: '', nullable: false })
    PRECIO_US: number

    @Field(() => Number, { description: '', nullable: false })
    DIAS: number

    @Field(() => String, { description: '', nullable: false })
    DESC_VEHICULO: string

    @Field(() => String, { description: '', nullable: false })
    MOTOR: string

    @Field(() => String, { description: '', nullable: false })
    TRANSMISION: string

    @Field(() => String, { description: '', nullable: true })
    IMAGEN_VEH: string

    @Field(() => String, { description: 'Información de la garantía del vehiculo', nullable: false })
    GARANTIA?: string

    @Field(() => [String], { description: 'Caracteristicas del vehículo', nullable: true })
    CARACTERISTICAS?: [string]
}
