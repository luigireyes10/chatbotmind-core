import { createWriteStream } from 'fs'
import {
  FindConditions,
  FindManyOptions,
  getConnection,
  getRepository,
  ObjectType,
  QueryRunner,
  Repository,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { SessionData, Upload } from '../constants/types'
import { AuthorizationError } from '../helpers/apiErrors'
//import { UploadResponse } from '../http/typeDef/UploadResponseTypeDef'
import { convertValuesToNull } from './convertValuesToNull'
import { createDir, GetExtFile } from './funcFile'
import { deleteNullValues } from './deleteNullValues'
import { UploadResponse } from '../typeDef/UploadResponseTypeDef'
import { EmProductos } from '../resolvers/EmProductosResolver'
import { CreateUpdateProductosImageInput } from '../typeDef/ProductosInput'
import { Query } from 'type-graphql'
import { EmDocAdjImageProd } from '../entity/EmDocAdjImageProd'
import { WriteStream } from 'node:fs'
import { ProductoServicios } from '../entity/ProductoServicios'
import { convertJsonToUpperCase } from './convertJsonToUpperCase'

/**
 *
 * @param user
 * @param repository
 * @param condition
 * @param onErrorMessage
 * @returns
 */
export const defaultQuery = async <Type>(
  user: SessionData,
  repository: Repository<Type>,
  condition: FindManyOptions<Type> | FindConditions<Type> | unknown,
  onErrorMessage: string
): Promise<Type[] | Error> => {
  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }

    const entityResult = await repository.find(condition)

    return entityResult
  } catch (e) {
    console.log(`Error al consultar ${e}`)
    return Error(onErrorMessage)
  }
}

export const defaultTransactionQuery = async <Type>(
  user: SessionData,
  entity: ObjectType<Type>,
  condition: FindManyOptions<Type> | FindConditions<Type> | unknown,
  queryRunnerInstance: QueryRunner,
  onErrorMessage: string
): Promise<Type[] | Error> => {
  const queryRunner = await initQueryRunner(queryRunnerInstance)
  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }

    const entityResult = await queryRunner.manager.find(entity, condition)

    if (!queryRunnerInstance) {
      await queryRunner.commitTransaction()
    }

    return entityResult as never
  } catch (e) {
    if (!queryRunnerInstance) {
      await queryRunner.rollbackTransaction()
    }
    console.log(`Error al consultar ${e}`)
    return Error(onErrorMessage)
  } finally {
    if (!queryRunnerInstance) {
      await queryRunner.release()
    }
  }
}

/**
 *
 * @param user
 * @param repository
 * @param entity
 * @param onErrorMessage
 * @returns
 */
export const defaultInsert = async <Type>(
  user: SessionData,
  repository: Repository<Type>,
  entity: QueryDeepPartialEntity<Type>,
  onErrorMessage: string
): Promise<Type[] | Error> => {
  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }

    const entityInserted = await repository.insert({
      ...entity,
      FECHA_INSERCION: new Date(),
      USUARIO_INSERCION: user.username,
    })

    const result = await repository.find(entityInserted.identifiers[0])

    return result
  } catch (e) {
    console.log(`${e}`)
    return Error(onErrorMessage)
  }
}

/**
 *
 * @param user
 * @param repository
 * @param entity
 * @param updateConditions
 * @param onErrorMessage
 * @returns
 */
export const defaultUpdate = async <Type>(
  user: SessionData,
  repository: Repository<Type>,
  entity: QueryDeepPartialEntity<Type>,
  updateConditions: FindConditions<Type>,
  onErrorMessage: string
): Promise<Type[] | Error> => {
  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }

    const entityUpdated = await repository.update(updateConditions, {
      ...entity,
      FECHA_ACTUALIZACION: new Date(),
      USUARIO_ACTUALIZACION: user.username,
    })

    if (!entityUpdated.raw) {
      return Error(onErrorMessage)
    }

    const result = await repository.find(updateConditions)

    return result
  } catch (e) {
    console.log(`${e}`)
    return Error(onErrorMessage)
  }
}

