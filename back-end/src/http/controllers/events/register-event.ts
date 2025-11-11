import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterEventUseCase } from '@/use-cases/factories/make-register-event-use-case'
import { RegisterEventBody } from './schema'
import { CompanyNotExistsError } from '@/use-cases/errors/company-not-exists-error'

export async function registerEvent(
  request: FastifyRequest<{ Body: RegisterEventBody }>,
  reply: FastifyReply,
) {
  const { title, description, address, latitude, longitude, date, company_id } = request.body

  try {
    const registerEventUseCase = makeRegisterEventUseCase()

    const { event } = await registerEventUseCase.execute({
      title,
      description,
      address,
      latitude,
      longitude,
      date,
      company_id
    })

    return reply
      .status(201)
      .send({
        ...event,
        date: event.date.toISOString(),
        created_at: event.created_at.toISOString(),
        updated_at: event.updated_at.toISOString(),
      })
  } catch (err) {
    if (err instanceof CompanyNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
