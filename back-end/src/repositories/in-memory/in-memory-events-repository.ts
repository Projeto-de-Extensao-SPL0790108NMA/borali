import { EventsRepository } from '@/repositories/events-repository'
import { Event, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryEventsRepository implements EventsRepository {
  public items: Event[] = []

  async create(data: Prisma.EventUncheckedCreateInput) {
    const event = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      address: data.address,
      date: new Date(data.date),
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      company_id: data.company_id,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    }

    this.items.push(event)

    return event
  }
}
