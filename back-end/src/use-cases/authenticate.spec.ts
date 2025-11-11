import { InMemoryCompaniesRepository } from '@/repositories/in-memory/in-memory-companies-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { Role } from '@prisma/client'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let companiesRepository: InMemoryCompaniesRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    companiesRepository = new InMemoryCompaniesRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate person', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      role: Role.PERSON,
    })

    const { user: authenticatedUser } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(authenticatedUser.id).toEqual(expect.any(String))
    expect(authenticatedUser.role).toBe(Role.PERSON)
  })

  it('should be able to authenticate company', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      role: Role.COMPANY,
    })

    await companiesRepository.create({
      phone: '1199999999',
      address: 'Some address.',
      description: 'Some description.',
      user_id: user.id,
    })

    const { user: authenticatedUser } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(authenticatedUser.id).toEqual(expect.any(String))
    expect(authenticatedUser.role).toBe(Role.COMPANY)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate person with wrong email', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      role: Role.PERSON,
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate company with wrong email', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      role: Role.COMPANY,
    })

    await companiesRepository.create({
      phone: '1199999999',
      address: 'Some address.',
      description: 'Some description.',
      user_id: user.id,
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
