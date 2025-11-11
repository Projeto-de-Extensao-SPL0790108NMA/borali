import { FastifyReply, FastifyRequest } from 'fastify'
import { GetEventByIdParams } from './schema'
import { EventNotExistsError } from '@/use-cases/errors/event-not-exists-error'
import { makeGetEventByIdUseCase } from '@/use-cases/factories/make-get-event-id-use-case'

export async function getEventById(
  request: FastifyRequest<{ Params: GetEventByIdParams }>,
  reply: FastifyReply
) {
  try {
    const { eventId } = request.params

    const getEventByIdUseCase = makeGetEventByIdUseCase()

    const event = await getEventByIdUseCase.execute({
      eventId
    })

    return reply.status(200).send(event)
  } catch (err) {
    if (err instanceof EventNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
