import prismaClient from '../../prisma'
import { badRequest, musicNotFoundMsg, ok, serverError, serverErrorMsg } from '../../helpers'
import { IResponseModel } from '../protocols'

interface IEditMusic {
  exec: (input: IInputs) => Promise<IResponseModel>
}

interface IInputs {
  id: string
  data: {
    title: string
    link: string
  }
}

class EditMusic implements IEditMusic {
  async exec({ id, data }: IInputs): Promise<IResponseModel> {
    try {
      const music = await prismaClient.musics.update({
        where: {
          id
        },
        data
      })

      if (!music) {
        return badRequest({ message: musicNotFoundMsg() })
      }

      return ok({ music })
    } catch (error) {
      return serverError({ message: serverErrorMsg() })
    }
  }
}

export default EditMusic
