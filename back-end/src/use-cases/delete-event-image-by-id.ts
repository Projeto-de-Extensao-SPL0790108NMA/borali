import { EventImagesRepository } from "@/repositories/event-images-repository"
import { EventImageNotExistsError } from "./errors/event-image-not-exists"


interface DeleteEventImageByIdUseCaseRequest {
    eventImageId: string
}

export class DeleteEventImageByIdUseCase {
    constructor(
        private eventImageRepository: EventImagesRepository
    ){}

    async execute(data: DeleteEventImageByIdUseCaseRequest): Promise<void> {
        const eventImageExists = await this.eventImageRepository.findById(data.eventImageId)

        if (!eventImageExists) {
            throw new EventImageNotExistsError()
        }

        const updateEventImage = await this.eventImageRepository.delete(data.eventImageId)
    }
}