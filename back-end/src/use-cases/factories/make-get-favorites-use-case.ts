import { PrismaEventFavoritesRepository } from '@/repositories/prisma/prisma-event-favorites-repository'
import { GetFavoritesUseCase } from '../get-favorites'


export function makeGetFavoritesUseCase() {
    const eventFavoritesRepository = new PrismaEventFavoritesRepository()

    const getFavoritesUseCase = new GetFavoritesUseCase(
      eventFavoritesRepository,
    )

    return getFavoritesUseCase
}
