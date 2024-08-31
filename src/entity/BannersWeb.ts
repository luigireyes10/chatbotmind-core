import { Field, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm"

@ObjectType({ description: "Ruta de imagenes para Banners" })
@Entity('BANNERS_WEB')
export class BannersWeb extends BaseEntity {

    @Field({ nullable: true })
    @PrimaryColumn({ type: 'varchar2', length: 10 })
    ID_EMPRESA?: string

    @Field({ nullable: true })
    @PrimaryColumn({ type: 'varchar2', length: 10 })
    ID_BANNER?: number

    @Field({ nullable: true })
    @PrimaryColumn({ type: 'varchar2', length: 50 })
    ID_BANNER_PAGE?: string

    @Field({ nullable: true})
    @PrimaryColumn({ type: 'number' })
    SECUENCIA?: number

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    RUTA_DOCUMENTO?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500 })
    NOTA?: string

    @Field({ nullable: true })
    @Column({ type: 'char', length: 1 })
    ESTADO?: string

    @Column({ type: 'timestamp' })
    FECHA_INSERCION?: Date

    @Column({ type: 'varchar2', length: 50 })
    USUARIO_INSERCION?: string

    @Column({ type: 'timestamp' })
    FECHA_ACTUALIZACION?: Date

    @Column({ type: 'varchar2', length: 50 })
    USUARIO_ACTUALIZACION?: string

    @Field({ nullable: true })
    @Column({ type: 'number'})
    ORDEN: number
}
