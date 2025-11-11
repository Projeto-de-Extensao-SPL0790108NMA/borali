import { UsersRepository } from '@/repositories/users-repository'
import { UserNotExistsError } from './errors/user-not-exists-error'
import { Prisma } from '@prisma/client'
import { UpdateUserStrategyRegistry } from '@/strategies/update-user/update-user-strategy-registry'

interface UpdateUserUseCaseRequest {
  userId: string
  name?: string
  company?: {
    phone?: string
    address?: string
    description?: string
  }
}

interface UpdateUserUseCaseResponse {
  user: Prisma.UserGetPayload<{ include: { company: true } }>
}

export class UpdateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    name,
    company
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      throw new UserNotExistsError()
    }

    const strategy = UpdateUserStrategyRegistry.get(userExists.role)
    const updatedUser = await strategy.execute({
      userId,
      name,
      company
    })

    return { user: updatedUser }
  }
}
