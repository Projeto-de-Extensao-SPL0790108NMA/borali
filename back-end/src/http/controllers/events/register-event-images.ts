import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterEventImagesUseCase } from '@/use-cases/factories/make-register-event-images-use-case'
import { EventNotExistsError } from '@/use-cases/errors/event-not-exists-error'

interface UploadEventImagesParams {
  eventId: string
}

export async function registerEventImages(
  request: FastifyRequest<{ Params: UploadEventImagesParams }>,
  reply: FastifyReply,
) {
  const { eventId } = request.params

  const files = await request.files()

  try {
    const registerEventImagesUseCase = makeRegisterEventImagesUseCase()

    const uploads = []

    for await (const file of files) {
      const buffer = await file.toBuffer()

      uploads.push({
        buffer,
        filename: file.filename,
      })
    }

    const { images } = await registerEventImagesUseCase.execute({
      event_id: eventId,
      files: uploads,
    })

    return reply.status(201).send({
      images: images.map((img) => ({
        ...img,
        created_at: img.created_at.toISOString(),
        updated_at: img.updated_at.toISOString(),
      })),
    })
  } catch (err) {
    if (err instanceof EventNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
