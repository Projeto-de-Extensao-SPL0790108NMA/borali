import { PrismaEventFavoritesRepository } from '@/repositories/prisma/prisma-event-favorites-repository'
import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { UnfavoriteEventUseCase } from '../unfavorite-event'


export function makeUnfavoriteEventUseCase() {
    const eventFavoritesRepository = new PrismaEventFavoritesRepository()
    const eventsRepository = new PrismaEventsRepository()

    const unfavoriteEventUseCase = new UnfavoriteEventUseCase(
      eventFavoritesRepository,
      eventsRepository
    )

    return unfavoriteEventUseCase
}
