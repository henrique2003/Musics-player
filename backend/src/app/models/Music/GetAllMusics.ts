import { ok, serverError, serverErrorMsg } from '../../helpers'
import { IResponseModel } from '../protocols'
import prismaClient from '../../prisma'

interface IGetAllMusics {
  exec: () => Promise<IResponseModel>
}

class GetAllMusics implements IGetAllMusics {
  async exec(): Promise<IResponseModel> {
    try {
      const musics = await prismaClient.musics.findMany()

      return ok({ musics })
    } catch (error) {
      return serverError({ message: serverErrorMsg() })
    }
  }
}

export default GetAllMusics
