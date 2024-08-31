import { Field, InputType } from "type-graphql";

@InputType({ description: '' })
export class fileInput {
    
    @Field({ description: 'Nombre del archivo', })
    DirName: string

    @Field({ nullable: true })
    FileName?: string

    @Field({ nullable: true })
    FileType: string

    @Field()
    trasactionType: string

    @Field({ nullable: true })
    documentId: string

    @Field({ nullable: true })
    stringFile: string

    // @Field({ nullable: true })
    // Mimetype?: string

    // @Field({ nullable: true })
    // Encoding?: string

    // @Field({ nullable: true })
    // createReadStream?: ReadStream
}
