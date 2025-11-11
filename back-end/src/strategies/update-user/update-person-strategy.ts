import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'
import { UpdateUserStrategy } from './update-user-strategy'
import { UsersRepository } from '@/repositories/users-repository'

interface UpdatePersonData {
  userId: string
  name?: string
}

export class UpdatePersonStrategy implements UpdateUserStrategy {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ userId, name }: UpdatePersonData) {
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      throw new UserNotExistsError()
    }

    await this.usersRepository.update(userId, {
      name: name ?? userExists.name,
    })

    const updatedUser = await this.usersRepository.findById(userId)

    if (!updatedUser) {
      throw new UserNotExistsError()
    }

    return updatedUser
  }
}
