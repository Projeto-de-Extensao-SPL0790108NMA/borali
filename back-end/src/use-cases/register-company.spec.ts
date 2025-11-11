import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryCompaniesRepository } from '@/repositories/in-memory/in-memory-companies-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterCompanyUseCase } from './register-company'

let usersRepository: InMemoryUsersRepository
let companiesRepository: InMemoryCompaniesRepository
let sut: RegisterCompanyUseCase

describe('Register Company Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    companiesRepository = new InMemoryCompaniesRepository()
    sut = new RegisterCompanyUseCase(usersRepository, companiesRepository)
  })

  it('should to register', async () => {
    const { user, company } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '1199999999',
      address: 'Some address',
      description: 'Some description.',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(company.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '1199999999',
      address: 'Some address',
      description: 'Some description.',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      phone: '1199999999',
      address: 'Some address',
      description: 'Some description.',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        phone: '1199999999',
        address: 'Some address',
        description: 'Some description.',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
