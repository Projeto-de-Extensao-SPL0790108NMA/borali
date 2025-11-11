import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaPasswordResetTokensRepository } from '@/repositories/prisma/prisma-password-reset-tokens-repository'
import { ResetPasswordUseCase } from '../reset-password'

export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const passwordResetTokensRepository =
    new PrismaPasswordResetTokensRepository()

  const resetPasswordUseCase = new ResetPasswordUseCase(
    usersRepository,
    passwordResetTokensRepository,
  )

  return resetPasswordUseCase
}
