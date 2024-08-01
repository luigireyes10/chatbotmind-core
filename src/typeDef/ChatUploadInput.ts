
import { Field, InputType } from "type-graphql";
import { Upload } from "../constants/types";
import { GraphQLUpload } from "apollo-server-core";

@InputType({ description: 'Parámetros para .' })
export class ChatUploadInput {


    @Field({nullable: true, description: '' })
    ID_EMPRESA?: string

    @Field(() => [FileChatUpload], { nullable: true })
    FILESUPLOAD?: FileChatUpload[]

    @Field({ nullable: true, defaultValue: 'A', description: '' })
    ESTADO?: string = "A"
}


@InputType({ description: '' })
export class FileChatUpload {
  @Field({ nullable: true , defaultValue: 'P' })
  TIPO_DOC?: string

  @Field(() => GraphQLUpload, { nullable: true })
  FILE?: Promise<Upload>
}





@InputType({ description: 'Parámetros para .' })
export class CreateChatUploadInput {
    @Field({nullable: true, description: '' })
    ID_EMPRESA?: string

    @Field({ nullable: true, defaultValue: 'A', description: '' })
    ESTADO?: string = "A"

    @Field({ nullable: false })
    ID_ADJUNTO: string;

    @Field({ nullable: false })
    ID_CHAT: string;

    @Field({ nullable: true })
    ORDEN_DOC?: number;
  
    @Field({ nullable: true })
    TIPO_DOCUMENTO?: string;
  
    @Field({ nullable: true })
    RUTA_DOCUMENTO: string;
  
    @Field({ nullable: true })
    OBSERVACION: string;
  
}
