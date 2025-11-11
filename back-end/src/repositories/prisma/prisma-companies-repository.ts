import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { CompaniesRepository } from '../companies-repository'

export class PrismaCompaniesRepository implements CompaniesRepository {
  async findById(id: string) {
    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    })

    return company
  }

  async findByUserId(userId: string) {
    const company = await prisma.company.findUnique({
      where: {
        user_id: userId,
      },
    })

    return company
  }

  async updateByUserId(userId: string, input: Prisma.CompanyUpdateInput) {
    const company = await prisma.company.update({
      where: {
        user_id: userId,
        deleted_at: null
      },
      data: {
        ...input,
        updated_at: new Date(),
      }
    })

    return company
  }

  async create(data: Prisma.CompanyUncheckedCreateInput) {
    const company = await prisma.company.create({
      data,
    })

    return company
  }
}
