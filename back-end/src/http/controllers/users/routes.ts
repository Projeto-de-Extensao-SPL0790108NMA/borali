import { FastifyInstance } from 'fastify'

import { registerPerson } from './register-person'
import { registerCompany } from './register-company'
import { getUser } from './get-user'
import { deleteUser } from './delete-user'
import { updateUser } from './update-user'
import { uploadUserAvatar } from './upload-user-avatar'

import {
  registerCompanyAlreadyExistsResponseSchema,
  registerCompanyBodySchema,
  registerCompanyResponseSchema,
  registerPersonAlreadyExistsResponseSchema,
  registerPersonBodySchema,
  registerPersonResponseSchema,
  getUserResponseSchema,
  deleteUserResponseSchema,
  updateUserResponseSchema,
  UpdateUserBody,
  uploadUserAvatarResponseSchema
} from './schema'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users/person', {
    schema: {
      tags: ['User'],
      summary: 'Create individual user',
      body: registerPersonBodySchema,
      response: {
        201: registerPersonResponseSchema,
        409: registerPersonAlreadyExistsResponseSchema
      }
    }
  }, registerPerson)

  app.post('/users/company', {
    schema: {
      tags: ['User'],
      summary: 'Create company user',
      body: registerCompanyBodySchema,
      response: {
        201: registerCompanyResponseSchema,
        409: registerCompanyAlreadyExistsResponseSchema
      }
    }
  }, registerCompany)

  app.post('/users/me/avatar', {
    schema: {
      tags: ['User'],
      summary: 'Upload user avatar',
      consumes: ['multipart/form-data'],
      response: {
        201: uploadUserAvatarResponseSchema
      }
    },
    onRequest: [
      verifyJwt
    ]
  }, uploadUserAvatar)

  app.get('/users/me', {
    schema: {
      tags: ['User'],
      summary: 'Get user',
      response: {
        200: getUserResponseSchema
      }
    },
    onRequest: [
      verifyJwt
    ]
  }, getUser)

  app.put<{ Body: UpdateUserBody }>('/users/me', {
    schema: {
      tags: ['User'],
      summary: 'Update user',
      response: {
        200: updateUserResponseSchema
      }
    },
    onRequest: [
      verifyJwt
    ]
  }, updateUser)

  app.delete('/users/me', {
    schema: {
      tags: ['User'],
      summary: 'Delete user',
      response: {
        200: deleteUserResponseSchema
      }
    },
    onRequest: [
      verifyJwt
    ]
  }, deleteUser)
}
