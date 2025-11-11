import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { PasswordResetTokensRepository } from '../password-reset-tokens-repository'

export class PrismaPasswordResetTokensRepository
  implements PasswordResetTokensRepository
{
  async create(data: Prisma.PasswordResetTokenUncheckedCreateInput) {
    const passwordResetToken = await prisma.passwordResetToken.create({
      data,
    })

    return passwordResetToken
  }

  async findLatestValidByUserId(userId: string) {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: {
        user_id: userId,
        used: false,
        expires_at: {
          gt: new Date(),
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return passwordResetToken
  }

  async markAsUsed(passwordResetTokenId: string): Promise<void> {
    await prisma.passwordResetToken.update({
      where: { id: passwordResetTokenId },
      data: { used: true, updated_at: new Date() },
    })
  }
}
