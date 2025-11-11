import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { RegisterEventUseCase } from '../register-event'
import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-companies-repository'

export function makeRegisterEventUseCase() {
  const eventsRepository = new PrismaEventsRepository()
  const companiesRepository = new PrismaCompaniesRepository()

  const registerEventUseCase = new RegisterEventUseCase(
    eventsRepository,
    companiesRepository
  )

  return registerEventUseCase
}