/**
 *
 * @param user
 * @param queryRunner
 * @param data
 * @param entity
 * @param onErrorMessage
 * @returns
 */
export const defaultTransactionInsert = async <Type>(
  user: SessionData,
  queryRunnerInstance: QueryRunner,
  data: QueryDeepPartialEntity<Type>,
  entity: ObjectType<Type>,
  onErrorMessage: string
): Promise<Type[] | Error> => {
  const queryRunner = await initQueryRunner(queryRunnerInstance)

  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }

    const entityInserted = await queryRunner.manager.insert(entity, {
      ESTADO: 'A',
      ...data,
      FECHA_INSERCION: new Date(),
      USUARIO_INSERCION: user.username,
    })

    const result = await queryRunner.manager.find(
      entity,
      entityInserted.identifiers[0]
    )

    if (queryRunnerInstance) {
      await queryRunner.commitTransaction()
    }

    return result as never
  } catch (e) {
    if (!queryRunnerInstance) {
      await queryRunner.rollbackTransaction()
    }
    console.log(`${onErrorMessage} - ${e}`)
    return Error(e.message)
  } finally {
    if (!queryRunnerInstance) {
      await queryRunner.release()
    }
  }
}
export const defaultTransactionInsertProduct = async <Type>(
  user: SessionData,
  queryRunnerInstance: QueryRunner,
  data: QueryDeepPartialEntity<Type> & { DEFAULT_RUTA_DOC?: string }, // Extend the type here
  entity: ObjectType<Type>,
  onErrorMessage: string
): Promise<Type[] | ProductoServicios[] | Error> => {
  const queryRunner = await initQueryRunner(queryRunnerInstance)

  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }

    const entityInserted = await queryRunner.manager.insert(entity, {
      ESTADO: 'A',
      ...data,
      FECHA_INSERCION: new Date(),
      USUARIO_INSERCION: user.username,
      DEFAULT_RUTA_DOC: data.DEFAULT_RUTA_DOC, // TypeScript now knows data may have DEFAULT_RUTA_DOC
    })

    const result = await queryRunner.manager.find(ProductoServicios, {
      DEFAULT_RUTA_DOC: data.DEFAULT_RUTA_DOC,
    })

    if (queryRunnerInstance) {
      await queryRunner.commitTransaction()
    }

    return result
  } catch (e) {
    if (!queryRunnerInstance) {
      await queryRunner.rollbackTransaction()
    }
    console.log(`${onErrorMessage} - ${e}`)
    return Error(e.message)
  } finally {
    if (!queryRunnerInstance) {
      await queryRunner.release()
    }
  }
}

/**
 *
 * @param user
 * @param queryRunner
 * @param data
 * @param updateConditions
 * @param entity
 * @param onErrorMessage
 * @returns Type
 */
export const defaultTransactionUpdate = async <Type>(
  user: SessionData,
  queryRunnerInstance: QueryRunner,
  data: QueryDeepPartialEntity<Type>,
  updateConditions: FindConditions<Type>,
  entity: ObjectType<Type>,
  onErrorMessage: string
): Promise<Type[] | Error> => {
  const queryRunner = await initQueryRunner(queryRunnerInstance)

  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }

    const condition = deleteNullValues({ ...updateConditions })

    const entityUpdated = await queryRunner.manager.update(entity, condition, {
      ...data,
      FECHA_ACTUALIZACION: new Date(),
      USUARIO_ACTUALIZACION: user.username,
    })

    if (!entityUpdated.raw) {
      return Error(onErrorMessage)
    }

    const result = await queryRunner.manager.find(entity, condition)

    if (queryRunnerInstance) {
      await queryRunner.commitTransaction()
    }

    return result
  } catch (e) {
    if (!queryRunnerInstance) {
      await queryRunner.rollbackTransaction()
    }
    console.log(`${onErrorMessage} - ${e}`)
    return Error(e.message)
  } finally {
    if (!queryRunnerInstance) {
      await queryRunner.release()
    }
  }
}

