import { ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm'

@ObjectType({ description: "Modelo Personal" })
@Entity('PERSONAL')
export class Personal extends BaseEntity {
    @PrimaryColumn({ type: 'varchar2', length: 10, nullable: false })
    ID_PERSONAL: string

    @Column({ type: 'varchar2', length: 5, nullable: true })
    ID_EMPRESA: string

    @Column({ type: 'varchar2', length: 50, nullable: true })
    NOMBRES: string

    @Column({ type: 'varchar2', length: 50, nullable: true })
    APELLIDOS: string

    @Column({ type: 'timestamp' })
    FECHA_NACIMIENTO: Date

    @Column({ type: 'varchar2', length: 60, nullable: true })
    LUGAR_NAC: string

    @Column({ type: 'char', length: 1, nullable: true })
    ESTADO_CIVIL: string

    @Column({ type: 'number' })
    DOCUMENTO_IDENTIDAD: number

    @Column({ type: 'char', length: 1, nullable: true })
    SEXO: string

    @Column({ type: 'varchar2', length: 50, nullable: true })
    TELEFONO: string

    @Column({ type: 'varchar2', length: 100, nullable: true })
    DIRECCION_EMAIL: string

    @Column({ type: 'varchar2', length: 50, nullable: true })
    TELEFONO_MOVIL: string

    @Column({ type: 'char', length: 1, nullable: true })
    ESTADO: string

    @CreateDateColumn({ type: 'timestamp' })
    FECHA_INSERCION: Date

    @Column({ type: 'varchar2', length: 30, nullable: true })
    USUARIO_INSERCION: string

    @UpdateDateColumn({ type: 'timestamp' })
    FECHA_ACTUALIZACION: Date

    @Column({ type: 'varchar2', length: 30, nullable: true })
    USUARIO_ACTUALIZACION: string

    @Column({ type: 'varchar2', length: 30, nullable: true })
    USUARIO: string

    @Column({ type: 'varchar2', length: 5, nullable: true })
    ID_ESPECIALIDAD: string

    @Column({ type: 'varchar2', length: 30, nullable: true })
    ID_PRODUCTO: string

    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_CLIENTE: string

    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_TRANSPORTE: string

    @Column({ type: 'number' })
    AUT_CAMB_PRECIO: number

    @Column({ type: 'varchar2', length: 30, nullable: true })
    CLAVE_PRECIO: string

    @Column({ type: 'number' })
    FACTURA_CREDITO: number

    @Column({ type: 'varchar2', length: 3, nullable: true })
    ID_UBICACION: string

    @Column({ type: 'number' })
    AUT_REEMPLAZO: number

    @Column({ type: 'number' })
    VEN_LISTA_BODA: number

    @Column({ type: 'number' })
    AUT_BORRADO: number

    @Column({ type: 'varchar2', length: 5, nullable: true })
    ID_RUTA: string

    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_EMPLEADO: string

    @Column({ type: 'varchar2', length: 5, nullable: true })
    ID_PROVINCIA: string

    @Column({ type: 'varchar2', length: 5, nullable: true })
    ID_MUNICIPIO: string

    @Column({ type: 'number' })
    TR_ORIGEN: number

    @Column({ type: 'varchar2', length: 5, nullable: true })
    ID_EMPRESA_DEF: string

    @Column({ type: 'number' })
    EXPANDIR_MENU: number

    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_REP_VEN: string

    @Column({ type: 'number' })
    CONSULTAR_SOLO_VENDEDOR: number

    @Column({ type: 'char', length: 1, nullable: true })
    AUT_OMITE_MMV: string

    @Column({ type: 'varchar2', length: 300, nullable: true })
    WEB_PASSWORD: string

    @Column({ type: 'timestamp' })
    WEB_PASSWORD_UPDATE: Date

    @Column({ type: 'number' })
    AUT_CAMB_TASA: number

    @Column({ type: 'varchar2', length: 1, nullable: true })
    AUT_ENDOSO: string
}
