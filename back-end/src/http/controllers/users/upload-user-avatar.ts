import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUploadUserAvatarUseCase } from '@/use-cases/factories/make-upload-user-avatar-use-case'

export async function uploadUserAvatar(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const file = await request.file()
  if (!file) {
    return reply.status(400).send({ message: 'File not provided.' })
  }

  try {
    const uploadUserAvatarUseCase = makeUploadUserAvatarUseCase()

    const buffer = await file.toBuffer()

    const { user } = await uploadUserAvatarUseCase.execute({
      user_id: request.user.sub,
      file: {
        buffer,
        filename: file.filename,
      },
    })

    return reply.status(201).send(user)
  } catch (err) {
    throw err
  }
}
