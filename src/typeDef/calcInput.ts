import { Field, Float, InputType, Int, ObjectType } from "type-graphql";

@InputType({
  description: "Parametros para Consultar la tabla de amortización.",
})
export class paramsTablaAmortizacion {
  @Field(() => Float, { description: "Monto Total a financiar." })
  PMONTO: number;

  @Field(() => Float, { description: "Tasa relacionada al Financiamiento." })
  PTASA: number;

  @Field(() => Float, { description: "Cantidad de tiempo expresado en meses." })
  PPLAZO: number;

  @Field(() => [ABONOS_PROGRAMADOS], { nullable: true })
  ABONOS_PROGRAMADOS: [ABONOS_PROGRAMADOS];
}

@InputType({
  description: "Parametros para Consultar la tabla de amortización x2.",
})
export class paramsTablaAmortizacionFlexi {
  // extends paramsTablaAmortizacion {

  @Field(() => Float, { description: "Monto Total a financiar." })
  PMONTO: number;

  @Field(() => Float, { description: "Tasa relacionada al Financiamiento." })
  PTASA: number;

  @Field(() => Float, { description: "Cantidad de tiempo expresado en meses." })
  PPLAZO: number;

  @Field(() => [ABONOS_PROGRAMADOS], { nullable: true })
  ABONOS_PROGRAMADOS: [ABONOS_PROGRAMADOS];

  @Field(() => Float, { description: ".", nullable: true })
  PCAPITAL_EXTRA?: number;
}

@InputType()
export class ABONOS_PROGRAMADOS {
  @Field(() => Float, { nullable: true })
  PMONTO_ABONO: number;

  @Field(() => Int, { nullable: true })
  NUM_CUOTA: number;
}

@ObjectType({ description: "" })
export class CUOTA_FINANCIAMIENTO {
  @Field(() => String, { nullable: true, description: "Monto de la cuota." })
  MONTO_CUOTA?: string;
}

@InputType({ description: "Parametros para consultar Cuota Financiamiento." })
export class paramsCuotaFinanciamiento {
  @Field(() => Float, { description: "Valor del monto a financiar." })
  PMONTO_FINANCIAMIENTO: number;

  @Field(() => Float, { description: "Plazo en meses del financiamiento." })
  PPLAZO: number;

  @Field(() => Float, { description: "Tasa de interes del financiamiento." })
  PTASA_INTERES: number;

  @Field(() => Float, { description: "", defaultValue: 30 })
  PFRECUENCIA: number = 30;

  @Field(() => Float, { description: "", defaultValue: 360 })
  PBASE_CAL_INTERES: number = 360;

  @Field(() => String, { description: "", defaultValue: "I" })
  PTIPO_CUOTA: string = "I";
}

@ObjectType({ description: "" })
export class TablaAmortizacion {
  @Field(() => Int, { nullable: true })
  SECCION_ID?: number;

  @Field(() => Float, { nullable: true, description: "Numero de cuota." })
  NUM_CUOTA?: number;

  @Field({ nullable: true, description: "Fecha del pago." })
  FECHA?: Date;

  @Field(() => Float, { nullable: true, description: "Abono a capital." })
  CAPITAL?: number;

  @Field(() => Float, { nullable: true, description: "Abono de interes" })
  INTERES?: number;

  @Field(() => Float, { nullable: true, description: "Otros cargos." })
  OTROS?: number;

  @Field(() => Float, {
    nullable: true,
    description: "Balance despues del pago.",
  })
  BALANCE?: number;

  @Field({ nullable: true })
  CAPITAL_SEGURO?: number;

  @Field(() => Float, { nullable: true })
  INTERES_SEGURO?: number;

  @Field(() => Float, { nullable: true })
  CAPITAL_ADICIONAL?: number;

  @Field(() => Float, { nullable: true })
  INTERES_ADICIONAL?: number;

  @Field(() => Float, { nullable: true, description: "Cuota a pagar." })
  CUOTA?: number;

  @Field(() => Float, { nullable: true, description: "Monto Financiado." })
  MONTO?: number;

  @Field(() => Float, { nullable: true, description: "Plazo en meses." })
  PLAZO?: number;

  @Field(() => String, { nullable: true, description: "Máscara de la cuota" })
  LABEL_CUOTA?: string;

  @Field(() => Float, { nullable: true, description: "Monto Abono." })
  ABONO?: number;
}

@ObjectType({ description: "" })
export class TablaAmortizacionFlexi extends TablaAmortizacion {
  @Field(() => Float, { nullable: true, description: "" })
  CAPITAL_EXTRA?: number;

  @Field(() => Float, { nullable: true, description: "" })
  INTERES_EXTRA: number;

  @Field(() => Float, { nullable: true, description: "" })
  CAPITAL_EXTRA_PENDI: number;

  @Field(() => Float, { nullable: true, description: "" })
  PAGO_MENSUAL: number;
}

@InputType()
export class AmortizacionSeguroInput {
  @Field({ nullable: true })
  MONTO?: number;

  @Field()
  PLAZO: number;

  @Field()
  PRIMA_SEG: number;

  @Field()
  INICIAL_SEG: number;
}

@InputType({
  description: "Parámetros para amortización FlexiComodo",
})
export class paramsTablaAmortizacionFlexiComodo {
  @Field(() => Float, { description: "Monto Total a financiar." })
  PMONTO: number;

  @Field(() => Float, { description: "Tasa relacionada al Financiamiento." })
  PTASA: number;

  @Field(() => Float, { description: "Cantidad de tiempo expresado en meses." })
  PPLAZO: number;

  @Field(() => Float, { description: "Período entre abonos", nullable: true })
  PERIODOS_ABONOS?: number;
}

@InputType({
  description: "Parámetros para amortización FlexiCuota",
})
export class paramsTablaAmortizacionFlexiCuota {
  @Field(() => Float, { description: "Monto Total a financiar." })
  PMONTO: number;

  @Field(() => Float, { description: "Tasa relacionada al Financiamiento." })
  PTASA: number;

  @Field(() => Float, { description: "Cantidad de tiempo expresado en meses." })
  PPLAZO: number;

  @Field({description: "Fecha del inicio del financiamiento."})
  FECHA: Date;

  @Field(() => Float, { description: "Monto Total a abonar.", nullable: true })
  ABONOTOTAL?: number;

  @Field(() => Float, { description: "Monto Cuota de abonos." })
  CUOTAABONO: number;

  @Field(() => Float, { description: "Cuota del Abono", nullable: true })
  PRIMERABONO?: number;

  @Field(() => Float, { description: "Cuota del Abono", nullable: true })
  SEGUNDOABONO?: number;
}
