import { UsersRepository } from "@/repositories/users-repository";
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'
import { Prisma } from "@prisma/client";

interface GetUserUseCaseRequest {
  userId: string
}

interface GetUserUseCaseResponse {
  user: Prisma.UserGetPayload<{ include: { company: true } }>
}

export class GetUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotExistsError()
    }

    return {
      user: {
        ...user,
        company: user.company ?? null
      }
    }
  }
}
