import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetFavoritesUseCase } from '@/use-cases/factories/make-get-favorites-use-case'
import { GetFavoritesQuery } from './schema'

export async function getFavorites(
  request: FastifyRequest<{ Querystring: GetFavoritesQuery }>,
  reply: FastifyReply
) {
  try {
    const getFavoritesUseCase = makeGetFavoritesUseCase()

    const { events, pagination } = await getFavoritesUseCase.execute({
      userId: request.user.sub,
      page: Number(request.query.page),
      per_page: Number(request.query.per_page)
    })

    return reply.status(200).send({
      events,
      pagination
    })
  } catch (err) {
    throw err
  }
}
