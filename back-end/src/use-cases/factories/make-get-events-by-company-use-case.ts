import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-companies-repository'
import { GetEventsByCompanyUseCase } from '../get-events-by-company'

export function makeGetEventsByCompanyUseCase() {
  const eventsRepository = new PrismaEventsRepository()
  const companiesRepository = new PrismaCompaniesRepository()

  const getEventsByCompanyUseCase = new GetEventsByCompanyUseCase(
    eventsRepository,
    companiesRepository
  )

  return getEventsByCompanyUseCase
}
