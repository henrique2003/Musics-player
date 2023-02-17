import { badRequest, musicNotFoundMsg, ok, serverError, serverErrorMsg } from '../../helpers'
import { IResponseModel } from '../protocols'
import prismaClient from '../../prisma'

interface IFindMusicById {
  exec: (inputs: IInputs) => Promise<IResponseModel>
}

interface IInputs {
  id: string
}

class FindMusicById implements IFindMusicById {
  async exec({ id }: IInputs): Promise<IResponseModel> {
    try {
      const music = await prismaClient.musics.findUnique({
        where: {
          id
        }
      })

      if (!music) {
        return badRequest({ message: musicNotFoundMsg() })
      }

      return ok({ music })
    } catch (errror) {
      return serverError({ message: serverErrorMsg() })
    }
  }
}

export default FindMusicById
