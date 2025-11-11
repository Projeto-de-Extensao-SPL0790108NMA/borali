import { FastifyReply, FastifyRequest } from 'fastify'
import { makeForgotPasswordUseCase } from '@/use-cases/factories/make-forgot-password-use-case'
import { ForgotPasswordBody } from './schema'

export async function forgotPassword(
  request: FastifyRequest<{ Body: ForgotPasswordBody }>,
  reply: FastifyReply,
) {
  const { email } = request.body

  try {
    const forgotPasswordUseCase = makeForgotPasswordUseCase()

    await forgotPasswordUseCase.execute({ email })
  } catch (err) {
    console.error(err)
  }

  return reply.status(200).send({
    message: 'If this email is registered, a verification code has been sent',
  })
}
