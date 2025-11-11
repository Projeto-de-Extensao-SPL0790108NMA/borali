import { PrismaEventsRepository } from "@/repositories/prisma/prisma-events-repository"
import { DeleteEventUseCase } from "../delete-event"

export function makeDeleteEventUseCase() {
  const eventsRepository = new PrismaEventsRepository()

  const deleteEventUseCase = new DeleteEventUseCase(eventsRepository)

  return deleteEventUseCase
}
