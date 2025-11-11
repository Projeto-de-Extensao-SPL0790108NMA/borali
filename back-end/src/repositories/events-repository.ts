import { Prisma, Event } from '@prisma/client'

export interface EventsRepository {
  create(data: Prisma.EventUncheckedCreateInput): Promise<Event>
  findById(id: string): Promise<Event | null>
  update(id: string, data: Prisma.EventUncheckedUpdateInput): Promise<Event>
  findManyByCompanyPaginated(companyId: string, page: number, per_page: number): Promise<Event[]>
  countByCompany(companyId: string): Promise<number>
  findUpcomingEventsPaginated(page: number, per_page: number, filters: { title?: string; date?: Date }): Promise<(Event & { cover_image: { id: string; url: string } | null })[]>
  countUpcomingEvents(filters: { title?: string; date?: Date }): Promise<number>
  findByIdWithImages(id: string): Promise<Prisma.EventGetPayload<{ include: { images: true } }> | null>
  findManyByTitleAndAddress(title?: string, address?: string): Promise<Event[]>
  delete(id: string): Promise<void>
}
