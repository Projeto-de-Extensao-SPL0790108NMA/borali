import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserUseCase = makeGetUserUseCase()

  const { user } = await getUserUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    ...user,
    password_hash: undefined,
  })
}
