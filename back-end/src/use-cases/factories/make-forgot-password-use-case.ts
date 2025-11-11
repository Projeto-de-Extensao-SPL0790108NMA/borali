import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SendGridMailProvider } from '@/providers/mail/implementations/sendgrid-mail-provider'
import { ForgotPasswordUseCase } from '../forgot-password'
import { PrismaPasswordResetTokensRepository } from '@/repositories/prisma/prisma-password-reset-tokens-repository'

export function makeForgotPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const passwordResetTokensRepository =
    new PrismaPasswordResetTokensRepository()
  const mailProvider = new SendGridMailProvider()

  const forgotPasswordUseCase = new ForgotPasswordUseCase(
    usersRepository,
    passwordResetTokensRepository,
    mailProvider,
  )

  return forgotPasswordUseCase
}
