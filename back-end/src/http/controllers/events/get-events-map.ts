import { FastifyReply, FastifyRequest } from 'fastify'
import { GetEventsMapQuery } from './schema'
import { makeGetEventsMapUseCase } from '@/use-cases/factories/make-get-events-map-use-case'

export async function getEventsMap(
  request: FastifyRequest<{ Querystring: GetEventsMapQuery }>,
  reply: FastifyReply
) {
  try {
    const getEventsMapUseCase = makeGetEventsMapUseCase()

    const { events } = await getEventsMapUseCase.execute({
      title: request.query.title,
      address: request.query.address
    })

    return reply.status(200).send({ events })
  } catch (err) {
    throw err
  }
}
