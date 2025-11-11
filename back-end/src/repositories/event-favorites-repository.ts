import { Prisma, Event, EventFavorite } from '@prisma/client'

export interface EventFavoritesRepository {
  create(data: Prisma.EventFavoriteUncheckedCreateInput): Promise<EventFavorite>
  findById(id: string): Promise<EventFavorite | null>
  delete(userId: string, eventId: string): Promise<void>
  findAllByUserPaginated(userId: string, page: number, per_page: number): Promise<(Event & { cover_image: { id: string; url: string } | null })[]>
  countByUser(userId: string): Promise<number>
  findByEventIdAndUserId(eventId: string, userId: string): Promise<EventFavorite | null>
}
