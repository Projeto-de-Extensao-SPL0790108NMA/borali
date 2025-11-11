import { CompaniesRepository } from '@/repositories/companies-repository'
import { Company, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public items: Company[] = []

  async findById(id: string) {
    const company = this.items.find((item) => item.id === id)

    if (!company) {
      return null
    }

    return company
  }

  async findByUserId(userId: string) {
    const company = this.items.find((item) => item.user_id === userId)

    if (!company) {
      return null
    }

    return company
  }

  async create(data: Prisma.CompanyUncheckedCreateInput) {
    const company = {
      id: randomUUID(),
      phone: data.phone,
      address: data.address,
      description: data.description,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    }

    this.items.push(company)

    return company
  }
}
