import { PrismaEventFavoritesRepository } from '@/repositories/prisma/prisma-event-favorites-repository'
import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { FavoriteEventUseCase } from '../favorite-event'


export function makeFavoriteEventUseCase() {
    const eventFavoritesRepository = new PrismaEventFavoritesRepository()
    const eventsRepository = new PrismaEventsRepository()

    const favoriteEventUseCase = new FavoriteEventUseCase(
      eventFavoritesRepository,
      eventsRepository
    )

    return favoriteEventUseCase
}
