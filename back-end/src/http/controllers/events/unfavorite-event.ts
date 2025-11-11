import { FastifyReply, FastifyRequest } from 'fastify'
import { UnfavoriteEventParams } from './schema'
import { EventNotExistsError } from '@/use-cases/errors/event-not-exists-error'
import { makeUnfavoriteEventUseCase } from '@/use-cases/factories/make-unfavorite-event-use-case'


export async function unfavoriteEvent(
    request: FastifyRequest<{ Params: UnfavoriteEventParams }>,
    reply: FastifyReply
) {
    const { eventId } = request.params

    try {
        const unfavoriteEventUseCase = makeUnfavoriteEventUseCase()

        await unfavoriteEventUseCase.execute({
            userId: request.user.sub,
            eventId
        })

        return reply.status(200).send()
    } catch (error) {
        if (error instanceof EventNotExistsError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}
