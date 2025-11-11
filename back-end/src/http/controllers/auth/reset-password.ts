import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeResetPasswordUseCase } from '@/use-cases/factories/make-reset-password-use-case'
import { ResetPasswordBody } from './schema'

export async function resetPassword(
  request: FastifyRequest<{ Body: ResetPasswordBody }>,
  reply: FastifyReply,
) {
  const { email, code, newPassword } = request.body

  const resetPasswordUseCase = makeResetPasswordUseCase()

  await resetPasswordUseCase.execute({
    email,
    code,
    newPassword,
  })

  return reply.status(200).send()
}
