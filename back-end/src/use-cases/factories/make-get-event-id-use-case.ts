import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { GetEventByIdUseCase } from '../get-event-by-id'

export function makeGetEventByIdUseCase() {
  const eventsRepository = new PrismaEventsRepository()

  const getEventByIdUseCase = new GetEventByIdUseCase(eventsRepository)

  return getEventByIdUseCase
}
