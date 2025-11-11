import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdateEventUseCase } from '@/use-cases/factories/make-update-event-use-case'
import { UpdateEventBody, UpdateEventParams } from './schema'
import { EventNotExistsError } from '@/use-cases/errors/event-not-exists-error'

export async function updateEvent(
  request: FastifyRequest<{
    Body: UpdateEventBody,
    Params: UpdateEventParams
  }>,
  reply: FastifyReply,
) {
  const { eventId } = request.params
  const { title, description, address, latitude, longitude, date } = request.body

  try {
    const updateEventUseCase = makeUpdateEventUseCase()

    const { event } = await updateEventUseCase.execute({
      eventId,
      title,
      description,
      address,
      date,
      latitude,
      longitude,
    })

    return reply
      .status(200)
      .send(event)
  } catch (err) {
    if (err instanceof EventNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
