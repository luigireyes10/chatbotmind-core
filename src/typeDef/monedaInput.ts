import { Length } from "class-validator";
import { Field, InputType, registerEnumType } from "type-graphql";

export enum TIPO_MONEDA {
    US = 'US',
    RD = 'RD',
    EU = 'EU'
}

registerEnumType(TIPO_MONEDA, {
    name: "TIPO_MONEDA",
    description: "Tipo de moneda",
});

@InputType({ description: 'Parámetros para consultar la tasa del día.' })
export class monedaArgType {

    @Field(() => String, { description: 'Código de la empresa', nullable: false })
    // @Length(0, 3, { message: 'La longitud no puede ser mayor a 3 caráteres' })
    ID_EMPRESA: string

    @Field(() => String, { description: 'Fecha de la tasa', nullable: false })
    // @Length(0, 15, { message: 'La longitud no puede ser mayor a 15 caráteres' })
    FECHA: string

    @Field(() => TIPO_MONEDA, { description: 'Tipo de moneda', nullable: false })
    ID_MONEDA: TIPO_MONEDA
}
