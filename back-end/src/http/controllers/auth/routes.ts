import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { forgotPassword } from './forgot-password'
import { verifyCode } from './verify-code'
import { resetPassword } from './reset-password'

import {
  authenticateBodySchema,
  authenticateInvalidCredencialsResponseSchema,
  authenticateResponseSchema,
  forgotPasswordBodySchema,
  forgotPasswordResponseSchema,
  resetPasswordBodySchema,
  resetPasswordResponseSchema,
  verifyCodeBodySchema,
  verifyCodeInvalidResponseSchema,
  verifyCodeResponseSchema
} from './schema'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/login', {
    schema: {
      tags: ['Auth'],
      summary: 'Authenticate user',
      body: authenticateBodySchema,
      response: {
        200: authenticateResponseSchema,
        400: authenticateInvalidCredencialsResponseSchema,
      }
    },
  }, authenticate)

  app.post('/auth/forgot-password', {
    schema: {
      tags: ['Auth'],
      summary: 'Forgot password',
      body: forgotPasswordBodySchema,
      response: { 200: forgotPasswordResponseSchema }
    }
  }, forgotPassword)

  app.post('/auth/verify-code', {
    schema: {
      tags: ['Auth'],
      summary: 'Verify code',
      body: verifyCodeBodySchema,
      response: {
        200: verifyCodeResponseSchema,
        400: verifyCodeInvalidResponseSchema,
      }
    }
  }, verifyCode)

  app.post('/auth/reset-password', {
    schema: {
      tags: ['Auth'],
      summary: 'Reset password',
      body: resetPasswordBodySchema,
      response: { 200: resetPasswordResponseSchema }
    }
  }, resetPassword)
}
