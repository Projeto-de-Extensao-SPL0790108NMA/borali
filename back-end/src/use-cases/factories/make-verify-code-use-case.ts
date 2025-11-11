import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaPasswordResetTokensRepository } from '@/repositories/prisma/prisma-password-reset-tokens-repository'
import { VerifyCodeUseCase } from '../verify-code'

export function makeVerifyCodeUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const passwordResetTokensRepository =
    new PrismaPasswordResetTokensRepository()

  const verifyCodeUseCase = new VerifyCodeUseCase(
    usersRepository,
    passwordResetTokensRepository,
  )

  return verifyCodeUseCase
}
