import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteEventImagesByIdParams } from "./schema";
import { EventImageNotExistsError } from "@/use-cases/errors/event-image-not-exists";
import { makeDeleteEventImageByIdUseCase } from "@/use-cases/factories/make-delete-event-image-id-use-case";


export async function deleteEventImage(
    request: FastifyRequest<{
        Params: DeleteEventImagesByIdParams
    }>,
    reply: FastifyReply
) {
    const { eventImageId } = request.params

    try {
        const deleteEventImageByIdUseCase = makeDeleteEventImageByIdUseCase()

        await deleteEventImageByIdUseCase.execute({ eventImageId })

        return reply.status(200).send()
    } catch (error) {
        if (error instanceof EventImageNotExistsError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}