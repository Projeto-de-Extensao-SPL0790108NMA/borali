import { FastifyReply, FastifyRequest } from 'fastify'
import { GetEventsQuery } from './schema'
import { makeGetEventsUseCase } from '@/use-cases/factories/make-get-events-use-case'

export async function getEvents(
  request: FastifyRequest<{ Querystring: GetEventsQuery }>,
  reply: FastifyReply
) {
  try {
    const getEventsUseCase = makeGetEventsUseCase()

    const { events, pagination } = await getEventsUseCase.execute({
      page: Number(request.query.page),
      per_page: Number(request.query.per_page),
      title: request.query.title,
      date: request.query.date
    })

    return reply.status(200).send({
      events,
      pagination
    })
  } catch (err) {
    throw err
  }
}
