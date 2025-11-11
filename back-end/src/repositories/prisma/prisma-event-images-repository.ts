import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { EventImagesRepository } from '../event-images-repository'

export class PrismaEventImagesRepository implements EventImagesRepository {
  async create(data: Prisma.EventImageUncheckedCreateInput) {
    const eventImage = await prisma.eventImage.create({
      data,
    })

    return eventImage
  }

  async removeExistingCoverImages(eventId: string) {
    await prisma.eventImage.updateMany({
      where: {
        event_id: eventId,
        is_cover: true
      },
      data: {
        is_cover: false,
        updated_at: new Date()
      }
    })
  }

  async findById(id: string) {
    const eventImage = await prisma.eventImage.findFirst({
      where: { 
        id,
        deleted_at: null
      }
    })

    return eventImage
  }

  async delete(id: string) {
    const eventImage = await prisma.eventImage.update({
      where: { id },
      data: { deleted_at: new Date() }
    })

    return eventImage
  }
}
