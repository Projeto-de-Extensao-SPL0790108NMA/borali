import { EventsRepository } from '@/repositories/events-repository'
import { EventNotExistsError } from './errors/event-not-exists-error'

interface Image {
  id: string
  event_id: string
  url: string
  created_at: Date
  updated_at: Date
}

interface GetEventByIdUseCaseRequest {
  eventId: string
}

interface GetEventByIdUseCaseResponse {
  id: string
  title: string
  description: string | null
  date: Date
  address: string
  created_at: Date
  updated_at: Date
  latitude: number
  longitude: number
  images: Image[] | null
}

export class GetEventByIdUseCase {
  constructor(
    private eventsRepository: EventsRepository
  ) {}

  async execute({
    eventId,
  }: GetEventByIdUseCaseRequest): Promise<GetEventByIdUseCaseResponse> {
    const event = await this.eventsRepository.findByIdWithImages(eventId)

    if (!event) {
      throw new EventNotExistsError()
    }

    return event
  }
}
