import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'
import { makeUpdateUserUseCase } from '@/use-cases/factories/make-update-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UpdateUserBody } from './schema'

export async function updateUser(
  request: FastifyRequest<{ Body: UpdateUserBody }>,
  reply: FastifyReply,
) {
  const { name, company } = request.body

  try {
    const updateUserUseCase = makeUpdateUserUseCase()

    const { user } = await updateUserUseCase.execute({
      userId: request.user.sub,
      name,
      company: company ?? undefined
    })

    return reply.status(200).send({
      ...user,
      password_hash: undefined,
    })
  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
