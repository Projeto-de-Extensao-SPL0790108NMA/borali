import { EventCommentsRepository } from "@/repositories/event-comments-repository"
import { EventsRepository } from "@/repositories/events-repository"
import { EventNotExistsError } from "./errors/event-not-exists-error"


interface RegisterEventCommentsUseCaseRequest {
    event_id: string
    user_id: string
    description: string
}

interface RegisterEventCommentsUseCaseResponse {
    comment: {
        id: string
        event_id: string
        user_id: string
        description: string
        created_at: Date
        updated_at: Date
    }
}

export class RegisterEventCommentsUseCase {
    constructor(
        private eventCommentsRepository: EventCommentsRepository,
        private eventsRepository: EventsRepository
    ) {}

    async execute(data: RegisterEventCommentsUseCaseRequest): Promise<RegisterEventCommentsUseCaseResponse> {
        const eventExists = await this.eventsRepository.findById(data.event_id)

        if (!eventExists) {
            throw new EventNotExistsError()
        }

        const comment = await this.eventCommentsRepository.create(data)

        return { comment }
    }
}