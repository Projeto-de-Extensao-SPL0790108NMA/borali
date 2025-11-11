import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { EventFavoritesRepository } from '../event-favorites-repository'

export class PrismaEventFavoritesRepository implements EventFavoritesRepository {
  async create(data: Prisma.EventFavoriteUncheckedCreateInput) {
    const eventFavorite = await prisma.eventFavorite.create({
      data,
    })

    return eventFavorite
  }

  async findById(id: string) {
    const eventFavorite = await prisma.eventFavorite.findUnique({
      where: {
        id,
        deleted_at: null
      }
    })

    return eventFavorite
  }

  async delete(userId: string, eventId: string) {
    await prisma.eventFavorite.updateMany({
      where: {
        user_id: userId,
        event_id: eventId,
        deleted_at: null,
      },
      data: {
        deleted_at: new Date(),
        updated_at: new Date(),
      }
    })
  }

  async countByUser(userId: string) {
    const total = await prisma.eventFavorite.count({
      where: {
        user_id: userId,
        deleted_at: null,
        event: {
          deleted_at: null
        }
      },
    })

    return total
  }

  async findByEventIdAndUserId(eventId: string, userId: string) {
    const eventFavorite = await prisma.eventFavorite.findFirst({
      where: {
        event_id: eventId,
        user_id: userId,
        deleted_at: null,
        event: {
          deleted_at: null
        }
      }
    })

    return eventFavorite
  }

  async findAllByUserPaginated(userId: string, page: number, per_page: number) {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1
    const safePerPage = Number.isFinite(per_page) && per_page > 0 ? per_page : 10

    const skip = (safePage - 1) * safePerPage

    const favorites = await prisma.eventFavorite.findMany({
      where: {
        user_id: userId,
        deleted_at: null,
        event: {
          deleted_at: null,
        }
      },
      skip,
      take: safePerPage,
      orderBy: {
        created_at: 'desc'
      },
      include: {
        event: {
          include: {
            images: {
              where: {
                deleted_at: null
              },
              orderBy: { is_cover: 'desc' },
              select: {
                id: true,
                url: true,
                is_cover: true
              },
              take: 1
            }
          },
        }
      }
    })

    const mappedEvents = favorites.map((favorite) => {
      const { images, ...eventData } = favorite.event
      return {
        ...eventData,
        cover_image: images[0] ?? null,
      }
    })

    return mappedEvents
  }
}
