import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: '' })
export class CotizacionWebInput {

    @Field({ description: 'Referencia vehiculo para cotizar.' })
    @Length(0, 10)
    REFERENCIA: string

    @Field()
    PRECIO_RD: number

    @Field()
    PRECIO_US: number

    @Field({description: 'Nombre y Apellidos del cliente o prospecto.'})
    @Length(0, 50)
    NOMBRE_CLIENTE: string

    @Field({description: 'Cédula del cliente o prospecto.'})
    @Length(0, 11)
    CEDULA_CLIENTE: string

    @Field({description: 'Teléfono del cliente o prospecto.'})
    @Length(0, 15)
    TELEFONO_CLIENTE: string

    @Field({description: 'Correo del cliente o prospecto.'})
    @IsEmail()
    @Length(5, 100)
    EMAIL_CLIENTE: string

    @Field()
    TASA_LOCAL_EXTRANJERA: number

    @Field()
    TASA_EXTRANJERA_LOCAL: number
}

@InputType({ description: '' })
export class CreateCotizacionDocumentInput {

    // @Field()
    // TIPO: string 

    @Field({description: 'Cédula de identidad del cliente o prospecto.'})
    NO_DOCUMENTO_FILE: string

    @Field({description: 'Archivo de Licencia de conducir del cliente o prospecto.'})
    LICENCIA_FILE: string

    @Field({description: 'Archivo de ingreso del cliente o prospecto.'})
    INGRESO_FILE: string

    @Field({ nullable: true, description: 'Código de la cotización.' })
    ID_COTIZACION?: number
}

@InputType({ description: '' })
export class CotizacionWebQueryInput {

    @Field({ nullable: true, description: 'Cédula del CLiente o prospecto.' })
    CEDULA_CLIENTE?: string

    @Field({ nullable: true, description: 'Código de Referencia del vehículo.'})
    REFERENCIA?: string
}
