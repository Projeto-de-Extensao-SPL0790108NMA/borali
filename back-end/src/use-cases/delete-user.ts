import { UsersRepository } from "@/repositories/users-repository";
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'

interface DeleteUserUseCaseRequest {
  userId: string
}

export class DeleteUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: DeleteUserUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotExistsError()
    }

    await this.usersRepository.delete(userId)
  }
}
