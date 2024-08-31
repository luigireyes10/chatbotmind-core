import { IsEmail, Length } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { ID_EMPRESA } from "../constants/general";

@InputType({ description: 'Parámetros de consulta de financiamiento.' })
export class financiamientoQueryInput {

    @Field({ nullable: true, description: 'Código de financiamiento.' })
    ID_SOL_FINANCIAMIENTO: number
}

@InputType({ description: 'Actualizar Solicitud de Financiamiento' })
export class financiamientoUpdateInput {

    @Field()
    @Length(0, 5)
    TIPO_DOCUMENTO: string

    @Field()
    @Length(0, 20)
    CEDULA_CLIENTE: string

    @Field()
    @Length(0, 300)
    NOMBRE_CLIENTE: string

    @Field()
    @Length(0, 50)
    @IsEmail()
    EMAIL_CLIENTE: string

    @Field({ nullable: true })
    @Length(0, 25)
    TELEFONO_CLIENTE?: string

    @Field({ nullable: true })
    @Length(0, 20)
    PROVINCIA: string

    @Field({ nullable: true })
    @Length(0, 20)
    CIUDAD: string

    @Field({ nullable: true })
    @Length(0, 4000)
    COMENTARIOS: string
}

@InputType({ description: 'Imagenes a subir para financiamiento.' })
export class financiamientoUploadFile {

    @Field({description: 'Archivo de cedula del cliente.'})
    NO_DOCUMENTO_FILE: string

    @Field({description: 'Archivo Licencia de conducir cliente.'})
    LICENCIA_FILE: string

    @Field({description: 'Archivo de ingresos del cliente.'})
    INGRESO_FILE: string

    @Field(() => Int, { description: 'Código plan solicitud.'})
    ID_PLAN_FINANCIAMIENTO: number
}

@InputType({ description: 'Nueva Solicitud de Financiamiento.' })
export class financiamientoInput {

    @Field({ nullable: true, defaultValue: '3', description: 'Código de la empresa.' })
    ID_EMPRESA?: string = ID_EMPRESA

    @Field()
    ID_OFERTA: string

    @Field({ nullable: true })
    ID_SUCURSAL?: string

    @Field()
    ID_PLAN_FINANCIAMIENTO: number

    @Field()
    ID_VEHICULO: string

    @Field({ nullable: true })
    CHASIS?: string

    @Field({ nullable: true })
    PRECIO_VEH?: number

    @Field({ nullable: true })
    MONEDA_PRECIO_VEH?: string

    @Field({ nullable: true })
    ESTADO?: string

    @Field({ nullable: true })
    CEDULA_CLIENTE: string

    @Field({ nullable: true })
    NOMBRE_CLIENTE?: string

    @Field()
    EMAIL_CLIENTE: string
    
    @Field()
    TELEFONO_CLIENTE: string
    
    @Field()
    TIPO_DOCUMENTO: string

    @Field({ nullable: true })
    PROVINCIA: string

    @Field({ nullable: true })
    CIUDAD: string

    @Field({ nullable: true })
    COMENTARIOS: string
}

@InputType({ description: 'Parámetros de consulta de solicitud de financiamiento.' })
export class solFinanciamientoQueryInput {

    @Field({ nullable: true, description: 'Documento Identificativo del Cliente' })
    CEDULARNC: number
}
