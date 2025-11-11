import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterEventCommentsBody, RegisterEventCommentsParams, registerEventNotExistsResponseSchema } from "./schema";
import { EventNotExistsError } from "@/use-cases/errors/event-not-exists-error";
import { makeRegisterEventCommentsUseCase } from "@/use-cases/factories/make-register-event-comments-use-case";


export async function registerEventComments (
    request: FastifyRequest<{ Body: RegisterEventCommentsBody, Params: RegisterEventCommentsParams }>,
    reply: FastifyReply
) {
    const { description } = request.body
    const userId = request.user.sub
    const { eventId } = request.params

    try {
        const registerEventCommentsUseCase = makeRegisterEventCommentsUseCase()

        const {comment} = await registerEventCommentsUseCase.execute({
            user_id: userId,
            description: description,
            event_id: eventId
        })

        return reply.status(201)
            .send({
                ...comment,
                created_at: comment.created_at.toISOString(),
                updated_at: comment.updated_at.toISOString()
            })
    } catch (error) {
        if (error instanceof EventNotExistsError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}