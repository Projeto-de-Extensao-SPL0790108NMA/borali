import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { EventsRepository } from '../events-repository'

export class PrismaEventsRepository implements EventsRepository {
  async create(data: Prisma.EventUncheckedCreateInput) {
    const event = await prisma.event.create({
      data,
    })

    return event
  }

  async findById(id: string) {
    const event = await prisma.event.findFirst({
      where: {
        id,
        deleted_at: null
      }
    })

    return event
  }

  async delete(id: string) {
    await prisma.event.updateMany({
      where: {
        id,
        deleted_at: null
      },
      data: {
        updated_at: new Date(),
        deleted_at: new Date()
      }
    })
  }

  async findManyByTitleAndAddress(title: string, address: string) {
    const events = await prisma.event.findMany({
      where: {
        deleted_at: null,
        ...(title
          ? { title: { contains: title, mode: 'insensitive' } }
          : {}),
        ...(address
          ? { address: { contains: address, mode: 'insensitive' } }
          : {})
      },
      orderBy: {
        created_at: 'desc'
      },
    })

    return events
  }

  async findByIdWithImages(id: string) {
    const event = await prisma.event.findUnique({
      where: {
        id,
        deleted_at: null
      },
      include: {
        images: {
          where: {
            deleted_at: null
          },
          orderBy: {
            is_cover: 'desc'
          },
        }
      }
    })

    return event
  }

  async update(id: string, data: Prisma.EventUncheckedUpdateInput) {
    const event = await prisma.event.update({
      where: {
        id,
        deleted_at: null
      },
      data,
    })

    return event
  }

  async findManyByCompanyPaginated(companyId: string, page: number, per_page: number) {
    const skip = (page - 1) * per_page

    const events = await prisma.event.findMany({
      where: {
        company_id: companyId,
        deleted_at: null
      },
      skip,
      take: per_page,
      orderBy: {
        date: 'asc'
      },
      include: {
        images: {
          where: {
            deleted_at: null
          },
          orderBy: { is_cover: 'desc' },
          take: 1,
          select: {
            id: true,
            url: true,
            is_cover: true,
          }
        }
      }
    })

    const mappedEvents = events.map(event => ({
      ...event,
      cover_image: event.images[0] ?? null,
      images: undefined
    }))

    return mappedEvents
  }

  async countByCompany(companyId: string) {
    const total = await prisma.event.count({
      where: {
        company_id: companyId,
        deleted_at: null
      },
    })

    return total
  }

  async findUpcomingEventsPaginated(page: number, per_page: number, filters: { title?: string; date?: Date }) {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1
    const safePerPage = Number.isFinite(per_page) && per_page > 0 ? per_page : 10

    const skip = (safePage - 1) * safePerPage

    const events = await prisma.event.findMany({
      where: {
        deleted_at: null,
        date: { gte: filters.date ?? new Date() },
        ...(filters.title
          ? { title: { contains: filters.title, mode: 'insensitive' } }
          : {}),
      },
      skip,
      take: safePerPage,
      orderBy: { date: 'asc' },
      include: {
        images: {
          where: { deleted_at: null },
          orderBy: { is_cover: 'desc' },
          take: 1,
          select: { id: true, url: true, is_cover: true },
        },
      },
    })

    const mappedEvents = events.map(event => ({
      ...event,
      cover_image: event.images[0] ?? null,
      images: undefined
    }))

    return mappedEvents
  }

  async countUpcomingEvents(filters: { title?: string; date?: Date }) {
    const total = await prisma.event.count({
      where: {
        deleted_at: null,
        date: { gte: filters.date ?? new Date() },
        ...(filters.title
          ? { title: { contains: filters.title, mode: 'insensitive' } }
          : {}),
      },
    })

    return total
  }
}
