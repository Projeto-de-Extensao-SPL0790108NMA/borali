import { PrismaEventImagesRepository } from "@/repositories/prisma/prisma-event-images-repository"
import { PrismaEventsRepository } from "@/repositories/prisma/prisma-events-repository"
import { UploadEventCoverImageUseCase } from "../upload-event-cover-image"
import { S3StorageProvider } from "@/providers/storage/implementations/s3-storage-provider"

export function makeUploadEventCoverImageUseCase() {
  const eventImagesRepository = new PrismaEventImagesRepository()
  const eventsRepository = new PrismaEventsRepository()
  const storageProvider = new S3StorageProvider()

  const uploadEventCoverImageUseCase = new UploadEventCoverImageUseCase(
    eventImagesRepository,
    eventsRepository,
    storageProvider
  )

  return uploadEventCoverImageUseCase
}
