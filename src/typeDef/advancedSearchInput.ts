import { InputType, Field } from "type-graphql"

@InputType({ description: '' })
export class Rango_Anio {

    @Field(() => String, { nullable: true })
    ANIO_INICIAL?: String

    @Field(() => String, { nullable: true })
    ANIO_FINAL?: String
}

@InputType({ description: '' })
export class Rango_Precio {

    @Field(() => String, { nullable: true })
    PRECIO_INICIAL?: String

    @Field(() => String, { nullable: true })
    PRECIO_FINAL?: String
}

@InputType({ description: '' })
export class Rango_Milla {

    @Field(() => String, { nullable: true })
    MILLA_INICIAL?: String

    @Field(() => String, { nullable: true })
    MILLA_FINAL?: String
}

@InputType({ description: '' })
export class AdvancedSearchInput {

    @Field(() => String, { nullable: true })
    ID_CONDICION?: string

    @Field({ nullable: true })
    RANGO_ANIO?: [Rango_Anio]

    @Field({ nullable: true })
    RANGO_PRECIO?: [Rango_Precio]

    @Field(() => String, { nullable: true })
    TIPO_VEHICULO?: string

    @Field(() => String, { nullable: true })
    TIPO_TRANSMICION?: string

    @Field(() => String, { nullable: true })
    COMBUSTIBLE?: string

    @Field(() => String, { nullable: true })
    COLOR_EXTERNO?: string

    @Field(() => String, { nullable: true })
    COLOR_INTERNO?: string

    @Field({ nullable: true })
    RANGO_MILLA?: [Rango_Milla]

    @Field(() => String, { nullable: true })
    CANTIDAD_CILINDRO?: string
}
