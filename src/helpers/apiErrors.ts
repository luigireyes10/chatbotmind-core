import {
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_UNAUTHORIZED,
  } from '../constants/httpResponseCodes'
  import {
    DATA_NOT_FOUND_ERROR,
    DB_INSERT_ERROR,
    DB_UPDATE_ERROR,
    ENTITY_NOT_FOUND_ERROR,
    INVALID_CREDENTIALS_ERROR,
    PAYLOAD_VALIDATION_ERROR,
    UNEXPECTED_ERROR,
  } from '../constants/errorCodes'
  
  export class ApiError extends Error {
    status: number
    error: string
  
    constructor(
      status: number,
      message: string,
      error: string = UNEXPECTED_ERROR
    ) {
      super(message)
      this.status = status
      this.message = message
      this.error = error
    }
  }
  
  export const UnexpectedError = new ApiError(
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    'Unexpected Error Ocurred'
  )
  
  export const AuthorizationError = new ApiError(
    HTTP_STATUS_UNAUTHORIZED,
    'You are not authorized to use this resource'
  )
  
  export const InvalidCredentialsError = new ApiError(
    HTTP_STATUS_BAD_REQUEST,
    'Invalid username or password',
    INVALID_CREDENTIALS_ERROR
  )
  
  export const DbInsertError = (message: string): ApiError =>
    new ApiError(
      HTTP_STATUS_BAD_REQUEST,
      `Error inserting data into the database. ${message}`,
      DB_INSERT_ERROR
    )
  
  export const DbUpdateError = (id: string): ApiError =>
    new ApiError(
      HTTP_STATUS_BAD_REQUEST,
      `Error updating entry with id: ${id}`,
      DB_UPDATE_ERROR
    )
  
  export const PayloadValidationError = (message: string): ApiError =>
    new ApiError(HTTP_STATUS_BAD_REQUEST, message, PAYLOAD_VALIDATION_ERROR)
  
  export const EntityNotFoundError = (message: string): ApiError =>
    new ApiError(HTTP_STATUS_BAD_REQUEST, message, ENTITY_NOT_FOUND_ERROR)
  
  export const DataNotFoundError = new ApiError(
    HTTP_STATUS_BAD_REQUEST,
    'No data found in query.',
    DATA_NOT_FOUND_ERROR
  )
  