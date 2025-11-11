import { EventsRepository } from "@/repositories/events-repository"
import { EventNotExistsError } from "./errors/event-not-exists-error"
import { EventFavoritesRepository } from "@/repositories/event-favorites-repository"
import { EventAlreadyFavorited } from "./errors/event-already-favorited-error"


interface FavoriteEventUseCaseRequest {
    eventId: string
    userId: string
}

interface FavoriteEventUseCaseResponse {
    favorited: boolean
}

export class FavoriteEventUseCase {
    constructor(
        private eventFavoritesRepository: EventFavoritesRepository,
        private eventsRepository: EventsRepository
    ){}

    async execute({
      userId,
      eventId,
    }: FavoriteEventUseCaseRequest): Promise<FavoriteEventUseCaseResponse> {
        const eventExists = await this.eventsRepository.findById(eventId)

        if (!eventExists) {
            throw new EventNotExistsError()
        }

        const eventFavoriteExists = await this.eventFavoritesRepository.findByEventIdAndUserId(eventId, userId)

        if (eventFavoriteExists) {
          throw new EventAlreadyFavorited()
        }

        await this.eventFavoritesRepository.create({
          user_id: userId,
          event_id: eventId,
        })

        return {
          favorited: true
        }
    }
}
