import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-companies-repository'
import { RegisterCompanyUseCase } from '../register-company'

export function makeRegisterCompanyUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const companiesRepository = new PrismaCompaniesRepository()

  const registerCompanyUseCase = new RegisterCompanyUseCase(
    usersRepository,
    companiesRepository,
  )

  return registerCompanyUseCase
}
