import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
        deleted_at: null
      },
      include: {
        company: true,
      }
    })

    return user
  }

  async delete(id: string) {
    await prisma.user.updateMany({
      where: {
        id,
        deleted_at: null
      },
      data: {
        deleted_at: new Date(),
        updated_at: new Date()
      }
    })
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
        deleted_at: null
      },
      include: {
        company: true,
      }
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async updatePassword(id: string, passwordHash: string) {
    const user = await prisma.user.update({
      where: {
        id,
        deleted_at: null
      },
      data: { password_hash: passwordHash, updated_at: new Date() },
    })

    return user
  }

  async update(id: string, input: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id,
        deleted_at: null
      },
      data: {
        ...input,
        updated_at: new Date()
      }
    })

    return user
  }
}
