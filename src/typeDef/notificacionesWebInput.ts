import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";

@InputType({ description: '' })
export class NotificationsClieWebQuery {
  @Field({ nullable: true })
  ID_NOTIFICADO?: number;

  @Field({ nullable: true })
  ID_NOTIFICACION?: number;
}

export enum NOTIFICATION_STATE {
  ON = 'ON',
  OFF = 'OFF'
}

registerEnumType(NOTIFICATION_STATE, {
  name: "NOTIFICATION_STATE",
  description: "Tipo de notificacion",
});

export enum NOTIFICATION_VIA {
  SMS = 'SMS',
  EMAIL = 'CORREO',
  WEB_PAGE = 'PAGINA WEB'
}

registerEnumType(NOTIFICATION_VIA, {
  name: "NOTIFICATION_VIA",
  description: "Vía de notificacion",
});

@InputType()
export class NotificationsSendsInput {
  @Field({ nullable: true })
  ESTADO_ENVIO?: string;

  @Field({ nullable: true })
  ID_EVENTO?: string;
}

@InputType()
export class NotificationsInput {
  @Field({ nullable: true })
  ID_NOTIFICADO?: number;

  @Field({ nullable: true })
  ID_USUARIO?: number;

  @Field({ nullable: true })
  ID_CLIENTE: string;

  @Field(() => NOTIFICATION_VIA, { nullable: true })
  VIA_NOTIFICACION?: NOTIFICATION_VIA;

  @Field({ nullable: true })
  VIA_DESTINO?: string;

  @Field(() => NOTIFICATION_STATE, { nullable: true })
  CAMBIO_PRECIO?: NOTIFICATION_STATE;

  @Field(() => NOTIFICATION_STATE, { nullable: true })
  NUEVAS_OFERTAS?: NOTIFICATION_STATE;

  @Field(() => NOTIFICATION_STATE, { nullable: true })
  NUEVOS_VEHICULOS?: NOTIFICATION_STATE;

  @Field(() => NOTIFICATION_STATE, { nullable: true })
  SOLICITUDES?: NOTIFICATION_STATE;

  // @Field({ nullable: true })
  // FECHA_INSERCION?: Date;

  // @Field({ nullable: true })
  // USUARIO_INSERCION?: string;

  // @Field({ nullable: true })
  // FECHA_ACTUALIZACION?: Date;

  // @Field({ nullable: true })
  // USUARIO_ACTUALIZACION?: string;
}

@InputType()
export class NotificationsDetCreateInput {
  @Field()
  ID_NOTIFICADO: number;

  @Field({ nullable: true })
  ID_CLIENTE?: string;

  @Field({ nullable: true })
  ID_EMPRESA?: string;

  @Field({ nullable: true })
  CHASIS?: string;

  @Field({ nullable: true })
  ID_MARCA?: string;

  @Field({ nullable: true })
  ID_MODELO?: string;

  @Field({ nullable: true })
  ID_ESTILO?: string;

  @Field({ nullable: true })
  ID_OFERTA?: string;

  @Field({ nullable: true })
  FECHA_INSERCION?: Date;

  @Field({ nullable: true })
  USUARIO_INSERCION?: string;

  @Field({ nullable: true })
  FECHA_ACTUALIZACION?: Date;

  @Field({ nullable: true })
  USUARIO_ACTUALIZACION?: string;
}

@InputType()
export class NotificationsDetUpdateInput {
  @Field()
  ID_NOTIFICACION: number;

  @Field({ nullable: true })
  ID_NOTIFICADO?: number;

  @Field({ nullable: true })
  ID_CLIENTE?: string;

  @Field({ nullable: true })
  ID_EMPRESA?: string;

  @Field({ nullable: true })
  CHASIS?: string;

  @Field({ nullable: true })
  ID_MARCA?: string;

  @Field({ nullable: true })
  ID_MODELO?: string;

  @Field({ nullable: true })
  ID_ESTILO?: string;

  @Field({ nullable: true })
  ID_OFERTA?: string;

  @Field({ nullable: true })
  FECHA_INSERCION?: Date;

  @Field({ nullable: true })
  USUARIO_INSERCION?: string;

  @Field({ nullable: true })
  FECHA_ACTUALIZACION?: Date;

  @Field({ nullable: true })
  USUARIO_ACTUALIZACION?: string;
}
