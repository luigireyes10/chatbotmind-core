import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType({ description: "Modelo Direccioón de Envio del vehículo." })
@Entity('DIR_ENVIO_VEH')
export class DirEnvioVeh extends BaseEntity {

    @Field({ nullable: true })
    @PrimaryGeneratedColumn({ type: 'number' })
    ID_DIR_ENVIO: number

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 20 })
    ID_CLIENTE: string

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 20 })
    CEDULA_CLIENTE: string

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 200 })
    NOMBRES_CLIENTES: string

    // ? NEW
    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 200 })
    APELLIDOS_CLIENTE: string

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 500 })
    DIRECCION_PRINCIPAL: string

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 1 })
    DIR_PREDETERMINADA: string

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 20 })
    TELEFONO: string

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 20 })
    CELULAR: string

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 1 })
    ESTADO?: string

    @Field({ nullable: true, description: '' })
    @Column({ type: 'number' })
    SECUENCIA?: number

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 5 })
    ID_EMPRESA?: string

    @Field({ nullable: true, description: '', deprecationReason: 'Se cambió por la dirección principal.' })
    @Column({ type: 'varchar2', length: 500 })
    DIRECCION_ALTERNA?: string

    @Column({ type: 'varchar2', length: 50 })
    USUARIO_INSERCION?: string

    @Column({ type: 'timestamp' })
    FECHA_INSERCION?: Date

    @Column({ type: 'varchar2', length: 50 })
    USUARIO_ACTUALIZACION?: string

    @Column({ type: 'timestamp' })
    FECHA_ACTUALIZACION?: Date

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 300 })
    PROXIMO_A?: string

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 30 })
    SECTOR?: string

    @Field({ nullable: true, description: '' })
    ID_SECTOR: string

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 30 })
    PROVINCIA?: string

    @Field({ nullable: true })
    ID_PROVINCIA?: string

    @Field({ nullable: true, description: '' })
    @Column({ type: 'varchar2', length: 30 })
    MUNICIPIO?: string

    @Field({ nullable: true })
    ID_MUNICIPIO?: string
}
