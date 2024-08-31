import { Field, InputType } from "type-graphql";
@InputType({ description: 'Parametros para consulta de coberturas Monumental' })
export class paramsCoberturasMonumental {
    @Field(() => String, { description: 'Tipo del vehículo', nullable: true })
    TIPO_VEHICULO: string

    @Field(() => String, { description: 'Año del vehículo', nullable: true })
    ANIO: string

    @Field(() => String, { description: 'Uso del vehículo', nullable: true })
    USO: string

    @Field(() => String, { description: 'Descripción de la marca del vehículo', nullable: true })
    MARCA: string

    @Field(() => String, { description: 'Descripción del modelo del vehículo', nullable: true })
    MODELO: string

    @Field(() => String, { description: 'Color del vehículo', nullable: true })
    COLOR?: string

    @Field(() => String, { description: 'Placa del vehículo', nullable: true })
    PLACA?: string

    @Field(() => String, { description: 'Precio  del vehículo', nullable: true })
    PRECIO: string

    @Field(() => String, { description: 'Chasis del vehículo', nullable: true })
    CHASIS: string

    @Field(() => String, { description: 'Nombres del cliente o prospecto solicitante', nullable: true })
    NOMBRES: string

    @Field(() => String, { description: 'Apellidos del cliente o prospecto', nullable: true })
    APELLIDOS: string

    @Field(() => String, { description: '', nullable: true })
    DIRECCION: string

    @Field(() => String, { description: '', nullable: true })
    FECHA: string

    @Field(() => String, { description: '', nullable: true })
    PLAZO: string
}

export class paramsPdfMonumental {
    TITULO?: string
    TIPO?: string
    OFICINA_EMISORA?: string
    OFICINA_SUSCRIPTORA?: string
    TIPO_VEHICULO?: string
    ANIO?: string
    USO?: string
    ID_MARCA?: string
    MARCA?: string
    ID_MODELO?: string
    MODELO?: string
    COLOR?: string
    PLACA?: string
    PRECIO?: string
    CHASIS?: string
    NOMBRES?: string
    APELLIDOS?: string
    DIRECCION?: string
    FECHA?: string
    PLAZO?: string
    CANAL?: string
    NUM_COTIZACION?: string
    IMPUESTO?: string
    PRIMA?: string
    PRIMA_FINAL?: string
    PAGO_INICIAL?: string
    CUOTAS_MENSUALES?: string
    DIAS_VALIDACION?: string
    COBERTURAS?: any
}
