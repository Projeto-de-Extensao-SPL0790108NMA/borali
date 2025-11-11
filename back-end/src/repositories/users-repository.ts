import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(id: string): Promise<Prisma.UserGetPayload<{ include: { company: true } }> | null>
  findByEmail(email: string): Promise<Prisma.UserGetPayload<{ include: { company: true } }> | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  updatePassword(id: string, password: string): Promise<User | null>
  delete(id: string): Promise<void>
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>
}
