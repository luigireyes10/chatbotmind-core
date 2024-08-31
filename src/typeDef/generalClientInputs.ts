import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class ClientFinancingsDues {
  @Field({ nullable: true })
  NO_CUOTA: number;

  @Field({ nullable: true })
  FECHA_CUOTA: Date;

  @Field({ nullable: true })
  CUOTAS_CAPITAL: number;

  @Field({ nullable: true })
  CUOTAS_SEGURO: number;

  @Field({ nullable: true })
  CUOTAS_MORA: number;

  @Field({ nullable: true })
  CUOTAS_INTERES: number;

  @Field({ nullable: true })
  TOTAL_DE_CUOTAS: number;

  @Field({ nullable: true })
  SALDO: number;
}

@InputType()
export class ClientCXCInput {
  @Field({ nullable: true })
  ID_CLIENTE: string;

  @Field({ nullable: true })
  TIPO_BALANCE?: string;

  @Field()
  ID_EMPRESA: string;

  @Field({ nullable: true })
  ID_MONEDA?: string;
}

@ObjectType({ description: "" })
export class BalanceClientFinancings {
  @Field(() => Number, {
    nullable: true,
    description: "Balance Total de Cuotas por Capital",
  })
  TOTAL_CUOTAS_CAPITAL?: Number;

  @Field(() => Number, {
    nullable: true,
    description: "Balance Total de Cuotas por Interés",
  })
  TOTAL_CUOTAS_INTERES?: Number;

  @Field(() => Number, {
    nullable: true,
    description: "Balance Total de Cuotas por Mora",
  })
  TOTAL_CUOTAS_MORA?: Number;

  @Field(() => Number, {
    nullable: true,
    description: "Número de préstamos tomados",
  })
  CANTIDAD_PRESTAMOS?: Number;

  @Field(() => Number, {
    nullable: true,
    description: "Balance Total de Cuotas a Saldar",
  })
  TOTAL_SALDAR?: Number;
}

@ObjectType({ description: "" })
export class BalanceClientCharges {
  @Field(() => Number, {
    nullable: true,
    description: "Balance Total de Cargos",
  })
  CANTIDAD_CARGOS?: Number;

  @Field(() => Number, {
    nullable: true,
    description: "Balance Total de Cargos a Saldar",
  })
  TOTAL_SALDAR?: Number;

  @Field(() => String, {
    nullable: true,
    description: "Número documento",
  })
  NO_DOC?: string;

  @Field(() => String, {
    nullable: true,
    description: "Concepto del documento",
  })
  CONCEPTO?: string;

  @Field(() => Number, {
    nullable: true,
  })
  MONTO?: Number;

  @Field(() => Number, {
    nullable: true,
  })
  SALDO?: Number;

  @Field()
  ID_MONEDA: string;
}

@ObjectType({ description: "" })
export class ClientFinancingsDetails {
  @Field({ nullable: true })
  ID_PRESTAMO?: string;

  @Field({ nullable: true })
  DESCRIPCION_OFERTA?: string;

  @Field({ nullable: true })
  VEHICULO_FINANCIADO?: string;

  @Field(() => Number, {
    nullable: true,
    description: "Total de Cuotas Pendientes",
  })
  TOTAL_DE_CUOTAS?: Number;

  @Field(() => Number, {
    nullable: true,
    description: "Cuotas Capital",
  })
  CUOTAS_CAPITAL?: Number;

  @Field(() => Number, {
    nullable: true,
    description: "Cuotas Interés",
  })
  CUOTAS_INTERES?: Number;

  @Field(() => Number, {
    nullable: true,
    description: "Cuotas Mora",
  })
  CUOTAS_MORA?: Number;

  @Field(() => Number, {
    nullable: true,
    description: "Cuotas Seguro",
  })
  CUOTAS_SEGURO?: Number;

  @Field(() => Number, {
    nullable: true,
    description: "Número de la cuota",
  })
  NO_CUOTA?: Number;

  @Field({ nullable: true })
  FECHA_CUOTA?: Date;

  @Field(() => Number, {
    nullable: true,
    description: "Total Cuotas a Saldar",
  })
  SALDO?: Number;
}

@ObjectType({ description: "" })
export class ClientFinancingsGeneralData {
  @Field({ nullable: true })
  ID_PRESTAMO?: string;

  @Field({ nullable: true })
  ID_NEGOCIO?: string;

  @Field(() => String, {
    nullable: true,
    description: "Descripción del financiamiento",
  })
  DESCRIPCION_FINANCIAMIENTO?: string;

  @Field(() => String, {
    nullable: true,
    description: "Descripción del vehículo del financiamiento",
  })
  VEHICULO_FINANCIADO?: string;

  @Field({ nullable: true })
  FECHA_APERTURA?: Date;

  @Field(() => Number, {
    nullable: true,
    description: "Monto desembolsado para el financiamiento",
  })
  MONTO_FINANCIAR?: Number;

  @Field()
  ID_MONEDA: string;
}

@ObjectType({ description: "" })
export class ClientCollectOficial {
  @Field({ nullable: true })
  ID_OFICIAL?: string;

  @Field({ nullable: true })
  OFICIAL?: string;

  @Field({ nullable: true })
  TELEFONO: string;

  @Field({ nullable: true })
  EXTENSION: string;

  @Field({ nullable: true })
  EMAIL: string;
}

@ObjectType({ description: "" })
export class ClientFinancingsDetailsByLoan {
  @Field({ nullable: true })
  ID_PRESTAMO?: string;

  @Field({ nullable: true })
  DESCRIPCION_OFERTA?: string;

  @Field({ nullable: true })
  VEHICULO_FINANCIADO?: string;

  @Field(() => [ClientFinancingsDues], { nullable: true })
  CUOTAS?: ClientFinancingsDues[];
}
