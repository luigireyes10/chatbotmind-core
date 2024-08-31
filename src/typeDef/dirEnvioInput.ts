import { Length } from 'class-validator';
import { ArgsType, Field, InputType, Int } from "type-graphql";

@InputType({ description: 'Parametros de consulta Direccion de envio.' })
export class GetDirEnvioArgs {

    @Field({ nullable: true, description: '' })
    ID_CLIENTE?: string

    @Field({ description: 'Cedula del cliente o prospecto.' })
    CEDULA_CLIENTE?: string

    @Field({ nullable: true, description: '', defaultValue: "A" })
    ESTADO?: string = "A"

    @Field({ nullable: true, description: '', defaultValue: '3' })
    ID_EMPRESA: string = "3"
}

@InputType({description: ''})
export class UpdateDirEnvioArg {

    @Field({ nullable: true})
    ID_DIR_ENVIO: number
    
    @Field(() => String, { nullable: true, description: '' })
    ID_CLIENTE: string

    @Field(() => String, { nullable: true, description: '' })
    @Length(0, 20)
    CEDULA_CLIENTE: string

    @Field(() => String, { nullable: true, description: 'Nombres y Apellidos del cliente o prospecto.' })
    @Length(0, 200)
    NOMBRES_CLIENTES: string

    @Field(() => String, { nullable: true, description: 'Apellidos del cliente o prospecto.' })
    @Length(0, 200)
    APELLIDOS_CLIENTE: string

    @Field(() => String, { nullable: true, description: '' })
    DIRECCION_PRINCIPAL: string

    @Field(() => String, { nullable: true, description: '', defaultValue: 'N' })
    DIR_PREDETERMINADA: string = "N"

    @Field(() => String, { nullable: true, description: '' })
    TELEFONO: string

    @Field(() => String, { nullable: true, description: '' })
    CELULAR: string

    @Field(() => String, { nullable: true, description: '', defaultValue: 'A' })
    ESTADO: string = "A"

    @Field(() => String, { nullable: true, description: '', deprecationReason: 'Se cambió por la dirección principal.'  })
    @Length(0, 500)
    DIRECCION_ALTERNA: string

    @Field(() => String, { nullable: true, description: '' })
    @Length(0, 300)
    PROXIMO_A: string

    @Field(() => String, { nullable: true, description: '' })
    @Length(0, 30)
    SECTOR: string

    @Field(() => String, { nullable: true, description: '' })
    @Length(0, 30)
    PROVINCIA: string

    @Field(() => String, { nullable: true, description: '' })
    MUNICIPIO?: string
}

@InputType({ description: 'Nueva direccion de envío data.' })
export class AddDirEnvionInput {

    @Field(() => String, { nullable: true, description: '' })
    ID_CLIENTE?: string 

    @Field(() => String, { nullable: true, description: '' })
    CEDULA_CLIENTE?: string

    @Field(() => String, { nullable: true, description: 'Nombres del cliente o prospecto.' })
    NOMBRES_CLIENTES?: string

    @Field(() => String, { nullable: true, description: 'Apellidos del cliente o prospecto.' })
    APELLIDOS_CLIENTE?: string

    @Field(() => String, { nullable: true, description: '' })
    DIRECCION_PRINCIPAL?: string

    @Field(() => String, { nullable: true, description: '', defaultValue: 'N' })
    @Length(1)
    DIR_PREDETERMINADA?: string

    @Field(() => String, { nullable: true, description: '' })
    TELEFONO?: string

    @Field(() => String, { nullable: true, description: '' })
    CELULAR?: string

    @Field(() => String, { nullable: true, description: '', defaultValue: 'A' })
    ESTADO?: string = "A"

    @Field(() => Int, { nullable: true, description: '' })
    SECUENCIA?: number

    @Field(() => String, { nullable: true, description: '', defaultValue: "3" })
    ID_EMPRESA?: string = "3"

    @Field(() => String, { nullable: true, description: '',  deprecationReason: 'Se cambió por la dirección principal.' })
    DIRECCION_ALTERNA?: string

    @Field(() => String, { nullable: true, description: '' })
    PROXIMO_A?: string

    @Field(() => String, { nullable: true, description: '' })
    SECTOR?: string

    @Field(() => String, { nullable: true, description: '' })
    PROVINCIA?: string

    @Field(() => String, { nullable: true, description: '' })
    MUNICIPIO?: string
}
