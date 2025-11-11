import { UpdateEventUseCase } from '../update-event'
import { PrismaEventsRepository } from "@/repositories/prisma/prisma-events-repository";

export function makeUpdateEventUseCase() {
  const eventsRepository = new PrismaEventsRepository()

  const updateEventUseCase = new UpdateEventUseCase(
    eventsRepository
  )

  return updateEventUseCase
}