/**
 *
 * @param user
 * @param queryRunner
 * @param data
 * @param updateConditions
 * @param entity
 * @param onErrorMessage
 * @returns Type
 */
export const defaultTransactionUpsert = async <Type, QueryType>(
  user: SessionData,
  queryRunnerInstance: QueryRunner,
  queryFunction: (
    queryParameters: QueryType,
    user: SessionData,
    queryRunnerInstance: QueryRunner
  ) => Promise<Type[] | Error>,
  data: QueryDeepPartialEntity<Type>,
  queryCondition: QueryType,
  entityType: ObjectType<Type>,
  onErrorMessage: string
): Promise<Type[] | Error> => {
  let queryRunner: QueryRunner
  if (!queryRunnerInstance) {
    const connection = getConnection()
    queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
  } else {
    queryRunner = queryRunnerInstance
  }

  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }

    const { businessId: ID_EMPRESA } = user

    const entitySearched = await queryFunction(
      convertValuesToNull<QueryType>({ ID_EMPRESA, ...queryCondition }),
      user,
      queryRunner
    )

    if (entitySearched instanceof Error) {
      return Error(entitySearched.message)
    }
    let result: Type[] | Error = []

    if (entitySearched?.length) {
      result = await defaultTransactionUpdate<Type>(
        user,
        queryRunner,
        data,
        { ID_EMPRESA, ...queryCondition },
        entityType,
        onErrorMessage
      )
    } else {
      console.log('Insertando', data)

      result = await defaultTransactionInsert<Type>(
        user,
        queryRunner,
        { ID_EMPRESA, ...data },
        entityType,
        onErrorMessage
      )
    }

    if (result instanceof Error) {
      return Error(result.message)
    }

    if (!queryRunnerInstance) {
      await queryRunner.commitTransaction()
    }

    return result
  } catch (e) {
    if (!queryRunnerInstance) {
      await queryRunner.rollbackTransaction()
    }
    console.log(`${onErrorMessage} - ${e}`)
    return Error(e.message)
  } finally {
    if (!queryRunnerInstance) {
      await queryRunner.release()
    }
  }
}

/**
 *
 * @param user
 * @param data
 * @param UploadFiles
 * @param entity
 * @param onErrorMessage
 * @returns
 */
