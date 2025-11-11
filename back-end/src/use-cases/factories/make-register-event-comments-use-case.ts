import { PrismaEventCommentsRepository } from "@/repositories/prisma/prisma-event-comments-repository";
import { PrismaEventsRepository } from "@/repositories/prisma/prisma-events-repository";
import { RegisterCompanyUseCase } from "../register-company";
import { RegisterEventCommentsUseCase } from "../register-event-comments";

export function makeRegisterEventCommentsUseCase() {
    const eventCommentsRepository = new PrismaEventCommentsRepository()
    const eventsRepository = new PrismaEventsRepository()

    const registerEventCommentsUseCase = new RegisterEventCommentsUseCase(
        eventCommentsRepository, eventsRepository
    )
    
    return registerEventCommentsUseCase
}