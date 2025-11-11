import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterPersonUseCase } from '../register-person'

export function makeRegisterPersonUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const registerPersonUseCase = new RegisterPersonUseCase(usersRepository)

  return registerPersonUseCase
}
