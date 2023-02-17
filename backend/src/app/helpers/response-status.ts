import { Musics } from '@prisma/client'

import { FastifyReply } from 'fastify'

interface IReplyErrorData {
  res: FastifyReply
  message?: string
}

interface IReplySuccessData {
  res: FastifyReply
  data?: {
    music?: Musics
    musics?: Musics[]
  }
}

export const replyBadRequest = ({ res, message = '' }: IReplyErrorData): FastifyReply => {
  return res.status(400).send({ message })
}

export const replyServerError = ({ res, message = '' }: IReplyErrorData): FastifyReply => {
  return res.status(500).send({ message })
}

export const replyOk = ({ res, data }: IReplySuccessData): FastifyReply => {
  return res.status(200).send(data)
}

export const replyNoContent = ({ res }: IReplySuccessData): FastifyReply => {
  return res.status(204).send()
}
