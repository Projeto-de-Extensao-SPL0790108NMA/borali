import { PrismaEventCommentsRepository } from "@/repositories/prisma/prisma-event-comments-repository";
import { PrismaEventsRepository } from "@/repositories/prisma/prisma-events-repository";
import { GetEventCommentsUseCase } from "../get-event-comments";


export function makeGetEventCommentsUseCase() {
    const eventsRepository = new PrismaEventsRepository()
    const eventCommentsRepository = new PrismaEventCommentsRepository()

    const getEventCommentsUseCase = new GetEventCommentsUseCase(eventsRepository, eventCommentsRepository)

    return getEventCommentsUseCase
}