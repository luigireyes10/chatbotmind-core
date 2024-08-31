import { Field, ObjectType } from 'type-graphql'
import {
    Column,
    Entity,
    PrimaryColumn,
    BaseEntity
} from 'typeorm'
@ObjectType({ description: "Modelo de Cotizacion web." })
@Entity('COTIZACION_WEB')
export class CotizacionWeb extends BaseEntity {

  @Field({ nullable: true })
  @PrimaryColumn({ type: 'number'})
  ID_COTIZACION: number
  
  @Field()
  @Column({ type: 'varchar2', length: 10, nullable: false})
  REFERENCIA: string

  @Field()
  @Column({ type: 'number'})
  PRECIO_RD: number 

  @Field()
  @Column({ type: 'number'})
  PRECIO_US: number 

  @Field()
  @Column({ type: 'varchar2', length: 50, nullable: false})
  NOMBRE_CLIENTE: string

  @Field()
  @Column({ type: 'varchar2', length: 11, nullable: false})
  CEDULA_CLIENTE: string 

  @Field()
  @Column({ type: 'varchar2', length: 15, nullable: false})
  TELEFONO_CLIENTE: string 
  
  @Field()
  @Column({ type: 'varchar2', length: 100, nullable: false})
  EMAIL_CLIENTE: string 
  
  @Field({ nullable: true })
  @Column({ type: 'varchar2', length: 100})
  NOMBRE_ENTIDAD: string 
  
  @Field({ nullable: true })
  @Column({ type: 'varchar2', length: 500})
  LOCALIDAD_ENTIDAD: string
  
  @Field({ nullable: true })
  @Column({ type: 'varchar2', length: 50})
  NOMBRE_CONTACTO_ENTIDAD: string 
  
  @Field({ nullable: true })
  @Column({ type: 'varchar2', length: 15})
  TELEFONO_ENTIDAD: string 
  
  @Field({ nullable: true })
  @Column({ type: 'varchar2', length: 100})
  EMAIL_ENTIDAD: string 
  
  @Field({ nullable: true })
  @Column({ type: 'number'})
  TASA_LOCAL_EXTRANJERA: number
  
  @Field({ nullable: true })
  @Column({ type: 'number'})
  TASA_EXTRANJERA_LOCAL: number
  
  @Column({ type: 'timestamp'})
  FECHA_INSERCION: Date
  
  @Column({ type: 'varchar2', length: 20, nullable: false})
  USUARIO_INSERCION: string 
  
  @Field({ nullable: true })
  @Column({ type: 'varchar2', length: 15, nullable: false})
  RNC_CLIENTE: string
  
  @Field({ nullable: true })
  @Column({ type: 'varchar2', length: 15})
  PASAPORTE_CLIENTE: string

}