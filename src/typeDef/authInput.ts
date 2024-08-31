import { IsEmail, Length } from "class-validator";
import { Field, InputType, Int, registerEnumType } from "type-graphql";
import { Usuario } from "../entity/Usuario";

/**
 * @description Tipo de usuarios para crear la cuenta
 */
export enum TIPO_USUARIO {
    PER = 'PER',
    EMP = 'EMP'
}

registerEnumType(TIPO_USUARIO, {
    name: "TIPO_USUARIO",
    description: "Tipo de usuario",
});

@InputType({ description: '' })
export class AuthenticationInput {

    @Field({ description: 'Correo del cliente.' })
    @IsEmail()
    CORREO: string

    @Field({ description: 'Contraseña del cliente.' })
    CONTRASENIA: string
}

@InputType({ description: 'Parametros para inicio de sesion' })
export class LoginInput {

    @Field()
    username: string

    @Field()
    password: string
}

@InputType({ description: 'Input Registro de cliente o empresa.' })
export class RegisterInput {

    @Field({ nullable: true, description: 'Cedula para registro de cliente.' })
    @Length(10, 25)
    CEDULA?: string

    @Field({ nullable: true })
    @Length(1, 255)
    NOMBRES?: string

    @Field({ nullable: true })
    @Length(1, 255)
    APELLIDOS?: string

    @Field()
    @IsEmail()
    CORREO: string

    @Field()
    CONTRASENIA: string

    @Field({ nullable: true })
    TELEFONO?: string

    @Field(() => TIPO_USUARIO, { description: 'Tipo usuario', nullable: true })
    TIPO_USUARIO: TIPO_USUARIO

    @Field(() => String, { description: 'Nombre de la empresa', nullable: true })
    NOMBRE_EMPRESA: string

    @Field(() => String, { description: '', nullable: true })
    RNC_EMPRESA: string
}

@InputType({ description: 'Parámetros para actualizar perfil de usuario' })
export class UpdateProfileInput {

    @Field({ description: 'Nombres del Usuario o representante', nullable: true })
    @Length(1, 255)
    NOMBRES?: string

    @Field({ description: 'Apellidos del Usuario  o representante', nullable: true })
    @Length(1, 255)
    APELLIDOS?: string

    @Field(() => String, { description: 'Correo del Usuario o representante', nullable: true })
    @IsEmail()
    CORREO: string

    @Field({ description: 'Telefono del Usuario o representante', nullable: true })
    TELEFONO?: string

    @Field(() => String, { description: 'Genero del Usuario o representante', nullable: true })
    GENERO?: string

    @Field(() => String, { description: 'Direccion del Usuario o representante', nullable: true })
    DIRECCION?: string

    @Field(() => String, { description: 'Imagen del perfil', nullable: true })
    IMAGEN?: string
}

@InputType({ description: '' })
export class LoginResultInput {

    @Field({ nullable: true })
    usuario?: Usuario

    @Field({ nullable: true })
    token?: string
}

@InputType({ description: 'Parámetros para cambio de contraseña.' })
export class PasswordInput {

    @Field()
    NUEVA_CONTRASENIA: string

    @Field()
    VIEJA_CONTRASENIA: string
}

@InputType({ description: 'Parametros para resetear contraseña' })
export class ResetPassInput {

    @Field(() => String, { description: 'Nueva Contraseña.' })
    Password: string

    @Field(() => String, { description: 'Confirmación de Contraseña.' })
    ConfirmPassword: string

    @Field(() => String, { description: 'Token de validación.' })
    ResetToken: string
}
