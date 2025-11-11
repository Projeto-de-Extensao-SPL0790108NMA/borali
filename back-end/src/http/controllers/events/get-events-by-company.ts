import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetEventsByCompanyUseCase } from '@/use-cases/factories/make-get-events-by-company-use-case'
import { GetEventsByCompanyParams, GetEventsByCompanyQuery } from './schema'
import { CompanyNotExistsError } from '@/use-cases/errors/company-not-exists-error'

export async function getEventsByCompany(
  request: FastifyRequest<{ Params: GetEventsByCompanyParams, Querystring: GetEventsByCompanyQuery }>,
  reply: FastifyReply
) {
  try {
    const getEventsByCompany = makeGetEventsByCompanyUseCase()

    const { events, pagination } = await getEventsByCompany.execute({
      companyId: request.params.companyId,
      page: Number(request.query.page),
      per_page: Number(request.query.per_page)
    })

    return reply.status(200).send({
      events,
      pagination
    })
  } catch (err) {
    if (err instanceof CompanyNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
