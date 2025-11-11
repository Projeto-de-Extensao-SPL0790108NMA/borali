import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { GetEventsUseCase } from '../get-events'

export function makeGetEventsUseCase() {
  const eventsRepository = new PrismaEventsRepository()

  const getEventsUseCase = new GetEventsUseCase(eventsRepository)

  return getEventsUseCase
}
