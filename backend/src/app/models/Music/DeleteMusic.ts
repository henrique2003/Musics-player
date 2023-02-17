import { noContent, serverError, serverErrorMsg } from '../../helpers'
import { IResponseModel } from '../protocols'
import prismaClient from '../../prisma'

interface IDeleteMusic {
  exec: (input: IInputs) => Promise<IResponseModel>
}

interface IInputs {
  id: string
}

class DeleteMusic implements IDeleteMusic {
  async exec({ id }: IInputs): Promise<IResponseModel> {
    try {
      await prismaClient.musics.delete({
        where: {
          id
        }
      })

      return noContent()
    } catch (errror) {
      return serverError({ message: serverErrorMsg() })
    }
  }
}

export default DeleteMusic
