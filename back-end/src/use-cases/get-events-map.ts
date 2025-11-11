import { EventsRepository } from '@/repositories/events-repository'

interface GetEventsMapUseCaseRequest {
  title?: string
  address?: string
}

interface GetEventsMapUseCaseResponse {
  events: {
    id: string
    title: string
    address: string
    latitude: number
    longitude: number
  }[]
}

export class GetEventsMapUseCase {
  constructor(
    private eventsRepository: EventsRepository
  ) {}

  async execute({
    title,
    address
  }: GetEventsMapUseCaseRequest): Promise<GetEventsMapUseCaseResponse> {
    const events = await this.eventsRepository.findManyByTitleAndAddress(title, address)
    return { events }
  }
}
