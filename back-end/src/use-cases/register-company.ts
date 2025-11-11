import { UsersRepository } from '@/repositories/users-repository'
import { CompaniesRepository } from '@/repositories/companies-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { Role, User, Company } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterCompanyUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  address: string
  description: string
}

interface RegisterCompanyUseCaseResponse {
  user: User
  company: Company
}

export class RegisterCompanyUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private companiesRepository: CompaniesRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    phone,
    address,
    description,
  }: RegisterCompanyUseCaseRequest): Promise<RegisterCompanyUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const role: Role = Role.COMPANY

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      role,
    })

    const company = await this.companiesRepository.create({
      user_id: user.id,
      phone,
      address,
      description,
    })

    return {
      user,
      company,
    }
  }
}
