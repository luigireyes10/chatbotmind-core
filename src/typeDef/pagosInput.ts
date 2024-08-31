import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType({ description: "Pagos realizados por Negocio" })
export class ClientPayments {
  @Field({ nullable: true })
  FECHA_PAGO?: Date;

  @Field({ nullable: true })
  NO_TRANSACCION?: string;

  @Field({ nullable: true })
  ID_TIPO_TRANS?: string;

  @Field({ nullable: true })
  ID_DOCUMENTO?: string;

  @Field({ nullable: true })
  CAPITAL?: number;

  @Field({ nullable: true })
  INTERES?: number;

  @Field({ nullable: true })
  MORA?: number;

  @Field({ nullable: true })
  SEGURO?: number;

  @Field({ nullable: true })
  NO_CUOTA?: number;
}

@ObjectType({ description: "Distribución de pago" })
export class PaymentDistribution {
  @Field({ nullable: true })
  FECHA_BANCO?: Date;

  @Field({ nullable: true })
  TIPO_PAGO?: string;

  @Field({ nullable: true })
  ID_DOCUMENTO_GEN?: string;

  @Field({ nullable: true })
  TASA_MONEDA?: string;

  @Field({ nullable: true })
  NO_REF: string;

  @Field({ nullable: true })
  MONTO?: number;

  @Field({ nullable: true })
  ID_MONEDA?: string;

  @Field({ nullable: true })
  ID_CUENTA?: string;

  @Field({ nullable: true })
  NOMBRE_BANCO?: string;

  @Field({ nullable: true })
  COMENTARIO?: string;
}

@InputType()
export class ClientPaymentsInput {
  @Field({ nullable: true })
  ID_CLIENTE?: string;

  @Field()
  ID_PRESTAMO: string;

  @Field()
  ID_EMPRESA: string;
}

@InputType()
export class ClientPaymentDistribution {
  @Field({ nullable: true })
  TIPO_DOCUMENTO?: string;

  @Field()
  NO_DOCUMENTO: string;

  @Field()
  ID_EMPRESA: string;
}
