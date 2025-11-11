import { UpdateUserStrategy } from './update-user-strategy'
import { UsersRepository } from '@/repositories/users-repository'
import { CompaniesRepository } from '@/repositories/companies-repository'
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'

interface UpdateCompanyData {
  userId: string
  name?: string
  company?: {
    phone?: string
    address?: string
    description?: string
  }
}

export class UpdateCompanyStrategy implements UpdateUserStrategy {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly companiesRepository: CompaniesRepository,
  ) {}

  async execute({ userId, name, company }: UpdateCompanyData) {
    const userExists = await this.usersRepository.findById(userId)
    
    if (!userExists) {
      throw new UserNotExistsError()
    }

    await this.usersRepository.update(userId, {
      name: name ?? userExists.name,
    })

    if (company) {
      await this.companiesRepository.updateByUserId(userId, {
        phone: company.phone ?? userExists.company?.phone,
        address: company.address ?? userExists.company?.address,
        description: company.description ?? userExists.company?.description,
      })
    }

    const updatedUser = await this.usersRepository.findById(userId)

    if (!updatedUser) {
      throw new UserNotExistsError()
    }

    return updatedUser
  }
}
