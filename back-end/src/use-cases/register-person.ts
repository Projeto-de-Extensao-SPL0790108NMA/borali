import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { Role, User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterPersonUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterPersonUseCaseResponse {
  user: User
}

export class RegisterPersonUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterPersonUseCaseRequest): Promise<RegisterPersonUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const role: Role = Role.PERSON

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      role,
    })

    return {
      user,
    }
  }
}
