import { Length } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class BannersWebInput {
  @Field({ nullable: true })
  ID_EMPRESA?: string;

  @Field({ nullable: true })
  ID_BANNER?: string;

  @Field({ nullable: true })
  ID_BANNER_PAGE?: string;

  @Field({ nullable: true })
  ESTADO?: string;

  @Field({ nullable: true })
  SECUENCIA?: number;

  @Field({ nullable: true })
  ORDEN?: number;

  @Field({ nullable: true })
  RUTA_DOCUMENTO?: string;

  @Field({ nullable: true })
  NOTA?: string;
}

@InputType()
export class BannerFileUploadInput {
  @Field({ nullable: true })
  FileName: string;

  @Field()
  FileType: string;

  @Field()
  bannerId: string;

  @Field({ nullable: true })
  bannerPageId: string;

  @Field()
  stringFile: string;

  @Field({ nullable: true })
  SECUENCIA?: number;

  @Field({ nullable: true })
  NOTA?: string;

}

@InputType()
export class BannerWebUpdate {
  @Field({ nullable: true })
  ID_BANNER?: number;

  @Field({ nullable: true })
  ID_BANNER_PAGE?: string;

  @Field({ nullable: true })
  ORDEN?: number;

  @Field({ nullable: true, defaultValue: "A" })
  ESTADO?: string = "A"
}
