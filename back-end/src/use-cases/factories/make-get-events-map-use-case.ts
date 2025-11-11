import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { GetEventsMapUseCase } from '../get-events-map'

export function makeGetEventsMapUseCase() {
  const eventsRepository = new PrismaEventsRepository()

  const getEventsMapUseCase = new GetEventsMapUseCase(eventsRepository)

  return getEventsMapUseCase
}
