import { Min, Max } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType({ description: '' })
export class PagArgs {

  @Field(() => Int, { description: 'Página incial para la consulta', defaultValue: 1 })
  @Min(1)
  skip: number = 1;

  @Field(() => Int, { description: 'Cantidad de registros por página.', defaultValue: 25 })
  @Min(1)
  @Max(50)
  take: number = 25;
}
