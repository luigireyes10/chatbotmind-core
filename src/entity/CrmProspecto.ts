import { Field, ObjectType } from 'type-graphql'
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    BaseEntity
} from 'typeorm'

@ObjectType({ description: "Modelo de Prospectos" })
@Entity('CRM_PROSPECTO')
export class CrmProspecto extends BaseEntity {
    
    @PrimaryColumn({ type: 'varchar2', length: 2, nullable: false })
    ID_EMPRESA: string

    @Field({ nullable: true })
    @PrimaryColumn({ type: 'varchar2', length: 15, nullable: false })
    CEDULARNC: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 150, nullable: true })
    NOMBRES: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 150, nullable: true })
    APELLIDOS: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    TIPO_ORGANIZACION: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 1, nullable: true })
    TIPO_PROSPECTO: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 20, nullable: true })
    PASAPORTE: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 150, nullable: true })
    APODO: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_PROVINCIA: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_MUNICIPIO: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_SECTOR: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_VIA: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 150, nullable: true })
    EMAIL: string

    @CreateDateColumn({ type: 'timestamp' })
    FECHA_INSERCION: Date

    @Column({ type: 'varchar2', length: 50, nullable: true })
    USUARIO_INSERCION: string

    @UpdateDateColumn({ type: 'timestamp' })
    FECHA_ACTUALIZACION: Date

    @Column({ type: 'varchar2', length: 50, nullable: true })
    USUARIO_ACTUALIZACION: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 2, nullable: true })
    ESTADO: string

    @Field({ nullable: true })
    @Column({ type: 'char', length: 1, nullable: true })
    SEXO: string

    @Field({ nullable: true })
    @Column({ type: 'char', length: 1, nullable: true })
    ESTADO_CIVIL: string

    @Field({ nullable: true })
    @Column({ type: 'timestamp' })
    FECHA_NACIMIENTO: Date

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    TIPO_LICENCIA: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_PAIS: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    PEPS: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 150, nullable: true })
    CARGO: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 50, nullable: true })
    VINCULADO_A: string
}
