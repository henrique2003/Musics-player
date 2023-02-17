import { noContent, serverError, serverErrorMsg } from '../../helpers'
import prismaClient from '../../prisma'
import { IResponseModel } from '../protocols'

interface ICreateMusic {
  exec: (input: IInputs) => Promise<IResponseModel>
}

interface IInputs {
  title: string
  link: string
}

class CreateMusic implements ICreateMusic {
  async exec({ title, link }: IInputs): Promise<IResponseModel> {
    try {
      await prismaClient.musics.create({
        data: {
          link,
          title
        }
      })

      return noContent()
    } catch (error) {
      return serverError({ message: serverErrorMsg() })
    }
  }
}

export default CreateMusic
