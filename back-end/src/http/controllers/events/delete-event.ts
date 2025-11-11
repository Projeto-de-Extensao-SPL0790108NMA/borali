import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteEventParams } from "./schema";
import { EventNotExistsError } from "@/use-cases/errors/event-not-exists-error";
import { makeDeleteEventUseCase } from "@/use-cases/factories/make-delete-event-use-case";


export async function deleteEvent(
  request: FastifyRequest<{
    Params: DeleteEventParams
  }>,
  reply: FastifyReply
) {
  const { eventId } = request.params

  try {
      const deleteEventUseCase = makeDeleteEventUseCase()

      await deleteEventUseCase.execute({ eventId })

      return reply.status(200).send()
  } catch (error) {
    if (error instanceof EventNotExistsError) {
        return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
