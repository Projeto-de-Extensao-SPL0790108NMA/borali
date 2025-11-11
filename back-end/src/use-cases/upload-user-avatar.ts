import { Prisma } from '@prisma/client'
import { StorageProvider } from '@/providers/storage/storage-provider'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotExistsError } from './errors/user-not-exists-error'

interface UploadUserAvatarUseCaseRequest {
  user_id: string
  file: {
    buffer: Buffer
    filename: string
  }
}

interface UploadUserAvatarUseCaseResponse {
  user: Prisma.UserGetPayload<{ include: { company: true } }>
}

export class UploadUserAvatarUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private storageProvider: StorageProvider
  ) {}

  async execute({
    user_id,
    file,
  }: UploadUserAvatarUseCaseRequest): Promise<UploadUserAvatarUseCaseResponse> {
    const usersExists = await this.usersRepository.findById(user_id)

    if (!usersExists) {
      throw new UserNotExistsError()
    }

    const s3Key = file.filename
    const url = await this.storageProvider.upload(file.buffer, s3Key, 'profile-images')

    await this.usersRepository.update(user_id, {
      avatar_url: url,
    })

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new UserNotExistsError()
    }

    return {
      user
    }
  }
}