let FOTO_CLASIF
export const defaultTransactionUpload = async <createType, promiseType>(
  user: SessionData,
  identifier: string,
  routeName: string,
  createFunction: (
    createParameters: createType,
    user: SessionData,
    queryRunnerInstance?: QueryRunner
  ) => Promise<promiseType | Error>,
  files: [Upload] | Promise<Upload>[],
  mutationCondition: createType,
  errorIdentifier: string,
  queryRunnerInstance?: QueryRunner
): Promise<UploadResponse[] | Error> => {
  let queryRunner: QueryRunner
  if (!queryRunnerInstance) {
    const connection = getConnection()
    queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
  } else {
    queryRunner = queryRunnerInstance
  }

  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }
    const result: UploadResponse[] = []

    let dataDocumento
    let mutatation = mutationCondition as any
    let mutationCount = mutationCondition as any

    let dataDocumento1 = {}
    let dataDocumento2 = {}

    for await (const file of files as any) {
      const codRandom = new Date().getTime()

      let prueba = file?.file.filename

      const extension = GetExtFile(prueba)
      const newFileName = `${identifier}-${codRandom}.${extension}`
      const ruta = `${routeName}/${newFileName}`

      let _path = `Assets/${routeName}/${newFileName}`
      let folder = `Assets/${routeName}`

      if (routeName.includes(process.env.PATH_SERVER_NAS3_VEGAMOVIL) === true) {
        _path = `${routeName}/${newFileName}`
        folder = `${routeName}`
      }

      createDir(folder)
      let insertResult: boolean | Error

      try {
        insertResult = await new Promise((resolve, reject) =>
          file?.file
            .createReadStream()
            .pipe(createWriteStream(_path))
            .on('finish', async () => {
              //   let dataDocumento
              //   let mutatation = mutationCondition as any

              if (mutationCount.COUNTER === '1') {
                FOTO_CLASIF = ruta
              } else {
                dataDocumento2 = {
                  FOTO_CLASIF: FOTO_CLASIF,
                  ICONO_CLASIF: ruta,
                }
              }

              if (mutationCount.COUNTER === '2') {
                const dataDocumentoSave = {
                  ...mutationCondition,
                  ...dataDocumento1,
                  ...dataDocumento2,
                }

                const inserted = await createFunction(
                  <createType>dataDocumentoSave,
                  user,
                  queryRunner
                )

                if (inserted instanceof Error) {
                  reject(inserted)
                }
              }

              // const dataDocumento = {
              //   ...mutationCondition,
              //   FOTO_CLASIF: ruta,
              //   ICONO_CLASIF: ruta,

              // }

              //   console.log(dataDocumento);

              // const inserted = await createFunction(
              //   <createType>dataDocumento,
              //   user,
              //   queryRunner
              // )

              // if (inserted instanceof Error) {
              //   reject(inserted)
              // }
              resolve(true)
            })
            .on('error', (e) => {
              reject(Error(e.message))
            })
        )
      } catch (error) {
        console.log(error)

        insertResult = Error(error.message)
      }

      result.push(<UploadResponse>{
        fileName: file.file.filename,
        inserted: !(insertResult instanceof Error),
        message: insertResult instanceof Error ? insertResult.message : 'Esooo',
      })
    }

    // console.log(dataDocumento);

    //  dataDocumento = {
    //   ...mutationCondition,
    //   FOTO_CLASIF: ruta,
    //   ICONO_CLASIF: ruta,

    // }

    // const inserted = await createFunction(
    //   <createType>dataDocumento,
    //   user,
    //   queryRunner
    // )

    return result
  } catch (e) {
    console.log(`Error en el mutation ${errorIdentifier} ${e}`)
    return Error('Error al subir archivos')
  }
}

export const defaultTransactionUploadPostPerfil = async <
  createType,
  promiseType
>(
  user: SessionData,
  identifier: string,
  routeName: string,
  createFunction: (
    createParameters: createType,
    user: SessionData,
    queryRunnerInstance?: QueryRunner
  ) => Promise<promiseType | Error>,
  files: [Upload] | Promise<Upload>[],
  mutationCondition: createType,
  errorIdentifier: string,
  queryRunnerInstance?: QueryRunner
): Promise<UploadResponse[] | Error> => {
  let queryRunner: QueryRunner
  if (!queryRunnerInstance) {
    const connection = getConnection()
    queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
  } else {
    queryRunner = queryRunnerInstance
  }

  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }
    const result: UploadResponse[] = []

    let dataDocumento
    let mutatation = mutationCondition as any
    let mutationCount = mutationCondition as any

    let dataDocumento1 = {}
    let dataDocumento2 = {}

    for await (const file of files as any) {
      const codRandom = new Date().getTime()

      let prueba = file?.file.filename

      const extension = GetExtFile(prueba)
      const newFileName = `${identifier}-${codRandom}.${extension}`
      const ruta = `${routeName}/${newFileName}`

      let _path = `Assets/${routeName}/${newFileName}`
      let folder = `Assets/${routeName}`

      if (routeName.includes(process.env.PATH_SERVER_NAS3_VEGAMOVIL) === true) {
        _path = `${routeName}/${newFileName}`
        folder = `${routeName}`
      }

      createDir(folder)
      let insertResult: boolean | Error

      try {
        insertResult = await new Promise((resolve, reject) =>
          file?.file
            .createReadStream()
            .pipe(createWriteStream(_path))
            .on('finish', async () => {
              //   let dataDocumento
              //   let mutatation = mutationCondition as any

              if (mutationCount.COUNTER === '1') {
                FOTO_CLASIF = ruta
              } else {
                dataDocumento2 = {
                  FOTO_CLASIF: FOTO_CLASIF,
                  ICONO_CLASIF: ruta,
                }
              }

              if (mutationCount.COUNTER === '2') {
                const dataDocumentoSave = {
                  ...mutationCondition,
                  ...dataDocumento1,
                  ...dataDocumento2,
                }

                const inserted = await createFunction(
                  <createType>dataDocumentoSave,
                  user,
                  queryRunner
                )

                if (inserted instanceof Error) {
                  reject(inserted)
                }
              }

              // const dataDocumento = {
              //   ...mutationCondition,
              //   FOTO_CLASIF: ruta,
              //   ICONO_CLASIF: ruta,

              // }

              //   console.log(dataDocumento);

              // const inserted = await createFunction(
              //   <createType>dataDocumento,
              //   user,
              //   queryRunner
              // )

              // if (inserted instanceof Error) {
              //   reject(inserted)
              // }
              resolve(true)
            })
            .on('error', (e) => {
              reject(Error(e.message))
            })
        )
      } catch (error) {
        console.log(error)

        insertResult = Error(error.message)
      }

      result.push(<UploadResponse>{
        fileName: file.file.filename,
        inserted: !(insertResult instanceof Error),
        message: insertResult instanceof Error ? insertResult.message : 'Esooo',
      })
    }

    // console.log(dataDocumento);

    //  dataDocumento = {
    //   ...mutationCondition,
    //   FOTO_CLASIF: ruta,
    //   ICONO_CLASIF: ruta,

    // }

    // const inserted = await createFunction(
    //   <createType>dataDocumento,
    //   user,
    //   queryRunner
    // )

    return result
  } catch (e) {
    console.log(`Error en el mutation ${errorIdentifier} ${e}`)
    return Error('Error al subir archivos')
  }
}

