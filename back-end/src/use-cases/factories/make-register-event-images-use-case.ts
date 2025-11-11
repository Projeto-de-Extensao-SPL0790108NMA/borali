import { PrismaEventImagesRepository } from '@/repositories/prisma/prisma-event-images-repository'
import { RegisterEventImagesUseCase } from '../register-event-images'
import { S3StorageProvider } from '@/providers/storage/implementations/s3-storage-provider'
import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'

export function makeRegisterEventImagesUseCase() {
  const eventImagesRepository = new PrismaEventImagesRepository()
  const eventsRepository = new PrismaEventsRepository()
  const storageProvider = new S3StorageProvider()

  const registerEventImagesUseCase = new RegisterEventImagesUseCase(
    eventImagesRepository,
    eventsRepository,
    storageProvider
  )

  return registerEventImagesUseCase
}
