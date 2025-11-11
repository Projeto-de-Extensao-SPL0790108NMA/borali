import { EventImagesRepository } from '@/repositories/event-images-repository'
import { EventImage, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryEventImagesRepository implements EventImagesRepository {
  public items: EventImage[] = []

  async create(data: Prisma.EventImageUncheckedCreateInput) {
    const eventImage = {
      id: randomUUID(),
      url: data.url,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      event_id: data.event_id,
    }

    this.items.push(eventImage)

    return eventImage
  }
}
