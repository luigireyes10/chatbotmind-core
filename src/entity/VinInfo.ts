import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
@ObjectType({ description: "Modelo para Inoformación" })
@Entity('VIN_INFO')
export class VinInfo extends BaseEntity {

    @Field({ nullable: true })
    @PrimaryColumn({ type: 'number' })
    ID_VIN: number

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 504 })
    MANUFACTURER: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 1000 })
    ADDRESS_LINE_1: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 1000 })
    ADDRESS_LINE_2: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    REGION: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    COUNTRY: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    NOTE: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    ENTERED_VIN: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    CORRECTED_VIN: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    SQUISH_VIN: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    WMI: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    VIS_IDENTIFIER: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    VDS: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    YEAR_IDENTIFIER: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    SERIAL_NUMBER: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    VIN_TYPE: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    CHECK_DIGIT: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    MAKE: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    MODEL: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    MODEL_YEAR: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    BODY_STYLE: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    ENGINE_TYPE_BAS: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    TRANSMISSION: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    MANUFACTURED_IN: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    POWER_STEERING: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    TILT_STEERING_WHEEL: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    ABS_BRAKES: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    POWER_WINDOWS: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    FRONT_AIR_CONDITIONING: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    BODY_TYPE: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    NUMBER_OF_DOOR: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    DISPLACEMENT_SI: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    DISPLACEMENT_CID: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    DISPLACEMENT_NORMAL: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    ENGINE_TYPE_ES: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    ENGINE_HEAD: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    ENGINE_VALVES: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    ENGINE_CYLINDERS: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    ENGINE_ASPIRATION: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    AUTOMATIC_GEARBOX: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    FUEL_TYPE: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    DRIVELINE: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    GVWR_RANGE: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    VIN_CODE: string

    @Column({ type: 'varchar2', length: 500 })
    USUARIO_INSERCION: string

    @Column({ type: 'timestamp' })
    FECHA_INSERCION: Date

    @Column({ type: 'varchar2', length: 500 })
    USUARIO_ACTUALIZACION: string

    @Column({ type: 'timestamp' })
    FECHA_ACTUALIZACION: Date
}
