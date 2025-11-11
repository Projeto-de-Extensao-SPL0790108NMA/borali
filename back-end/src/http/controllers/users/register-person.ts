import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterPersonUseCase } from '@/use-cases/factories/make-register-person-use-case'
import { RegisterPersonBody } from './schema'

export async function registerPerson(
  request: FastifyRequest<{ Body: RegisterPersonBody }>,
  reply: FastifyReply,
) {
  const { name, email, password } = request.body

  try {
    const registerPersonUseCase = makeRegisterPersonUseCase()

    await registerPersonUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
