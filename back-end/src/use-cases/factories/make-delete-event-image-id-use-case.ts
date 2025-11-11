import { PrismaEventImagesRepository } from "@/repositories/prisma/prisma-event-images-repository"
import { DeleteEventImageByIdUseCase } from "../delete-event-image-by-id"


export function makeDeleteEventImageByIdUseCase() {
    const eventImageRepository = new PrismaEventImagesRepository()

    const deleteEventImageByidUseCase = new DeleteEventImageByIdUseCase(eventImageRepository)

    return deleteEventImageByidUseCase
}