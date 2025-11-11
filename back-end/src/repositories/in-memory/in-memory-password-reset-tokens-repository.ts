import { PasswordResetTokensRepository } from '@/repositories/password-reset-tokens-repository'
import { PasswordResetToken, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPasswordResetTokensRepository
  implements PasswordResetTokensRepository
{
  public items: PasswordResetToken[] = []

  async create(data: Prisma.PasswordResetTokenUncheckedCreateInput) {
    const passwordResetToken = {
      id: randomUUID(),
      code_hash: data.code_hash,
      expires_at: new Date(data.expires_at),
      used: data.used ?? false,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(passwordResetToken)

    return passwordResetToken
  }

  async findLatestValidByUserId(userId: string) {
    const passwordResetTokens = this.items
      .filter(
        (token) =>
          token.user_id === userId &&
          !token.used &&
          token.expires_at.getTime() > Date.now(),
      )
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())

    if (passwordResetTokens.length === 0) {
      return null
    }

    return passwordResetTokens[0]
  }

  async markAsUsed(passwordResetTokenId: string) {
    const passwordResetToken = this.items.find((token) => token.id === passwordResetTokenId)

    if (passwordResetToken) {
      passwordResetToken.used = true
      passwordResetToken.updated_at = new Date()
    }
  }
}