let DEFAULT_RUTA_DOC: string | undefined
let inserted: any
let dataDocumentoSave: any
let ICONO_PRODUCTO: string | undefined

export const defaultTransactionUploadProducto = async <createType, promiseType>(
  user: SessionData,
  identifier: string,
  routeName: string,
  createFunction: (
    createParameters: createType,
    user: SessionData,
    queryRunnerInstance?: QueryRunner
  ) => Promise<promiseType | Error>,
  files: [Upload] | Promise<Upload>[],
  mutationCondition: createType,
  errorIdentifier: string,
  queryRunnerInstance?: QueryRunner
): Promise<UploadResponse[] | Error> => {
  let queryRunner: QueryRunner
  if (!queryRunnerInstance) {
    const connection = getConnection()
    queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
  } else {
    queryRunner = queryRunnerInstance
  }

  try {
    if (!user) {
      throw new Error(AuthorizationError.message)
    }

    const result: UploadResponse[] = []
    let dataDocumento1: Record<string, any> = {}
    let dataDocumento2: Record<string, any> = {}
    let dataDocumento: any
    const mutation = mutationCondition as any
    const mutationCount = mutationCondition as any

    let returnDataID: any
    for await (const file of files as any) {
      const codRandom = new Date().getTime()
      const prueba = file?.file.filename
      const extension = GetExtFile(prueba)
      const newFileName = `${identifier}-${codRandom}.${extension}`
      let ruta = `${routeName}/${newFileName}`
      let _path = `Assets/${ruta}`
      let folder = `Assets/${routeName}`

      if (routeName.includes(process.env.PATH_SERVER_NAS3_VEGAMOVIL)) {
        _path = `${routeName}/${newFileName}`
        folder = routeName
      }

      createDir(folder)
      let insertResult: boolean | Error

      try {
        insertResult = await new Promise((resolve, reject) =>
          file?.file
            .createReadStream()
            .pipe(createWriteStream(_path))
            .on('finish', async () => resolve(true))
            .on('error', (e) => reject(new Error(e.message)))
        )

        if (mutationCount.COUNTER === '1') {
          inserted = await createFunction(
            <createType>dataDocumentoSave,
            user,
            queryRunner
          )
        }
        if (mutationCount.TIPO_DOC === 'IMG') {
          dataDocumento1 = { DEFAULT_RUTA_DOC: ruta }
        }

        if (mutationCount.TIPO_DOC === 'ICON') {
          dataDocumento2 = { ICONO_PRODUCTO: ruta }
        }

        if (mutationCount.COUNTER === '1') {
          DEFAULT_RUTA_DOC = ruta
        }

        if (mutationCount.TIPO_DOC === 'ICON') {
          dataDocumentoSave = {
            DEFAULT_RUTA_DOC: DEFAULT_RUTA_DOC,
            ICONO_PRODUCTO: ruta,
          }
          const insertData: any = inserted[0]?.ID_PRODUCTO
          const Result = await defaultTransactionUpdate<ProductoServicios>(
            user,
            queryRunner,
            convertJsonToUpperCase(dataDocumentoSave),
            {
              ID_EMPRESA: mutationCount.ID_EMPRESA,
              ID_PRODUCTO: insertData,
            },
            ProductoServicios,
            'Error al actualizar Documentos Abjuntos Detalles'
          )

          console.log(Result)
        }

        if (inserted?.length > 0 && !(inserted instanceof Error)) {
          const insertData: any = inserted[0]?.ID_PRODUCTO

          if (mutationCount.TIPO_DOC === 'IMG') {
            await new EmProductos().UpsertUpdateCreateProductoImg(
              <CreateUpdateProductosImageInput>{
                ID_EMPRESA: mutationCount.ID_EMPRESA,
                ID_PRODUCTO: insertData,
                ESTADO: mutationCount.ESTADO,
                RUTA_DOCUMENTO: ruta,
              },
              user,
              queryRunner
            )
          }
        }
      } catch (error) {
        console.log(error)
        insertResult = new Error(error.message)
      }

      result.push({
        fileName: file.file.filename,
        inserted: !(insertResult instanceof Error),
        message: insertResult instanceof Error ? insertResult.message : 'Esooo',
      })
    }

    return result
  } catch (e) {
    console.log(`Error en el mutation ${errorIdentifier}: ${e.message}`)
    return new Error('Error al subir archivos')
  } finally {
    if (!queryRunnerInstance) {
      await queryRunner.release()
    }
  }
}

