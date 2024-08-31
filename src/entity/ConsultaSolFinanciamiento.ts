import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

@ObjectType({ description: "Modelo Consulta Solicitud Financiamiento" })
export class ConsultaSolFinanciamiento {
  @Field()
  @Column({ type: "varchar2", length: 15 })
  CEDULARNC: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 300 })
  NOMBRE_COMPLETO: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 150 })
  EMAIL: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 25 })
  TELEFONO: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 50 })
  PORCIENTO_INICIAL: string;

  @Field({ nullable: true })
  @Column({ type: "char", length: 1 })
  SEGURO: string;

  @Field({ nullable: true })
  @Column({ type: "char", length: 3 })
  GARANTIA: string;

  @Field({ nullable: true })
  @Column({ type: "number", length: 10 })
  PLAZO_MESES: number;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 20 })
  ESTATUS_SOL: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 60 })
  PROVINCIA: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 60 })
  CIUDAD: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 150 })
  VEHICULO: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 20 })
  REFERENCIA: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 100 })
  MARCA: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 100 })
  MODELO: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 50 })
  COLOR: string;

  @Field({ nullable: true })
  @Column({ type: "varchar2", length: 20 })
  ANO: string;
}
