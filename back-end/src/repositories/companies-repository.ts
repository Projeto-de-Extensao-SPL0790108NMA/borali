import { Prisma, Company } from '@prisma/client'

export interface CompaniesRepository {
  findById(id: string): Promise<Company | null>
  findByUserId(userId: string): Promise<Company | null>
  create(data: Prisma.CompanyUncheckedCreateInput): Promise<Company>
  updateByUserId(userId: string, data: Prisma.CompanyUpdateInput): Promise<Company>
}