export const defaultTransactionUploadGeneral = async <createType, promiseType>(
  user: SessionData,
  identifier: string,
  routeName: string,
  createFunction: (
    createParameters: createType,
    user: SessionData,
    queryRunnerInstance?: QueryRunner
  ) => Promise<promiseType | Error>,
  files: [Upload] | Promise<Upload>[],
  mutationCondition: createType,
  errorIdentifier: string,
  queryRunnerInstance?: QueryRunner
): Promise<UploadResponse[] | Error> => {
  let queryRunner: QueryRunner
  if (!queryRunnerInstance) {
    const connection = getConnection()
    queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
  } else {
    queryRunner = queryRunnerInstance
  }

  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }
    const result: UploadResponse[] = []

    let dataDocumento
    let mutatation = mutationCondition as any
    let mutationCount = mutationCondition as any

    let dataDocumento1 = {}
    let dataDocumento2 = {}

    for await (const file of files as any) {
      const codRandom = new Date().getTime()

      let prueba = file?.file.filename

      const extension = GetExtFile(prueba)
      const newFileName = `${identifier}-${codRandom}.${extension}`
      const ruta = `${routeName}/${newFileName}`

      let _path = `Assets/${routeName}/${newFileName}`
      let folder = `Assets/${routeName}`

      if (routeName.includes(process.env.PATH_SERVER_NAS3_VEGAMOVIL) === true) {
        _path = `${routeName}/${newFileName}`
        folder = `${routeName}`
      }

      createDir(folder)
      let insertResult: boolean | Error

      try {
        insertResult = await new Promise((resolve, reject) =>
          file?.file
            .createReadStream()
            .pipe(createWriteStream(_path))
            .on('finish', async () => {
              //   let dataDocumento
              //   let mutatation = mutationCondition as any

              const dataDocumentoSave = {
                ...mutationCondition,
                FOTO_PROMOCIONAL: ruta,
              }

              const inserted = await createFunction(
                <createType>dataDocumentoSave,
                user,
                queryRunner
              )

              if (inserted instanceof Error) {
                reject(inserted)
              }

              // const dataDocumento = {
              //   ...mutationCondition,
              //   FOTO_CLASIF: ruta,
              //   ICONO_CLASIF: ruta,

              // }

              //   console.log(dataDocumento);

              // const inserted = await createFunction(
              //   <createType>dataDocumento,
              //   user,
              //   queryRunner
              // )

              // if (inserted instanceof Error) {
              //   reject(inserted)
              // }
              resolve(true)
            })
            .on('error', (e) => {
              reject(Error(e.message))
            })
        )
      } catch (error) {
        console.log(error)

        insertResult = Error(error.message)
      }

      result.push(<UploadResponse>{
        fileName: file.file.filename,
        inserted: !(insertResult instanceof Error),
        message: insertResult instanceof Error ? insertResult.message : 'Esooo',
      })
    }

    // console.log(dataDocumento);

    //  dataDocumento = {
    //   ...mutationCondition,
    //   FOTO_CLASIF: ruta,
    //   ICONO_CLASIF: ruta,

    // }

    // const inserted = await createFunction(
    //   <createType>dataDocumento,
    //   user,
    //   queryRunner
    // )

    return result
  } catch (e) {
    console.log(`Error en el mutation ${errorIdentifier} ${e}`)
    return Error('Error al subir archivos')
  }
}

