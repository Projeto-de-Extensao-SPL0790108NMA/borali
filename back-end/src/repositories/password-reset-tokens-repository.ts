import { Prisma, PasswordResetToken } from '@prisma/client'

export interface PasswordResetTokensRepository {
  create(
    data: Prisma.PasswordResetTokenUncheckedCreateInput,
  ): Promise<PasswordResetToken>
  findLatestValidByUserId(userId: string): Promise<PasswordResetToken | null>
  markAsUsed(passwordResetTokenId: string): Promise<void>
}
