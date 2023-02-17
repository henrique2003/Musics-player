import { FastifyReply, FastifyRequest } from 'fastify'

import { emptyFieldMsg, replyBadRequest, idNotFoundMsg, replyServerError, replyOk, musicNotFoundMsg, replyNoContent } from '../helpers'
import { validEmptyField } from '../utils/validEmptyField'
import { CreateMusic, DeleteAllMusic, DeleteMusic, EditMusic, FindMusicById, GetAllMusics } from '../models/Music'

interface IMusicBody {
  title: string
  link: string
}

interface IMusicParams {
  id: string
}

class MusicController {
  async store(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const { title, link } = req.body as IMusicBody

    if (!validEmptyField(title)) {
      return await replyBadRequest({ res, message: emptyFieldMsg('title') })
    }

    if (!validEmptyField(link)) {
      return await replyBadRequest({ res, message: emptyFieldMsg('link') })
    }

    const { statusCode, data } = await new CreateMusic().exec({ title, link })

    if (statusCode === 500) {
      return await replyBadRequest({ res, message: data.message })
    }

    return await replyNoContent({ res })
  }

  async findById(req: FastifyRequest<{ Params: IMusicParams }>, res: FastifyReply): Promise<FastifyReply> {
    const { id } = req.params

    if (!id) {
      return await replyBadRequest({ res, message: idNotFoundMsg() })
    }

    const { statusCode, data: { message, music } } = await new FindMusicById().exec({ id })

    if (statusCode === 400) {
      return await replyBadRequest({ res, message })
    }

    if (statusCode === 500) {
      return await replyServerError({ res, message })
    }

    return await replyOk({ res, data: { music } })
  }

  async edit(req: FastifyRequest<{ Params: IMusicParams }>, res: FastifyReply): Promise<FastifyReply> {
    const { link, title } = req.body as IMusicBody
    const { id } = req.params

    if (!id) {
      return await replyBadRequest({ res, message: idNotFoundMsg() })
    }

    const findMusic = await new FindMusicById().exec({ id })

    if (!findMusic.data.music) {
      return await replyBadRequest({ res, message: musicNotFoundMsg() })
    }

    const musicBody = {
      title: findMusic.data.music.title,
      link: findMusic.data.music.link
    }

    if (validEmptyField(title)) musicBody.title = title
    if (validEmptyField(link)) musicBody.link = link

    const { statusCode, data: { music, message } } = await new EditMusic().exec({ id, data: musicBody })

    if (statusCode === 400) {
      return await replyBadRequest({ res, message })
    }

    if (statusCode === 500) {
      return await replyServerError({ res, message })
    }

    return await replyOk({ res, data: { music } })
  }

  async getAll(_: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const { data } = await new GetAllMusics().exec()

    return await replyOk({ res, data })
  }

  async delete(req: FastifyRequest<{ Params: IMusicParams }>, res: FastifyReply): Promise<FastifyReply> {
    const { id } = req.params

    if (!id) {
      return await replyBadRequest({ res, message: idNotFoundMsg() })
    }

    const { statusCode, data } = await new DeleteMusic().exec({ id })

    if (statusCode === 500) {
      return await replyServerError({ res, message: data.message })
    }

    return await replyNoContent({ res })
  }

  async deleteAll(_: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const { statusCode, data } = await new DeleteAllMusic().exec()

    if (statusCode === 500) {
      return await replyServerError({ res, message: data.message })
    }

    return await replyNoContent({ res })
  }
}

export default new MusicController()
