import { noContent, serverError, serverErrorMsg } from '../../helpers'
import { IResponseModel } from '../protocols'
import prismaClient from '../../prisma'

interface IDeleteAllMusic {
  exec: () => Promise<IResponseModel>
}

class DeleteAllMusic implements IDeleteAllMusic {
  async exec(): Promise<IResponseModel> {
    try {
      await prismaClient.musics.deleteMany()

      return noContent()
    } catch (errror) {
      return serverError({ message: serverErrorMsg() })
    }
  }
}

export default DeleteAllMusic
