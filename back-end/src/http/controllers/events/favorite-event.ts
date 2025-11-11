import { FastifyReply, FastifyRequest } from 'fastify'
import { FavoriteEventParams } from './schema'
import { EventNotExistsError } from '@/use-cases/errors/event-not-exists-error'
import { makeFavoriteEventUseCase } from '@/use-cases/factories/make-favorite-event-use-case'
import { EventAlreadyFavorited } from '@/use-cases/errors/event-already-favorited-error'


export async function favoriteEvent(
    request: FastifyRequest<{ Params: FavoriteEventParams }>,
    reply: FastifyReply
) {
    const { eventId } = request.params

    try {
        const favoriteEventUseCase = makeFavoriteEventUseCase()

        await favoriteEventUseCase.execute({
            userId: request.user.sub,
            eventId
        })

        return reply.status(200).send()
    } catch (error) {
        if (error instanceof EventNotExistsError) {
            return reply.status(404).send({ message: error.message })
        }

        if (error instanceof EventAlreadyFavorited) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }
}
