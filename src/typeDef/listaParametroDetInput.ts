import {
    InputType,
    Field
} from "type-graphql"
@InputType({ description: 'Parámetros de consulta <Lista parametros>' })
export class ListaParametroInput {

    @Field({ nullable: true, description: 'Código de la empresa.' })
    ID_EMPRESA?: string

    @Field({ nullable: true, description: 'Código de la lista a consultar.' })
    ID_LISTA: number

    @Field({ nullable: true, description: 'Estado de la lista.' })
    ESTADO?: string

    @Field({ nullable: true })
    VALOR?: string
}
