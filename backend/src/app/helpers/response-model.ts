import { IResponseModel } from '../models/protocols'

export function badRequest({ message }: any): IResponseModel {
  return {
    statusCode: 400,
    data: { message }
  }
}

export function serverError({ message }: any): IResponseModel {
  return {
    statusCode: 500,
    data: { message }
  }
}

export function ok(data: any): IResponseModel {
  return {
    statusCode: 200,
    data
  }
}

export function noContent(): IResponseModel {
  return {
    statusCode: 204,
    data: {}
  }
}
