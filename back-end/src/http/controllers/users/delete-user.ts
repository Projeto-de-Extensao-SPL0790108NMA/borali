import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'
import { makeDeleteUserUseCase } from '@/use-cases/factories/makeDeleteUserUseCase' 
import { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const deleteUserUseCase = makeDeleteUserUseCase()

    await deleteUserUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof UserNotExistsError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}
