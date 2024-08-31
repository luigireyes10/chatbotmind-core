import { Field, InputType, Int } from "type-graphql";

@InputType({ description: 'Parámetros para consultar la oferta' })
export class OfertaQueryInput {

    @Field({ description: 'Código del registro que se desea actualizar', nullable: true })
    ID_OFERTA_IMG?: number

    @Field({ description: 'Código de la oferta de referencia', nullable: true })
    ID_OFERTA_FINANCIAMIENTO?: string

    @Field({ description: 'Estado de la oferta', nullable: true })
    ESTADO?: string

    @Field({ description: 'Estado para las imagenes que van para modal', nullable: true })
    MODAL: string;
}

@InputType({ description: 'Parámetros para crear la oferta' })
export class OfertaImagenInput {
    @Field({ description: 'Código de la oferta de referencia' })
    ID_OFERTA_FINANCIAMIENTO: string

    @Field({ description: 'Tipo de oferta' })
    ID_TIPO: string

    @Field({ description: 'Secuencia del registro', nullable: true })
    SECUENCIA?: number

    @Field({ description: 'Ruta del archivo', nullable: true })
    RUTA_DOCUMENTO?: string

    @Field({ nullable: true })
    NOTA: string

    @Field({ description: 'Estado de la oferta', nullable: true })
    ESTADO?: string

    @Field({ description: 'Título para ser presentado en la pagina', nullable: true })
    TITULO: string;

    @Field({ description: 'Estado para las imagenes que van para modal', nullable: true })
    MODAL: string;

    @Field({ description: 'Orden de las ofertas', nullable: true })
    ORDEN: number

    /* Imagen */

    @Field({ description: 'Imagen en base64 de la oferta' })
    STRING_FILE: string

    @Field({ description: 'Tipo de archivo' })
    FILE_TYPE: string

    @Field(() => Int, { description: 'Índice de la imagen' })
    IMG_INDEX: number
}

@InputType({
    description: 'Parametros para actualizar la oferta'
})
export class OfertaImagenUpdate {

    @Field({ description: 'Código del registro que se desea actualizar' })
    ID_OFERTA_IMG: number

    @Field({ description: 'Código de la oferta de referencia' })
    ID_OFERTA_FINANCIAMIENTO: string

    @Field({ description: 'Nota adicional', nullable: true })
    NOTA: string

    @Field({ description: 'Estado de la oferta', nullable: true })
    ESTADO?: string

    @Field({ description: 'Título para ser presentado en la pagina', nullable: true })
    TITULO: string;

    @Field({ description: 'Estado para las imagenes que van para modal', nullable: true })
    MODAL: string;

    /* Imagen */

    @Field({ description: 'Imagen en base64 de la oferta', nullable: true })
    STRING_FILE: string

    @Field({ description: 'Tipo de archivo', nullable: true })
    FILE_TYPE: string

    @Field(() => Int, { description: 'Indice de la imagen', nullable: true })
    IMG_INDEX: number
}
