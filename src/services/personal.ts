import { getRepository, Repository, UpdateResult } from 'typeorm'
import { Personal } from '../entity/Personal'
import {
    ApiResponse,
    ConditionType,
    ParameterListDet,
    SessionData,
} from '../constants/types'
import { convertJsonToUpperCase } from '../helpers/convertJsonToUpperCase'
import { stringToBuffer } from '../helpers/convertStringImageToBuffer'
import { DataNotFoundError, DbInsertError, DbUpdateError, InvalidCredentialsError } from '../helpers/apiErrors'
import { generateToken, getSessionExpirationDate } from '../helpers/sesion'

export type LoginResult = {
    username: string
    businessId: string
    sessionCookie: {
        token: string
        expiration: string
    }
}

export type PersonalResult = Personal | Personal[] | Promise<UpdateResult>

export const getPersonalRepository = (): Repository<Personal> =>
    getRepository(Personal)

export const authUser = async (
    username: string,
    password: string
): Promise<LoginResult> => {
    console.log({
        username,
        password,
    })
    const personal = await getPersonalRepository()
        .createQueryBuilder()
        .where(
            'USUARIO = UPPER (:username) AND WEB_PASSWORD = PASSWORD_ENTRYPTOR (:password)',
            { username, password }
        ).getOne()

    console.log(personal)

    if (!personal) {
        throw InvalidCredentialsError
    }

    const userData = {
        username: personal.USUARIO,
        businessId: personal.ID_EMPRESA,
        idUsuario: 0,
        name: personal.NOMBRES + personal.APELLIDOS,
        phone: ''
    }

    return {
        username: personal.USUARIO,
        businessId: personal.ID_EMPRESA,
        sessionCookie: {
            token: generateToken(userData),
            expiration: getSessionExpirationDate(),
        },
    }
}

export const getAllUser = async (): Promise<ApiResponse<PersonalResult>> => {
    const userResult = await getPersonalRepository().find()

    if (!userResult) {
        throw DataNotFoundError
    }

    return {
        data: userResult,
    }
}

export const getOneUser = async (
    condition: ConditionType
): Promise<ApiResponse<PersonalResult>> => {
    const userResult = await getPersonalRepository().find(condition)

    if (!userResult) {
        throw DataNotFoundError
    }

    return {
        data: userResult,
    }
}

export const getOneUserOfficerData = async (
    condition: ConditionType
): Promise<ApiResponse<PersonalResult>> => {
    const userDataResult = await getPersonalRepository().find({
        select: [
            'ID_PERSONAL',
            'NOMBRES',
            'APELLIDOS',
            'TELEFONO',
            'ID_EMPLEADO',
            'DIRECCION_EMAIL',
            'USUARIO',
        ],
        where: condition,
        order: { NOMBRES: 'DESC' },
    })

    if (!userDataResult) {
        throw DataNotFoundError
    }

    return {
        data: userDataResult,
    }
}

export const getListUser = async (
    condition: ConditionType
): Promise<ApiResponse<ParameterListDet[]>> => {
    const userResult = await getPersonalRepository().find(condition)

    if (!userResult) {
        throw DataNotFoundError
    }

    const userList: ParameterListDet[] = []

    userResult.map((user) => {
        userList.push({
            desc: `${user.NOMBRES} ${user.APELLIDOS}`,
            value: user.ID_PERSONAL,
        })
    })

    return {
        data: userList,
    }
}

export const createUser = async (
    user: Personal,
    image: string,
    sessionInfo: SessionData
): Promise<ApiResponse<PersonalResult>> => {
    try {
        const userData = {
            ...user,
            FOTO: image ? stringToBuffer(image) : '',
            FECHA_INSERCION: new Date(),
            USUARIO_INSERCION: sessionInfo.username,
        }

        const data = await getPersonalRepository().insert(
            convertJsonToUpperCase(userData)
        )

        const [insertedUser] = await getPersonalRepository().find(
            data.identifiers[0]
        )

        return {
            message: 'Personal almacenado exitosamente.',
            data: insertedUser,
        }
    } catch (e) {
        throw DbInsertError(e.message)
    }
}

export const updateUser = async (
    user: Personal,
    sessionInfo: SessionData
): Promise<ApiResponse<PersonalResult>> => {
    const { ID_PERSONAL, USUARIO } = user

    const result = await getPersonalRepository().update(
        {
            ID_PERSONAL,
            USUARIO,
        },
        convertJsonToUpperCase({
            ...user,
            USUARIO_ACTUALIZACION: sessionInfo.username,
            FECHA_ACTUALIZACION: new Date(),
        })
    )

    if (!result.raw) {
        throw DbUpdateError('Error actualizando Personal')
    }

    const [updatedUser] = await getPersonalRepository().find({
        ID_PERSONAL,
        USUARIO,
    })

    return {
        message: 'Personal actualizado exitosamente.',
        data: updatedUser,
    }
}
