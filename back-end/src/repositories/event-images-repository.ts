import { Prisma, EventImage } from '@prisma/client'

export interface EventImagesRepository {
  create(data: Prisma.EventImageUncheckedCreateInput): Promise<EventImage>
  findById(id: string): Promise<EventImage | null>
  delete(id: string): Promise<EventImage>
  removeExistingCoverImages(eventId: string): Promise<void>
}
