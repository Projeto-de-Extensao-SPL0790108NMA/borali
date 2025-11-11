import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUploadEventCoverImageUseCase } from '@/use-cases/factories/make-upload-event-cover-image-use-case'
import { EventNotExistsError } from '@/use-cases/errors/event-not-exists-error'
import { UploadEventCoverImageParams } from './schema'

export async function uploadEventCoverImage(
  request: FastifyRequest<{ Params: UploadEventCoverImageParams }>,
  reply: FastifyReply,
) {
  const { eventId } = request.params

  const file = await request.file()
  if (!file) {
    return reply.status(400).send({ message: 'File not provided.' })
  }

  try {
    const uploadEventCoverImageUseCase = makeUploadEventCoverImageUseCase()

    const buffer = await file.toBuffer()

    const { image } = await uploadEventCoverImageUseCase.execute({
      event_id: eventId,
      file: {
        buffer,
        filename: file.filename,
      },
    })

    return reply.status(201).send(image)
  } catch (err) {
    if (err instanceof EventNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
