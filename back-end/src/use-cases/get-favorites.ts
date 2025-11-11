import { EventFavoritesRepository } from "@/repositories/event-favorites-repository"


interface GetFavoritesUseCaseRequest {
  userId: string
  page: number
  per_page: number
}

interface GetFavoritesUseCaseResponse {
  events: {
    id: string
    title: string
    description: string | null
    address: string
    date: Date
    latitude: number
    longitude: number
    company_id: string
    created_at: Date
    updated_at: Date
  }[]
  pagination: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
}

export class GetFavoritesUseCase {
    constructor(
        private eventFavoritesRepository: EventFavoritesRepository,
    ){}

    async execute({
      userId,
      page,
      per_page
    }: GetFavoritesUseCaseRequest): Promise<GetFavoritesUseCaseResponse> {
        const [events, total] = await Promise.all([
          await this.eventFavoritesRepository.findAllByUserPaginated(userId, page, per_page),
          await this.eventFavoritesRepository.countByUser(userId),
        ])

        const total_pages = Math.ceil(total / per_page)

        return {
          events,
          pagination: {
            page,
            per_page,
            total,
            total_pages
          }
        }
    }
}
