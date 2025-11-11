import { EventsRepository } from "@/repositories/events-repository"
import { EventNotExistsError } from "./errors/event-not-exists-error"
import { EventFavoritesRepository } from "@/repositories/event-favorites-repository"


interface UnfavoriteEventUseCaseRequest {
    eventId: string
    userId: string
}

interface UnfavoriteEventUseCaseResponse {
    favorited: boolean
}

export class UnfavoriteEventUseCase {
    constructor(
        private eventFavoritesRepository: EventFavoritesRepository,
        private eventsRepository: EventsRepository
    ){}

    async execute({
        userId,
        eventId,
    }: UnfavoriteEventUseCaseRequest): Promise<UnfavoriteEventUseCaseResponse> {
        const eventExists = await this.eventsRepository.findById(eventId)

        if (!eventExists) {
            throw new EventNotExistsError()
        }

        await this.eventFavoritesRepository.delete(userId, eventId)

        return {
            favorited: false
        }
    }
}
