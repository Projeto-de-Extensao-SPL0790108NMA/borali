import { StorageProvider } from '@/providers/storage/storage-provider'
import { EventImagesRepository } from '@/repositories/event-images-repository'
import { EventsRepository } from '@/repositories/events-repository'
import { EventImage } from '@prisma/client'
import { EventNotExistsError } from './errors/event-not-exists-error'

interface RegisterEventImagesUseCaseRequest {
  event_id: string
  files: {
    buffer: Buffer
    filename: string
  }[]
}

interface RegisterEventImagesUseCaseResponse {
  images: EventImage[]
}

export class RegisterEventImagesUseCase {
  constructor(
    private eventImagesRepository: EventImagesRepository,
    private eventsRepository: EventsRepository,
    private storageProvider: StorageProvider
  ) {}

  async execute({
    event_id,
    files,
  }: RegisterEventImagesUseCaseRequest): Promise<RegisterEventImagesUseCaseResponse> {
    const eventExists = await this.eventsRepository.findById(event_id)

    if (!eventExists) {
      throw new EventNotExistsError()
    }

    const uploadedImages: EventImage[] = []

    for (const file of files) {
      const s3Key = file.filename
      const url = await this.storageProvider.upload(file.buffer, s3Key, 'event-images')

      const image = await this.eventImagesRepository.create({
        event_id,
        url
      })

      uploadedImages.push(image)
    }

    return { images: uploadedImages }
  }
}
