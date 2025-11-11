import { UpdateUserUseCase } from "../update-user";
import { Role } from "@prisma/client";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-companies-repository';
import { UpdateCompanyStrategy } from "@/strategies/update-user/update-company-strategy";
import { UpdatePersonStrategy } from "@/strategies/update-user/update-person-strategy";
import { UpdateUserStrategyRegistry } from "@/strategies/update-user/update-user-strategy-registry";

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const companiesRepository = new PrismaCompaniesRepository()

  const personStrategy = new UpdatePersonStrategy(usersRepository)
  const companyStrategy = new UpdateCompanyStrategy(usersRepository, companiesRepository)

  UpdateUserStrategyRegistry.register(Role.PERSON, personStrategy)
  UpdateUserStrategyRegistry.register(Role.COMPANY, companyStrategy)

  const updateUserUseCase = new UpdateUserUseCase(usersRepository)

  return updateUserUseCase
}
