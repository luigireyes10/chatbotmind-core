import { Field, Float, InputType, Int } from "type-graphql";
@InputType()
export class queryParamsTipoCliente {
    
    @Field(() => String, { nullable: true, description: '' })
    CEDULA_CLIENTE?: string

    @Field(() => Int, { nullable: true, description: '' })
    SECUENCIA?: number

}

@InputType({ description: '' })
export class AddTipoCliente {

    @Field(() => String, { nullable: true, description: '' })
    CEDULA_CLIENTE?: string

    @Field(() => Int, { nullable: true, description: '' })
    SECUENCIA?: number

    @Field(() => String, { nullable: true, description: '' })
    RANGO_INGRESOS?: string

    @Field(() => String, { nullable: true, description: '' })
    OTROS_RANGOS?: string

    @Field(() => String, { nullable: true, description: '' })
    TARJETA_CREDITO?: string

    @Field(() => String, { nullable: true, description: '' })
    FINANCIADO_ANTERIORMENTE?: string

    @Field(() => String, { nullable: true, description: '', defaultValue:'0' })
    RANGO_FINANCIAMIENTO?: string='0'

    @Field(() => String, { nullable: true, description: '' })
    FINANCIAMIENTO_ACTIVO?: string

    @Field(() => Float, { nullable: true, description: '' })
    INICIAL_VEH?: number

    @Field(() => Float, { nullable: true, description: '' })
    PRECIO_VEH?: number

    @Field(() => String, { nullable: true, description: '' })
    TIPO_CLIENTE?: string

    @Field(() => String, { nullable: true, description: '' })
    CLIENTE_VM?: string

    @Field(() => String, { nullable: true, description: '' })
    LISTA_NEGRA?: string

    @Field(() => String, { nullable: true, description: '' })
    BALANCE_X_PAGAR?: string
}
