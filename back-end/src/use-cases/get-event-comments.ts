import { EventCommentsRepository } from "@/repositories/event-comments-repository"
import { EventsRepository } from "@/repositories/events-repository"
import { EventNotExistsError } from "./errors/event-not-exists-error"


interface User {
    id: string
    name: string
}

interface GetEventCommentsUseCaseRequest {
    page: number
    per_page: number
    event_id: string
}

interface GetEventCommentsUseCaseResponse {
    comments: {
        id: string
        event_id: string
        description: string
        created_at: Date
        updated_at: Date
        user: User
    }[]
    pagination: {
        page: number
        per_page: number
        total: number
        total_pages: number
    }
}

export class GetEventCommentsUseCase {
    constructor(
        private eventsRepository: EventsRepository,
        private eventCommentsRepository: EventCommentsRepository
    ) {}

    async execute(data: GetEventCommentsUseCaseRequest): Promise<GetEventCommentsUseCaseResponse> {
        const eventExists = this.eventsRepository.findById(data.event_id)

        if (!eventExists) {
            throw new EventNotExistsError()
        }

        const [comments, total] = await Promise.all([
            this.eventCommentsRepository.findCommentsByEnventIdPaginated(
                data.event_id, data.page, data.per_page
            ),
            this.eventCommentsRepository.countEventComments(data.event_id)
        ])

        const total_pages = Math.ceil(total / data.per_page)

        return {
            comments,
            pagination: {
                page: data.page,
                per_page: data.per_page,
                total,
                total_pages
            }
        }
    }
}