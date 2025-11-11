import { z } from 'zod'

export const registerPersonBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const registerPersonResponseSchema = z.null().describe('Individual user created')

export const registerPersonAlreadyExistsResponseSchema = z.object({
  message: z.string(),
}).describe('User already exists')

export const registerCompanyBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
  address: z.string(),
  description: z.string(),
})

export const registerCompanyResponseSchema = z.null().describe('Company user created')

export const registerCompanyAlreadyExistsResponseSchema = z.object({
  message: z.string(),
}).describe('User already exists')

export const getUserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['PERSON', 'COMPANY']),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
  avatar_url: z.string().nullable(),
  company: z.object({
    id: z.string(),
    phone: z.string(),
    address: z.string(),
    description: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    deleted_at: z.string().nullable(),
  })
  .nullable()
  .optional()
})

export const updateUserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['PERSON', 'COMPANY']),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
  company: z.object({
    id: z.string(),
    phone: z.string(),
    address: z.string(),
    description: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    deleted_at: z.string().nullable(),
  })
  .nullable()
  .optional()
})

export const updateUserBodyShema = z.object({
  name: z.string(),
  company: z.object({
    address: z.string(),
    description: z.string(),
    phone: z.string()
  })
  .nullable()
  .optional()
})

export const uploadUserAvatarResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['PERSON', 'COMPANY']),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
  avatar_url: z.string().nullable(),
  company: z.object({
    id: z.string(),
    phone: z.string(),
    address: z.string(),
    description: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    deleted_at: z.string().nullable(),
  })
  .nullable()
  .optional()
})

export const deleteUserResponseSchema = z.null().describe('User deleted')

export type RegisterPersonBody = z.infer<typeof registerPersonBodySchema>
export type RegisterCompanyBody = z.infer<typeof registerCompanyBodySchema>
export type UpdateUserBody = z.infer<typeof updateUserBodyShema>
