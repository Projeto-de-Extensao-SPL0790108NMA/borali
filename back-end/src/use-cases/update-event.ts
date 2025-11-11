import { EventsRepository } from '@/repositories/events-repository'
import { EventNotExistsError } from './errors/event-not-exists-error'

interface UpdateEventUseCaseRequest {
  eventId: string
  title?: string
  description?: string | null
  address?: string
  date?: string
  latitude?: number
  longitude?: number
}

interface UpdateEventUseCaseResponse {
  event: {
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
    deleted_at: Date | null
  }
}

export class UpdateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository
  ) {}

  async execute({
    eventId,
    title,
    description,
    address,
    date,
    latitude,
    longitude
  }: UpdateEventUseCaseRequest): Promise<UpdateEventUseCaseResponse> {
    const eventExists = await this.eventsRepository.findById(eventId)

    if (!eventExists) {
      throw new EventNotExistsError()
    }

    const updatedEvent = await this.eventsRepository.update(eventId, {
      title: title ?? eventExists.title,
      description: description ?? eventExists.description,
      address: address ?? eventExists.address,
      latitude: latitude ?? eventExists.latitude,
      longitude: longitude ?? eventExists.longitude,
      date: date ?? eventExists.date
    })
    
    return { event: updatedEvent }
  }
}