export const defaultFileUpload = async (
  user: SessionData,
  identifier: string,
  routeName: string,
  files: [Upload] | Promise<Upload>[],
  errorIdentifier: string,
  queryRunnerInstance?: QueryRunner
): Promise<UploadResponse[] | Error> => {
  let queryRunner: QueryRunner
  if (!queryRunnerInstance) {
    const connection = getConnection()
    queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
  } else {
    queryRunner = queryRunnerInstance
  }

  try {
    if (!user) {
      return Error(AuthorizationError.message)
    }
    const result: UploadResponse[] = []
    for await (const file of files) {
      const codRandom = new Date().getTime()
      const extension = GetExtFile(file.filename)
      const newFileName = `${identifier}-${codRandom}.${extension}`
      const ruta = `${routeName}/${newFileName}`
      let _path = `${process.env.PATH_SERVER_NAS3_VEGAMOVIL}/${routeName}/${newFileName}`
      let folder = `${process.env.PATH_SERVER_NAS3_VEGAMOVIL}/${routeName}`

      if (routeName.includes(process.env.PATH_SERVER_NAS3_VEGAMOVIL) === true) {
        _path = `${routeName}/${newFileName}`
        folder = `${routeName}`
      }

      createDir(folder)
      let insertResult: boolean | Error
      try {
        insertResult = await new Promise((resolve, reject) =>
          file
            .createReadStream()
            .pipe(createWriteStream(_path))
            .on('finish', async () => {
              // aqui se resuelve el termino de la creacion del archivo
              resolve(true)
            })
            .on('error', (e) => {
              reject(Error(e.message))
            })
        )
      } catch (error) {
        insertResult = Error(error.message)
      }

      result.push(<UploadResponse>{
        fileName: file.filename,
        inserted: !(insertResult instanceof Error),
        message: insertResult instanceof Error ? insertResult.message : 'Esooo',
      })
    }
    return result
  } catch (e) {
    console.log(`Error en el mutation ${errorIdentifier} ${e}`)
    return Error('Error al subir archivos')
  }
}

export const initQueryRunner = async (
  queryRunnerInstance: QueryRunner
): Promise<QueryRunner> => {
  let queryRunner: QueryRunner
  if (!queryRunnerInstance) {
    const connection = getConnection()
    queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
  } else {
    queryRunner = queryRunnerInstance
  }
  return queryRunner
}
function pipe(arg0: WriteStream): string {
  throw new Error('Function not implemented.')
}
