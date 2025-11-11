import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterCompanyUseCase } from '@/use-cases/factories/make-register-company-use-case'
import { RegisterCompanyBody } from './schema'

export async function registerCompany(
  request: FastifyRequest<{ Body: RegisterCompanyBody }>,
  reply: FastifyReply,
) {
  const { name, email, password, phone, address, description } = request.body

  try {
    const registerCompanyUseCase = makeRegisterCompanyUseCase()

    await registerCompanyUseCase.execute({
      name,
      email,
      password,
      phone,
      address,
      description,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
