import { UsersRepository } from '@/repositories/users-repository'
import { PasswordResetTokensRepository } from '@/repositories/password-reset-tokens-repository'
import { compare } from 'bcryptjs'
import { InvalidVerificationCodeError } from './errors/invalid-verification-code-error'
import dayjs from 'dayjs'

interface VerifyCodeUseCaseRequest {
  email: string
  code: string
}

export class VerifyCodeUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private passwordResetTokens: PasswordResetTokensRepository,
  ) {}

  async execute({ email, code }: VerifyCodeUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidVerificationCodeError()
    }

    const passwordResetToken =
      await this.passwordResetTokens.findLatestValidByUserId(user.id)

    if (!passwordResetToken) {
      throw new InvalidVerificationCodeError()
    }

    const isExpired = dayjs().isAfter(passwordResetToken.expires_at)

    if (isExpired) {
      throw new InvalidVerificationCodeError()
    }

    const isCodeValid = await compare(code, passwordResetToken.code_hash)

    if (!isCodeValid) {
      throw new InvalidVerificationCodeError()
    }
  }
}
