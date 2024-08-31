import { Length } from "class-validator";
import { InputType, Field, Int, ArgsType, ObjectType } from "type-graphql";
import { VehiculoInventario } from "../entity/VehiculoInventario";

@InputType({ description: "" })
export class MarcasInput {
  @Field({ nullable: true, description: "Código de la marca." })
  ID_MARCA?: string;

  @Field({ nullable: true, description: "Estado de la marca." })
  ESTADO?: string;

  @Field({ nullable: true, description: "Código de la empresa." })
  ID_EMPRESA?: string;

  @Field({ nullable: true, description: "Descripción de la marca." })
  DESCRIPCION?: string;
}

@InputType()
export class VehiculoGarantiaInput {
  @Field({ nullable: true, description: "Código de la empresa." })
  ID_EMPRESA?: string = "3";

  @Field({ nullable: false, description: "Código del chasis del vehículo." })
  CHASIS: string;
}

@InputType({ description: "" })
export class ModelosInput {
  @Field({ nullable: true })
  ID_MARCA?: string;

  @Field({ nullable: true })
  MARCA?: MarcasInput;

  @Field({ nullable: true })
  ID_MODELO?: string;

  @Field({ nullable: true })
  ESTADO?: string;

  @Field({ nullable: true })
  ID_EMPRESA?: string;
}

@InputType({ description: "" })
export class EstilosInput {
  @Field({ nullable: true })
  ID_MARCA?: string;

  @Field({ nullable: true })
  ID_MODELO?: string;

  @Field({ nullable: true })
  ID_ESTILO?: string;

  @Field({ nullable: true })
  ESTADO?: string;

  @Field({ nullable: true })
  ID_EMPRESA?: string;

  @Field({ nullable: true })
  DESCRIPCION: string;
}

@InputType({ description: "" })
export class AccesoriosInput {
  @Field({ nullable: true })
  ID_EMPRESA?: string;

  @Field({ nullable: true })
  ID_VEHICULO?: string;

  @Field({ nullable: true })
  SECUENCIA_ENTRADA?: string;

  @Field({ nullable: true })
  CHASIS?: string;

  @Field({ nullable: true })
  ID_ACCESORIO?: string;

  @Field({ nullable: true })
  CANTIDAD?: string;

  @Field({ nullable: true })
  OBSERVACION?: string;

  @Field({ nullable: true })
  ESTADO?: string;

  @Field({ nullable: true })
  TIPO_ACCESORIO?: string;
}

@InputType({ description: "" })
export class VehiculoDocumentoInput {
  @Field()
  ID_EMPRESA?: string;

  @Field()
  ID_VEHICULO?: string;
}

@InputType({ description: "" })
export class VehiculoDocumentoInput2 {
  @Field()
  ID_EMPRESA?: string;

  @Field()
  ID_VEHICULO?: string;

  @Field()
  SECUENCIA?: number;

  @Field({ nullable: true })
  RUTA_DOCUMENTO?: string;

  @Field({ nullable: true })
  NOTA?: string;

  @Field({ nullable: true })
  ORDEN?: number;

  @Field({ nullable: true })
  CHASIS?: string;
}

@InputType({ description: "" })
export class VehiculoImgUploadInput {
  @Field({ nullable: true })
  DirName?: string;

  @Field({ nullable: true })
  FileName?: string;

  @Field()
  FileType: string;

  @Field()
  trasactionType: string;

  @Field()
  documentId: string;

  @Field()
  stringFile: string;

  @Field({ nullable: true })
  ID_VEHICULO?: string;

  @Field({ nullable: true })
  SECUENCIA?: number;

  @Field({ nullable: true })
  NOTA?: string;

  //TODO: agregar campo para manejo de imagenes
  //
}
@InputType({
  description: "Parámetros para crear y actualizar los vehículos favoritos.",
})
export class VehiculoFavoritoInput {
  // @Field(() => Int, { description: '' })
  // ID_USUARIO: number

  @Field()
  CHASIS: string;

