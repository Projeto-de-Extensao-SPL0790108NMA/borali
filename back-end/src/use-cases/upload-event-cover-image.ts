import { StorageProvider } from '@/providers/storage/storage-provider'
import { EventImagesRepository } from '@/repositories/event-images-repository'
import { EventsRepository } from '@/repositories/events-repository'
import { EventImage } from '@prisma/client'
import { EventNotExistsError } from './errors/event-not-exists-error'

interface UploadEventCoverImageUseCaseRequest {
  event_id: string
  file: {
    buffer: Buffer
    filename: string
  }
}

interface UploadEventCoverImageUseCaseResponse {
  image: EventImage
}

export class UploadEventCoverImageUseCase {
  constructor(
    private eventImagesRepository: EventImagesRepository,
    private eventsRepository: EventsRepository,
    private storageProvider: StorageProvider
  ) {}

  async execute({
    event_id,
    file,
  }: UploadEventCoverImageUseCaseRequest): Promise<UploadEventCoverImageUseCaseResponse> {
    const eventExists = await this.eventsRepository.findById(event_id)

    if (!eventExists) {
      throw new EventNotExistsError()
    }

    await this.eventImagesRepository.removeExistingCoverImages(event_id)

    const s3Key = file.filename
    const url = await this.storageProvider.upload(file.buffer, s3Key, 'event-images')

    const image = await this.eventImagesRepository.create({
      event_id,
      url,
      is_cover: true,
    })

    return {
      image
    }
  }
}
