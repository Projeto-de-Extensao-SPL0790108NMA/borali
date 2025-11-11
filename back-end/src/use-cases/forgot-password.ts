import { UsersRepository } from '@/repositories/users-repository'
import { PasswordResetTokensRepository } from '@/repositories/password-reset-tokens-repository'
import { MailProvider } from '@/providers/mail/mail-provider'
import { randomInt } from 'node:crypto'
import { hash } from 'bcryptjs'
import dayjs from 'dayjs'
import { forgotPasswordTemplate } from '@/templates/mail/forgot-password-template'

interface ForgotPasswordUseCaseRequest {
  email: string
}

export class ForgotPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private passwordResetTokensRepository: PasswordResetTokensRepository,
    private mailProvider: MailProvider,
  ) {}

  async execute({ email }: ForgotPasswordUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return
    }

    const code = String(randomInt(100000, 999999))
    const code_hash = await hash(code, 8)

    const expires_at = dayjs().add(10, 'minutes').toDate()

    await this.passwordResetTokensRepository.create({
      user_id: user.id,
      code_hash,
      expires_at,
    })

    const htmlBody = forgotPasswordTemplate({
      username: user.name,
      code,
    })

    const subject = 'Redefinir sua senha - Borali'

    await this.mailProvider.sendMail(user.email, subject, htmlBody)
  }
}
