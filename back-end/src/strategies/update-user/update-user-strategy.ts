import { Prisma } from '@prisma/client'

export interface UpdateUserData {
  userId: string
  name?: string
  company?: {
    phone?: string
    address?: string
    description?: string
  }
}

export interface UpdateUserStrategy {
  execute(data: UpdateUserData): Promise<Prisma.UserGetPayload<{ include: { company: true } }>>
}
