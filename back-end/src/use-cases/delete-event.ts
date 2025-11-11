import { EventsRepository } from "@/repositories/events-repository"
import { EventNotExistsError } from "./errors/event-not-exists-error"


interface DeleteEventUseCaseRequest {
  eventId: string
}

export class DeleteEventUseCase {
  constructor(
    private eventsRepository: EventsRepository
  ){}

  async execute(data: DeleteEventUseCaseRequest): Promise<void> {
    const eventExists = await this.eventsRepository.findById(data.eventId)

    if (!eventExists) {
      throw new EventNotExistsError()
    }

    await this.eventsRepository.delete(data.eventId)
  }
}
