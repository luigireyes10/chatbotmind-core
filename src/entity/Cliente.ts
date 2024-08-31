import { Field, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn
} from 'typeorm'

@ObjectType({ description: "Modelo de Clientes" })
@Entity('CLIENTE')
export class Cliente extends BaseEntity {

    @Field({ nullable: true })
    @PrimaryColumn({ type: 'varchar2', length: 10, nullable: false })
    ID_CLIENTE?: string

    @Field({ nullable: true })
    @PrimaryColumn({ type: 'varchar2', length: 5, nullable: false })
    ID_EMPRESA?: string

    @Field({ nullable: true })
    @Column({ type: 'number' })
    ID_TIPO_CLIENTE?: number

    @Field({ nullable: true })
    @Column({ type: 'number' })
    LIMITE_CREDITO?: number

    @Field({ nullable: true })
    @Column({ type: 'char', length: 1, nullable: false })
    ESTADO?: string

    @Column({ type: 'timestamp' })
    FECHA_INSERCION?: Date

    @Column({ type: 'varchar2', length: 30, nullable: true })
    USUARIO_INSERCION?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: false })
    NOMBRES?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    APELLIDOS?: string

    @Field({ nullable: true })
    @Column({ type: 'number' })
    EDAD?: number

    @Field({ nullable: true })
    @Column({ type: 'char', length: 1, nullable: true })
    SEXO?: string

    @Field({ nullable: true })
    @Column({ type: 'char', length: 1, nullable: true })
    ESTADO_CIVIL?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 13, nullable: true })
    DOCUMENTO_IDENTIDAD?: string

    @Field({ nullable: true })
    @Column({ type: 'number' })
    BALANCE_CUENTA?: number

    @Column({ type: 'timestamp' })
    FECHA_NAC?: Date

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 60, nullable: true })
    LUGAR_NAC?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 15, nullable: true })
    RNC?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 50, nullable: true })
    TELEFONO?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 50, nullable: true })
    FAX?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    DIRECCION_EMAIL?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    DIRECCION_WEB?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 50, nullable: true })
    TELEFONO_MOVIL?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    NOMBRE_EMPRESA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 50, nullable: true })
    REPRESENTANTE_CUENTA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 70, nullable: true })
    CONTACTO_PRINCIPAL?: string
    
    @Column({ type: 'timestamp' })
    FECHA_ACTUALIZACION?: Date

    @Column({ type: 'varchar2', length: 30, nullable: true })
    USUARIO_ACTUALIZACION?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 3, nullable: false })
    ID_CONDICION?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 25, nullable: true })
    NUMERO_POLIZA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 70, nullable: true })
    EMPRESA_POLIZA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 50, nullable: true })
    NACIONALIDAD?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 30, nullable: true })
    APODO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 50, nullable: true })
    OCUPACION?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 250, nullable: true })
    ALERGIAS_MEDICAMENTOS?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 250, nullable: true })
    OTRAS_PATOLOGIAS?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500, nullable: true })
    NOTAS?: string
    
    @Field({ nullable: true })
    @Column({ type: 'timestamp' })
    FECHA_ANIVERSARIO?: Date
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 20, nullable: true })
    TEL_OFICINA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    PAIS?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    CIUDAD_PROVINCIA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    LINEA1?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    LINEA2?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    WEB_EMPRESA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    EMAIL_EMPRESA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 50, nullable: true })
    PROFESION?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 50, nullable: true })
    PUESTO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 200, nullable: true })
    DIRECCION_EMPRESA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 20, nullable: true })
    TELEFONO_EMPRESA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 20, nullable: true })
    FAX_EMPRESA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    VALOR_FISCAL?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 3, nullable: true })
    ID_TIPO_NCF?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    CAL_DESC_DEF?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_ESTADO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 5, nullable: true })
    ID_MONEDA_DEF?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    APARTADO_POSTAL?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_PERSONAL_VENDEDOR?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_REPRESENTANTE?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_REP_VEN?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    ID_TIPO_IDENT?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_EMPLEADO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_PROVEEDOR?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_RUTA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    COMISION_VENTA?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_CENTRO_COSTO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    LIMITE_FACT_PEND_CTE?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    TR_ORIGEN?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    PORC_IMP_RETENIDO?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 5, nullable: true })
    ID_PROVINCIA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 5, nullable: true })
    ID_MUNICIPIO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 5, nullable: true })
    ID_SECTOR?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    APLICA_MORA?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 30, nullable: true })
    CODIGO_VIEJO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 20, nullable: true })
    ID_PAIS?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 500, nullable: true })
    RUTA_FOTO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_ASEGURADORA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 30, nullable: true })
    NSS?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 30, nullable: true })
    POLIZA_NO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 20, nullable: true })
    CUENTA_CONTABLE?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 3, nullable: true })
    ID_CONDICION_VEND?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    ID_GRUPO_CLIENTE?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 5, nullable: true })
    ID_CLASIFICACION?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    CLIENTEVIP?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    LIMTE_FACT_PEND_VENC?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    DESC_FACTURA?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    LIMITE_DESCUENTO?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_SUB_TIPO_CTE?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    LIMITE_NUM_CUOTA?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    LIMITE_TASA_FIN?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_ENTIDAD?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    TIPO_ENTIDAD?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    NOMBRE_SUPERVISOR?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    RANKING_DATA_CREDITO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    CALIFICACION_CTE?: string
    
    @Field({ nullable: true })
    @Column({ type: 'char', length: 1, nullable: true })
    POSEE_TARJETA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    BANCO_TARJETA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'char', length: 1, nullable: true })
    POSEE_CUENTA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    BANCO_CUENTA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'char', length: 1, nullable: true })
    CASA_PROPIA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    NOMBRE_DUENO_CASA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 30, nullable: true })
    TELEFONO_DUENO_CASA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 300, nullable: true })
    REFERIDO_POR?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_CLIENTE_REFERIDO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    LIMITE_MONTO_CUOTA?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_TIPO_CATEGORIA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    LIMITE_DIAS_VEN?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    LIMITE_PORC_INICIAL?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    COMISION_VEN?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    INGRESO_PROMEDIO?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    RAZON_SOCIAL?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    CALLE?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 20, nullable: true })
    CASA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 50, nullable: true })
    EDIFICIO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 20, nullable: true })
    APARTAMENTO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 13, nullable: true })
    DOC_IDENTIDAD_REP_EMPRESA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 13, nullable: true })
    NO_PASAPORTE?: string
    
    @Field({ nullable: true })
    @Column({ type: 'char', length: 1, nullable: true })
    INDNUEVO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    INDVALIDADO?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    MESES_TIEMPO_MERCADO?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    ANIO_TIEMPO_MERCADO?: number
   
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    SERVICIOS_OFRECIDOS?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    MESES_TIEMPO_EMPRESA?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    ANIO_TIEMPO_EMPRESA?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    POSICION_EMPRESA?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    TIPO_SOCIETARIO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    ESTATURA_FT?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    ESTATURA_IN?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    PESO_LB?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    PEPS?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    VINCULADO_A?: string
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    TIPO_EMPLEO?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_SECTOR_ECONOMICO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    LST_SECTOR_ECONOMICO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_LISTA_DEP_EXT?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_DEP_EXTERNO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'timestamp' })
    FECHA_SOLICITUD?: Date
    
    @Field({ nullable: true })
    @Column({ type: 'timestamp' })
    FECHA_ENTRADA_EMPRESA?: Date
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    MONTO_AHORRO_NAV?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    MONTO_DEP_APORTACION?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    MONTO_DEP_VISTA?: number
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    MONTO_AHORRO_MENSUAL?: number
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 100, nullable: true })
    CARGO_VINCULADO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_PROVINCIA_VINCULADO?: string
    
    @Field({ nullable: true })
    @Column({ type: 'timestamp' })
    FECHA_VENC_REG_MERCANTIL?: Date
    
    @Field({ nullable: true })
    @Column({ type: 'number' })
    OTROS_INGRESOS?: number

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 200, nullable: true })
    RAZON_OTROS_INGRESOS?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar2', length: 10, nullable: true })
    ID_MONEDA_OTROS_ING?: string
}