  @Field({ defaultValue: "A", description: "" })
  @Length(1, 1)
  ESTADO: string = "A";
}

@ObjectType()
export class ModelosInventario {
  @Field({ nullable: true })
  ID_MODELO?: string;

  @Field({ nullable: true })
  DESCRIPCION?: string;

  @Field({ nullable: true })
  ID_MARCA?: string;

  @Field({ nullable: true })
  MARCA?: string;
}

@ObjectType({ description: "Modelo Marcas del inventario" })
export class MarcasInventario {
  @Field({ nullable: true })
  ID_MARCA: string;

  @Field({ nullable: true })
  DESCRIPCION: string;
}

@ObjectType()
export class PaginationLinks {
  @Field({ nullable: true })
  nextPage?: string;

  @Field({ nullable: true })
  previousPage?: string;
}

@ObjectType()
export class pagination {
  @Field({ nullable: true })
  currentPage?: number;

  @Field({ nullable: true })
  totalPages?: number;

  @Field({ nullable: true })
  totalRows?: number;

  @Field({ nullable: true })
  pageSize?: number;

  @Field({ nullable: true })
  count?: number;

  @Field(() => PaginationLinks)
  links?: PaginationLinks;
}

@ObjectType()
export class GARANTIA {
  @Field({ description: "Información de la grantía de un vehículo." })
  GARANTIA: string;
}

@ObjectType({ description: "Modelo Vista de Inventario" })
export class VInventario {
  @Field(() => [VehiculoInventario])
  Vehiculos: VehiculoInventario[];

  @Field(() => pagination)
  Meta?: pagination;
}

@ObjectType({ description: "Modelo Información del vehiculo." })
export class InfoVehiculoFinanciamiento {
  @Field({ nullable: true, description: "Información general del vehículo." })
  VEHICULO: string;

  @Field({ nullable: true, description: "Chasis del vehículo." })
  CHASIS: string;

  @Field({ nullable: true, description: "Id del vehículo." })
  ID_VEHICULO: string;

  @Field({ nullable: true, description: "Marca del vehículo." })
  MARCA: string;

  @Field({ nullable: true, description: "Modelo del vehículo." })
  MODELO: string;

  @Field({ nullable: true, description: "Estilo del vehículo." })
  ESTILO: string;

  @Field({ nullable: true, description: "Año del vehículo." })
  ANO: string;

  @Field({ nullable: true, description: "Moneda del precio." })
  ID_MONEDA: string;

  @Field({ nullable: true, description: "Precio del vehículo." })
  PRECIO_SALON_F: string;

  @Field({ nullable: true, description: "Color exterior del vehículo." })
  COLOR_EXTERIOR: string;

  @Field({ nullable: true, description: "Ubicación sucursal." })
  UBICACION: string;

  @Field({ nullable: true, description: "Condición del vehículo." })
  DESC_CONDICION: string;

  @Field({ nullable: true, description: "Imagen del vehículo." })
  RUTA_DOCUMENTO: string;
}

@InputType()
export class VehicleInput {
  @Field({ nullable: false, description: "Código del chasis del vehículo." })
  CHASIS: string;
}

@ObjectType({ description: "Detalles de un vehículo" })
export class VehicleDetail {
  @Field({ nullable: true, description: "Descripción del vehículo" })
  VEHICULO: string;

  @Field({ nullable: true })
  ANO: string;

  @Field({ nullable: true })
  COLOR: string;

  @Field({ nullable: true })
  TRACCION: string;

  @Field({ nullable: true })
  CANT_PUERTA: string;

  @Field({ nullable: true })
  PASAJEROS: string;

  @Field({ nullable: true })
  ASIENTOS: string;

  @Field({ nullable: true })
  MILLAJE: string;

  @Field({ nullable: true })
  COLOR_INTERIOR: string;

  @Field({ nullable: true })
  CILINDRAJE: string;

  @Field({ nullable: true })
  CILINDROS: string;

  @Field({ nullable: true })
  TRANSMISION: string;

  @Field({ nullable: true })
  COMBUSTIBLE: string;
}
