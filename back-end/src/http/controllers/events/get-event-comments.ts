import { FastifyReply, FastifyRequest } from "fastify";
import { GetEventCommentsParams, GetEventCommentsQuery } from "./schema";
import { EventNotExistsError } from "@/use-cases/errors/event-not-exists-error";
import { makeGetEventCommentsUseCase } from "@/use-cases/factories/make-event-comments-use-case";


export async function getEventComments(
    request: FastifyRequest<{ Querystring: GetEventCommentsQuery, Params: GetEventCommentsParams }>,
    reply: FastifyReply
) {
    try {
        const getEventCommentsUseCase = makeGetEventCommentsUseCase()

        const { comments, pagination } = await getEventCommentsUseCase.execute({
            page: Number(request.query.page),
            per_page: Number(request.query.per_page),
            event_id: request.params.eventId
        })

        return reply.status(200).send({
            comments,
            pagination
        })
    } catch(err) {
        if (err instanceof EventNotExistsError) {
            return reply.status(404).send({ message: err.message })
        }

        throw err
    }
}