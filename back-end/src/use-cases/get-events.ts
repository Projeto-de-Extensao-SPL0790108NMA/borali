import { EventsRepository } from "@/repositories/events-repository";

interface CoverImage {
  id: string
  url: string
}

interface GetEventsUseCaseRequest {
  page: number
  per_page: number
  title?: string
  date?: string
}

interface GetEventsUseCaseResponse {
  events: {
    id: string
    title: string
    description: string | null
    date: Date
    created_at: Date
    updated_at: Date
    cover_image: CoverImage | null
  }[]
  pagination: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
}

export class GetEventsUseCase {
  constructor(
    private eventsRepository: EventsRepository
  ) {}

  async execute({
    page,
    per_page,
    title,
    date
  }: GetEventsUseCaseRequest): Promise<GetEventsUseCaseResponse> {
    const parsedDate = date ? new Date(date) : new Date()

    const [events, total] = await Promise.all([
      this.eventsRepository.findUpcomingEventsPaginated(page, per_page, {
        title,
        date: parsedDate
      }),
      this.eventsRepository.countUpcomingEvents({
        title,
        date: parsedDate
      })
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
