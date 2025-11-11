import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UploadUserAvatarUseCase } from "../upload-user-avatar"
import { S3StorageProvider } from "@/providers/storage/implementations/s3-storage-provider"

export function makeUploadUserAvatarUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const storageProvider = new S3StorageProvider()

  const uploadUserAvatarUseCase = new UploadUserAvatarUseCase(
    usersRepository,
    storageProvider
  )

  return uploadUserAvatarUseCase
}
