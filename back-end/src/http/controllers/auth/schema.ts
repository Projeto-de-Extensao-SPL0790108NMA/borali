import { z } from 'zod'

export const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authenticateResponseSchema = z.object({
  token: z.string(),
}).describe('User authenticated')

export const authenticateInvalidCredencialsResponseSchema = z.object({
  message: z.string(),
}).describe('Invalid credentials')

export const forgotPasswordBodySchema = z.object({
  email: z.string().email(),
})

export const forgotPasswordResponseSchema = z.object({
  message: z.string(),
})

export const verifyCodeBodySchema = z.object({
  email: z.string().email(),
  code: z.string().min(6).max(6),
})

export const verifyCodeResponseSchema = z.null().describe('Code verified')

export const verifyCodeInvalidResponseSchema = z.object({
  message: z.string(),
}).describe('Invalid code')

export const resetPasswordBodySchema = z.object({
  email: z.string().email(),
  code: z.string(),
  newPassword: z.string(),
})

export const resetPasswordResponseSchema = z.null().describe('Password reseted')

export type AuthenticateBody = z.infer<typeof authenticateBodySchema>
export type ForgotPasswordBody = z.infer<typeof forgotPasswordBodySchema>
export type VerifyCodeBody = z.infer<typeof verifyCodeBodySchema>
export type ResetPasswordBody = z.infer<typeof resetPasswordBodySchema>
