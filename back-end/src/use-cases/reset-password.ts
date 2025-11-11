import { UsersRepository } from '@/repositories/users-repository'
import { PasswordResetTokensRepository } from '@/repositories/password-reset-tokens-repository'
import { compare, hash } from 'bcryptjs'
import { InvalidVerificationCodeError } from './errors/invalid-verification-code-error'
import dayjs from 'dayjs'

interface ResetPasswordUseCaseRequest {
  email: string
  code: string
  newPassword: string
}

export class ResetPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private passwordResetTokens: PasswordResetTokensRepository,
  ) {}

  async execute({
    email,
    code,
    newPassword,
  }: ResetPasswordUseCaseRequest): Promise<void> {
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

    const newPasswordHash = await hash(newPassword, 8)

    await this.usersRepository.updatePassword(user.id, newPasswordHash)

    await this.passwordResetTokens.markAsUsed(passwordResetToken.id)
  }
}
